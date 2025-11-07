
import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  PREFS: 'prefs_v1',
  WISHLIST: 'wishlist_v1'
}

export async function savePrefs(prefs: string[]) {
  await AsyncStorage.setItem(KEYS.PREFS, JSON.stringify(prefs));
}

export async function loadPrefs(): Promise<string[] | null> {
  const s = await AsyncStorage.getItem(KEYS.PREFS);
  return s ? JSON.parse(s) : null;
}

export async function addToWishlist(id: string) {
  const cur = await loadWishlist();
  const set = new Set(cur || []);
  set.add(id);
  await AsyncStorage.setItem(KEYS.WISHLIST, JSON.stringify(Array.from(set)));
}
export async function removeFromWishlist(id: string) {
  const cur = await loadWishlist();
  const set = new Set(cur || []);
  set.delete(id);
  await AsyncStorage.setItem(KEYS.WISHLIST, JSON.stringify(Array.from(set)));
}
export async function loadWishlist(): Promise<string[] | null> {
  const s = await AsyncStorage.getItem(KEYS.WISHLIST);
  return s ? JSON.parse(s) : [];
}
export async function resetPrefs() {
  await AsyncStorage.removeItem(KEYS.PREFS);
}
