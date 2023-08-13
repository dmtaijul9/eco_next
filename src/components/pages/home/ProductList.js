import { Button } from "@/components/Button";
import useLocalStorage from "@/hooks/useLocalStorage";
import { addToCart } from "@/redux/reducers/cartSlice";
import { getAllEcoSpecialProducts } from "@/utils/resolvers/query";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListPlaceholder from "./ProductListPlaceholder";
import ProductListComonent from "@/components/ProductListComonent";
import { useRouter } from "next/router";

const ProductList = () => {
  //INFO: Get the cart from the local storage.
  const [localCartItems, setCartItems] = useLocalStorage("CART", {
    items: [],
    totalItem: 0,
  });
  const router = useRouter();
  //INFO: Get the cart from the redux store.
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // INFO: This is the function that will be called when the user clicks the "Add to Cart" button.
  const addToCartHandler = async (product) => {
    //INFO: Check if the product is already in the cart.
    const cartExists = cartItems.items.find((item) => item._id === product._id);

    if (cartExists) {
      //INFO: If the product is already in the cart, then increase the quantity by 1.
      const newCartItems = {
        items: cartItems.items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
        totalItem: cartItems.totalItem + 1,
      };

      //INFO: Update the cart in the local storage.
      setCartItems(newCartItems);
      //INFO: Update the cart in the redux store.
      dispatch(addToCart(newCartItems));
    } else {
      //INFO: If the product is not in the cart, then add the product to the cart.
      const newProduct = {
        ...product,
        quantity: 1,
      };
      //INFO: Update the cart in the local storage.
      setCartItems({
        items: [...cartItems.items, newProduct],
        totalItem: cartItems.totalItem + 1,
      });
      //INFO: Update the cart in the redux store.
      dispatch(
        addToCart({
          items: [...cartItems.items, newProduct],
          totalItem: cartItems.totalItem + 1,
        })
      );
    }
  };

  //INFO: Get all the products from the database.

  const { isLoading, data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllEcoSpecialProducts,
  });

  if (isError) {
    router.push("/500");
    return <div>Error</div>;
  }

  return (
    <ProductListComonent
      isLoading={isLoading}
      products={data?.data?.products}
      title="Eco_Next Special Products"
    />
  );
};

export default ProductList;
