const CART_KEY = "apnahub_cart";
const EVENT = "apnahub:cart-updated";

function read() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(EVENT));
}

export const cart = {
  list: read,
  count: () => read().length,
  has: (id) => read().some((i) => String(i.id) === String(id)),
  add: (item) => {
    const items = read();
    if (items.some((i) => String(i.id) === String(item.id))) return items; // already in cart
    const updated = [...items, item];
    write(updated);
    return updated;
  },
  remove: (id) => {
    const updated = read().filter((i) => String(i.id) !== String(id));
    write(updated);
    return updated;
  },
  clear: () => write([]),
  /** Subscribe to cart changes (including from other tabs/components). Returns an unsubscribe function. */
  subscribe: (callback) => {
    const handler = () => callback(read());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  },
};
