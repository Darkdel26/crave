const CART_KEY = "crave-cart";

const isBrowser = () => typeof window !== "undefined";

function getCart() {
    if (!isBrowser()) return [];
    try {
        const raw = localStorage.getItem(CART_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    if (!isBrowser()) return [];
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: cart }));
    return cart;
}

export function addProduct(id) {
    const productId = Number(id);
    const cart = getCart();
    const existing = cart.find((i) => i.id === productId);

    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: productId, qty: 1 });
    }

    return saveCart(cart);
}

export function removeProduct(id) {
    const productId = Number(id);
    const cart = getCart().filter((i) => i.id !== productId);

    return saveCart(cart);
}

export function Increment(id) {
    const productId = Number(id);
    const cart = getCart();
    const item = cart.find((i) => i.id === productId);
    if (item) item.qty += 1;

    return saveCart(cart);
}

export function Decrement(id) {
    const productId = Number(id);
    let cart = getCart();
    const item = cart.find((i) => i.id === productId);
    if (!item) return cart;

    item.qty -= 1;
    if (item.qty <= 0) {
        cart = cart.filter((i) => i.id !== productId);
    }

    return saveCart(cart);
}

export function clearCart() {
    return saveCart([]);
}

export function getTotalItems() {
    return getCart().reduce((total, item) => total + item.qty, 0);
}

export function getCartItems() {
    return getCart();
}