import React, { useState } from "react";

import { Tab } from "@headlessui/react";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getSingleProduct } from "@/utils/resolvers/query";
import Image from "next/image";
import { formateMoney } from "@/tools/importantTools";
import { Button } from "@/components/Button";
import PageLoader from "@/components/PageLoader";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "@/hooks/useLocalStorage";
import { addToCart } from "@/redux/reducers/cartSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SingleProductView = () => {
  //INFO: Get the product id from the url
  const router = useRouter();
  //INFO: Get the product id from the url
  const { productId } = router.query;

  const [localCartItems, setCartItems] = useLocalStorage("CART", {
    items: [],
    totalItem: 0,
  });
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //INFO: This is the query to get the single product data
  const { isLoading, data, isError } = useQuery({
    queryKey: ["singleProduct", productId],
    queryFn: () => getSingleProduct({ id: productId }),
    enabled: !!productId,
  });

  //INFO: This is the product data
  const product = data?.data?.product;

  //INFO: this function will add the product to the cart
  const addToCartHandler = () => {
    //INFO: Check if the product is already in the cart

    const existInCart = cartItems.items.find(
      (item) => item._id === product._id
    );

    if (existInCart) {
      //INFO: If the product is already in the cart then update the quantity
      const updatedCartItems = {
        items: cartItems.items.map((item) => {
          if (item._id === product._id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          } else {
            //INFO: If the product is not in the cart then return the item
            return item;
          }
        }),
        totalItem: cartItems.totalItem + 1,
      };

      //INFO: Update the cart items in the local storage
      setCartItems(updatedCartItems);
      //INFO: Update the cart items in the redux store
      dispatch(addToCart(updatedCartItems));
    } else {
      //INFO: If the product is not in the cart then add the product to the cart
      const newCartItems = {
        items: [...cartItems.items, { ...product, quantity: 1 }],
        totalItem: cartItems.totalItem + 1,
      };

      //INFO: Update the cart items in the local storage
      setCartItems(newCartItems);
      //INFO: Update the cart items in the redux store
      dispatch(addToCart(newCartItems));
    }
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                <Tab className="relative flex items-center justify-center h-24 text-sm font-medium text-gray-900 uppercase bg-white rounded-md cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                  {({ selected }) => (
                    <>
                      <span className="sr-only">{product.name}</span>
                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <Image
                          src={product?.image}
                          alt={product?.name}
                          width={300}
                          height={300}
                          className="object-cover object-center w-full h-full"
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? "ring-indigo-500" : "ring-transparent",
                          "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </Tab>
              </Tab.List>
            </div>

            <Tab.Panels className="w-full aspect-h-1 aspect-w-1">
              <Tab.Panel key={product._id}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-cover object-center w-full h-full sm:rounded-lg"
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="px-4 mt-10 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {formateMoney(product.price)}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
            <div className="mt-6">
              {/* Colors */}

              <div className="flex mt-10">
                <Button
                  color="cyan"
                  type="button"
                  className="w-full max-w-sm "
                  onClick={addToCartHandler}
                >
                  Add to bag
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;
