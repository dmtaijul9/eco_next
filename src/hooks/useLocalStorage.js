import { addToCart } from "@/redux/reducers/cartSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const dispatch = useDispatch();

  const changeValue = (value) => {
    setValue(value);
    localStorage.setItem(
      process.env.NEXT_PUBLIC_APP_NAME + key,
      JSON.stringify(value)
    );
  };

  useEffect(() => {
    const stored = localStorage.getItem(process.env.NEXT_PUBLIC_APP_NAME + key);

    if (!stored) {
      setValue(defaultValue);
      localStorage.setItem(
        process.env.NEXT_PUBLIC_APP_NAME,
        JSON.stringify(defaultValue)
      );
      dispatch(addToCart(defaultValue));
    } else {
      setValue(JSON.parse(stored));
      dispatch(addToCart(JSON.parse(stored)));
    }
  }, [key]);

  return [value, changeValue];
};

export default useLocalStorage;
