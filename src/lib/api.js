import { BUSINESSES, JOBS, LISTINGS } from "../data/mockData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const ADMIN_TOKEN_KEY = "apnahub_admin_token";
const SELLER_TOKEN_KEY = "apnahub_seller_token";

const FALLBACK = { businesses: BUSINESSES, jobs: JOBS, listings: LISTINGS };

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

/** Generic reads with a fallback to bundled mock data if the API is unreachable
 *  (handy for previewing the frontend before the backend is running). */
function resource(name) {
  return {
    list: async () => {
      try {
        return await request(`/${name}`);
      } catch {
        return FALLBACK[name];
      }
    },
    get: async (id) => {
      try {
        return await request(`/${name}/${id}`);
      } catch {
        return FALLBACK[name].find((x) => String(x.id) === String(id));
      }
    },
    create: (payload) => request(`/${name}`, { method: "POST", body: JSON.stringify(payload), headers: authHeader() }),
    update: (id, payload) => request(`/${name}/${id}`, { method: "PUT", body: JSON.stringify(payload), headers: authHeader() }),
    remove: (id) => request(`/${name}/${id}`, { method: "DELETE", headers: authHeader() }),
  };
}

function authHeader() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function sellerAuthHeader() {
  const token = localStorage.getItem(SELLER_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const businessesApi = resource("businesses");
export const jobsApi = resource("jobs");

const rawListingsApi = resource("listings");
export const listingsApi = {
  ...rawListingsApi,
  // Customer-facing browse only ever shows admin/seller-approved listings.
  list: async () => {
    const all = await rawListingsApi.list();
    return all.filter((l) => !l.status || l.status === "approved");
  },
};

export const authApi = {
  login: (email, password) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
};

export const adminAuthApi = {
  login: async (email, password) => {
    const data = await request("/admin/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
    return data;
  },
  logout: () => localStorage.removeItem(ADMIN_TOKEN_KEY),
  isLoggedIn: () => Boolean(localStorage.getItem(ADMIN_TOKEN_KEY)),
};

/** Guest-posting seller flow: verify a phone number via OTP to get a seller token. */
export const sellerAuthApi = {
  requestOtp: (phone) => request("/auth/request-otp", { method: "POST", body: JSON.stringify({ phone }) }),
  verifyOtp: async (phone, code, name) => {
    const data = await request("/auth/verify-otp", { method: "POST", body: JSON.stringify({ phone, code, name }) });
    localStorage.setItem(SELLER_TOKEN_KEY, data.token);
    localStorage.setItem("apnahub_seller_user", JSON.stringify(data.user));
    return data;
  },
  logout: () => { localStorage.removeItem(SELLER_TOKEN_KEY); localStorage.removeItem("apnahub_seller_user"); },
  isLoggedIn: () => Boolean(localStorage.getItem(SELLER_TOKEN_KEY)),
  currentUser: () => JSON.parse(localStorage.getItem("apnahub_seller_user") || "null"),
};

/** A seller managing their own posted ads. */
export const sellerListingsApi = {
  mine: () => request("/seller/listings/mine", { headers: sellerAuthHeader() }),
  create: (payload) => request("/seller/listings", { method: "POST", body: JSON.stringify(payload), headers: sellerAuthHeader() }),
  update: (id, payload) => request(`/seller/listings/${id}`, { method: "PUT", body: JSON.stringify(payload), headers: sellerAuthHeader() }),
  remove: (id) => request(`/seller/listings/${id}`, { method: "DELETE", headers: sellerAuthHeader() }),
};

/** Buyer → seller inquiries. Asking is public; reading your inbox needs a seller token. */
export const inquiriesApi = {
  ask: (listingId, payload) => request(`/listings/${listingId}/inquiries`, { method: "POST", body: JSON.stringify(payload) }),
  mine: () => request("/inquiries", { headers: sellerAuthHeader() }),
  markRead: (id) => request(`/inquiries/${id}/read`, { method: "PATCH", headers: sellerAuthHeader() }),
};
