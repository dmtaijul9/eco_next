import { Button } from "@/components/Button";
import PageLoader from "@/components/PageLoader";
import { getAllProductsQuery } from "@/utils/resolvers/query";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductListPlaceholder from "../home/ProductListPlaceholder";
import Link from "next/link";
import Image from "next/image";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/reducers/cartSlice";

const ShopPageComonent = () => {
  //INFO: Get the cart from the local storage.
  const [localCartItems, setCartItems] = useLocalStorage("CART", {
    items: [],
    totalItem: 0,
  });
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
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProductsQuery,
  });

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          All Products
        </h2>

        {isLoading ? (
          <ProductListPlaceholder />
        ) : (
          <div className="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data?.data?.products?.map((product) => (
              <div key={product._id} className="relative group">
                <Link href={`/product/${product._id}`}>
                  <div className="w-full overflow-hidden bg-gray-200 rounded-md cursor-pointer aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={250}
                      className="object-cover object-center w-full h-full lg:h-full lg:w-full"
                    />
                  </div>
                </Link>
                <div className="flex justify-between mt-4">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/product/${product._id}`}>
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-medium text-gray-900">
                      ${product.price}
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <Button
                    className="py-0.5 font-normal w-full"
                    onClick={() => {
                      addToCartHandler(product);
                    }}
                  >
                    Add To Card
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPageComonent;
