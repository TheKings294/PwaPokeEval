import {useEffect, useState} from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}