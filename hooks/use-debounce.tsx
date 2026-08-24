"use client";

import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay?: number) => {
  // set debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  // set debounced value when value changes
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};