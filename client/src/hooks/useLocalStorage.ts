import React, { useEffect, useState } from "react";

/**
 * The function returns `initialData'
 * if it's not there in the local storage or its return the value forms the local store of Type `T`
 * @param key key of an object
 * @param initialValue The value which you want to store if it's not in the local storge during fist call.
 */
const useLocalStorage = <T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);
    if (!data) return initialValue;

    // checking weather if the data is valid JSON or not, it not then return normal text.
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  });

  useEffect(() => {
    localStorage.setItem(
      key,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
