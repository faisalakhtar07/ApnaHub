/**
 * Where a category card should send the user. "Coming soon" categories
 * (Property, Blood Donor) return null — the card stays inert.
 * Buy & Sell sub-categories filter that page by ?category=; the Vehicles
 * bucket covers both Cars and Bikes since that's the single category
 * sellers pick from in the Buy & Sell posting form.
 */
export function categoryDestination(title) {
  const map = {
    Jobs: "/jobs",
    "Local Businesses": "/businesses",
    "Buy & Sell": "/buy-sell",
    Electronics: "/buy-sell?category=Electronics",
    Cars: "/buy-sell?category=Vehicles",
    Bikes: "/buy-sell?category=Vehicles",
  };
  return map[title] || null;
}
