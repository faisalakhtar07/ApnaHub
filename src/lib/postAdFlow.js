import { userAuthApi, subscriptionsApi } from "./api";

/**
 * The one and only "Post an Ad" journey. Every button that starts this flow —
 * Navbar, Home page CTAs, anywhere else — must call this instead of hardcoding
 * a route, so they can never drift apart again.
 */
export async function goToPostAd(navigate) {
  if (!userAuthApi.isLoggedIn()) return navigate("/subscribe");
  try {
    const res = await subscriptionsApi.mine();
    navigate(res.active ? "/create-ad" : "/subscribe");
  } catch {
    navigate("/subscribe");
  }
}
