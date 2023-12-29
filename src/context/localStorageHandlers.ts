export function saveToLocalStorage(key: string, value: string) {
    window.localStorage.setItem(key, value);
}

export function getFromLocalStorage(key: string): string | null {
    return window.localStorage.getItem(key);
}

export function removeFromLocalStorage(key: string) {
    window.localStorage.removeItem(key)
}