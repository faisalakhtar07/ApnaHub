import { BUSINESSES, JOBS, LISTINGS } from "../data/mockData";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const ADMIN_TOKEN_KEY = "apnahub_admin_token";
const USER_TOKEN_KEY = "apnahub_user_token"; // shared by password login AND phone-OTP login
const USER_DATA_KEY = "apnahub_user_data";

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

function userAuthHeader() {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function storeUserSession(data) {
  localStorage.setItem(USER_TOKEN_KEY, data.token);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
  return data;
}

export const businessesApi = {
  ...resource("businesses"),
  mine: () => request("/businesses/mine/all", { headers: userAuthHeader() }),
  create: (payload) => request("/businesses", { method: "POST", body: JSON.stringify(payload), headers: userAuthHeader() }),
  update: (id, payload) => request(`/businesses/${id}`, { method: "PUT", body: JSON.stringify(payload), headers: userAuthHeader() }),
  remove: (id) => request(`/businesses/${id}`, { method: "DELETE", headers: userAuthHeader() }),
};

export const jobsApi = {
  ...resource("jobs"),
  mine: () => request("/jobs/mine/all", { headers: userAuthHeader() }),
  create: (payload) => request("/jobs", { method: "POST", body: JSON.stringify(payload), headers: userAuthHeader() }),
  update: (id, payload) => request(`/jobs/${id}`, { method: "PUT", body: JSON.stringify(payload), headers: userAuthHeader() }),
  remove: (id) => request(`/jobs/${id}`, { method: "DELETE", headers: userAuthHeader() }),
  close: (id) => request(`/jobs/${id}/close`, { method: "PATCH", headers: userAuthHeader() }),
};

const rawListingsApi = resource("listings");
export const listingsApi = {
  ...rawListingsApi,
  // Customer-facing browse only ever shows admin/seller-approved listings.
  list: async () => {
    const all = await rawListingsApi.list();
    return all.filter((l) => !l.status || l.status === "approved");
  },
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

/** Full account auth — register/login by phone + password. Same session as phone-OTP login below. */
export const userAuthApi = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }).then(storeUserSession),
  login: (phone, password) => request("/auth/login", { method: "POST", body: JSON.stringify({ phone, password }) }).then(storeUserSession),
  me: () => request("/auth/me", { headers: userAuthHeader() }),
  addRole: (role) => request("/auth/add-role", { method: "POST", body: JSON.stringify({ role }), headers: userAuthHeader() }),
  logout: () => { localStorage.removeItem(USER_TOKEN_KEY); localStorage.removeItem(USER_DATA_KEY); },
  isLoggedIn: () => Boolean(localStorage.getItem(USER_TOKEN_KEY)),
  currentUser: () => JSON.parse(localStorage.getItem(USER_DATA_KEY) || "null"),
};

/** Guest-posting seller flow: verify a phone number via OTP. Issues the same kind of
 *  session as userAuthApi, just without needing a password up front. */
export const sellerAuthApi = {
  requestOtp: (phone) => request("/auth/request-otp", { method: "POST", body: JSON.stringify({ phone }) }),
  verifyOtp: (phone, code, name) => request("/auth/verify-otp", { method: "POST", body: JSON.stringify({ phone, code, name }) }).then(storeUserSession),
  logout: userAuthApi.logout,
  isLoggedIn: userAuthApi.isLoggedIn,
  currentUser: userAuthApi.currentUser,
};

/** A seller managing their own posted Buy & Sell listings (existing marketplace feature). */
export const sellerListingsApi = {
  mine: () => request("/seller/listings/mine", { headers: userAuthHeader() }),
  create: (payload) => request("/seller/listings", { method: "POST", body: JSON.stringify(payload), headers: userAuthHeader() }),
  update: (id, payload) => request(`/seller/listings/${id}`, { method: "PUT", body: JSON.stringify(payload), headers: userAuthHeader() }),
  remove: (id) => request(`/seller/listings/${id}`, { method: "DELETE", headers: userAuthHeader() }),
  markSold: (id) => request(`/seller/listings/${id}/sold`, { method: "PATCH", headers: userAuthHeader() }),
};

/** Buyer → seller inquiries on Buy & Sell listings. Asking is public; reading your inbox needs login. */
export const inquiriesApi = {
  ask: (listingId, payload) => request(`/listings/${listingId}/inquiries`, { method: "POST", body: JSON.stringify(payload) }),
  mine: () => request("/inquiries", { headers: userAuthHeader() }),
  markRead: (id) => request(`/inquiries/${id}/read`, { method: "PATCH", headers: userAuthHeader() }),
};

/** Uploads a photo/video (as a Blob/File) to Cloudinary via the backend; returns { url }. */
export const uploadApi = {
  file: async (blob, filename = "upload.jpg") => {
    const formData = new FormData();
    formData.append("file", blob, filename);
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: userAuthHeader(), // no Content-Type — the browser sets the correct multipart boundary itself
      body: formData,
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.error || `Upload failed (${res.status})`);
    }
    return res.json();
  },
};

/** Platform-wide settings admin controls (ad slide duration, autoplay, commissions, etc.). */
export const platformSettingsApi = {
  get: () => request("/admin/settings"),
  update: (payload) => request("/admin/settings", { method: "PUT", body: JSON.stringify(payload), headers: authHeader() }),
};

/** Ad subscription plans — public list for pricing page, admin CRUD. */
export const subscriptionPlansApi = {
  list: () => request("/subscription-plans"),
  listAll: () => request("/subscription-plans?all=true", { headers: authHeader() }),
  create: (payload) => request("/subscription-plans", { method: "POST", body: JSON.stringify(payload), headers: authHeader() }),
  update: (id, payload) => request(`/subscription-plans/${id}`, { method: "PUT", body: JSON.stringify(payload), headers: authHeader() }),
  remove: (id) => request(`/subscription-plans/${id}`, { method: "DELETE", headers: authHeader() }),
};

/** The Post an Ad payment gate — Razorpay checkout + verification + current subscription status. */
export const subscriptionsApi = {
  mine: () => request("/subscriptions/mine", { headers: userAuthHeader() }),
  checkout: (planId) => request("/subscriptions/checkout", { method: "POST", body: JSON.stringify({ planId }), headers: userAuthHeader() }),
  verify: (payload) => request("/subscriptions/verify", { method: "POST", body: JSON.stringify(payload), headers: userAuthHeader() }),
};

/** Advertisements posted through an active subscription (separate from the older Buy & Sell listings). */
export const adsApi = {
  list: () => request("/ads"),
  get: (id) => request(`/ads/${id}`),
  mine: () => request("/ads/mine", { headers: userAuthHeader() }),
  create: (payload) => request("/ads", { method: "POST", body: JSON.stringify(payload), headers: userAuthHeader() }),
  adminAll: () => request("/ads/admin/all", { headers: authHeader() }),
  setStatus: (id, status) => request(`/ads/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }), headers: authHeader() }),
  toggleFeature: (id) => request(`/ads/${id}/feature`, { method: "PATCH", headers: authHeader() }),
};

/** In-app notifications for the logged-in user (buyer inquiries, ad status changes, etc). */
export const notificationsApi = {
  mine: () => request("/notifications", { headers: userAuthHeader() }),
  markRead: (id) => request(`/notifications/${id}/read`, { method: "PATCH", headers: userAuthHeader() }),
  markAllRead: () => request("/notifications/read-all", { method: "PATCH", headers: userAuthHeader() }),
};
