import React, { useEffect, useState } from "react";


const useLocalStorage = <T, >(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const data = localStorage.getItem(key);
    if (!data)
      return initialValue;

    // checking weather if the data is valid JSON or not.
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));

  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;