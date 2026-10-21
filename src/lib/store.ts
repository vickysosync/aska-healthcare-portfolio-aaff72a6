import { useCallback, useSyncExternalStore } from "react";

/** All demo content lives in localStorage under this prefix. */
export const STORAGE_PREFIX = "aska:v1:";

const cache = new Map<string, unknown>();
const listeners = new Set<() => void>();

export function isStorageAvailable(): boolean {
  try {
    const k = STORAGE_PREFIX + "__test";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

function read<T>(key: string, initial: T): T {
  if (cache.has(key)) return cache.get(key) as T;
  let value = initial;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (raw != null) value = JSON.parse(raw) as T;
  } catch {
    /* fall back to initial */
  }
  cache.set(key, value);
  return value;
}

export function writeStored<T>(key: string, value: T) {
  cache.set(key, value);
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage unavailable: keep in-memory */
  }
  listeners.forEach((l) => l());
}

export function resetAllDemoData() {
  try {
    Object.keys(window.localStorage)
      .filter((k) => k.startsWith(STORAGE_PREFIX) && !k.endsWith("session"))
      .forEach((k) => window.localStorage.removeItem(k));
  } catch {
    /* ignore */
  }
  for (const k of [...cache.keys()]) if (k !== "session") cache.delete(k);
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key?.startsWith(STORAGE_PREFIX)) {
      cache.delete(e.key.slice(STORAGE_PREFIX.length));
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** Persistent state hook. Server render uses `initial`; client reads saved data after hydration. */
export function useStored<T>(key: string, initial: T) {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key, initial),
    () => initial,
  );
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = read(key, initial);
      writeStored(key, typeof next === "function" ? (next as (p: T) => T)(prev) : next);
    },
    [key, initial],
  );
  return [value, set] as const;
}

export function uid(prefix = "id") {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `${prefix}-${Date.now().toString(36)}-${rand}`;
}
