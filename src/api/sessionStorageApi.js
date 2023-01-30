export function getFromStorage(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key))
  } catch (e) {
    console.error(e);

    return null;
  }
}

export function saveToStorage(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}
