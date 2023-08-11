import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useLocalStorage from "@/hooks/useLocalStorage";
import { addToCart } from "@/redux/reducers/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { formateMoney } from "@/tools/importantTools";
import { Button } from "./Button";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  //INFO: Get the cart from the local storage.
  const [localCartItems, setCartItems] = useLocalStorage("CART", {
    items: [],
    totalItem: 0,
  });
  //INFO: Get the cart from the redux store.
  const cartItems = useSelector((state) => state.cart);

  //INFO: This is the function that will be called when the user clicks the "Remove" button.
  const removeCartItem = () => {
    //INFO: Remove the item from the cart.
    const newCartItems = {
      items: cartItems.items.filter((cartItem) => cartItem._id !== item._id),
      totalItem: cartItems.totalItem - item.quantity,
    };
    //INFO: Update the cart in the local storage.
    setCartItems(newCartItems);
    //INFO: Update the cart in the redux store.
    dispatch(addToCart(newCartItems));
  };

  return (
    <li key={item._id} className="flex py-6">
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
        <Image
          src={item.image}
          alt={item.name}
          width={150}
          height={150}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-1 ml-4">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/product/${item._id}`}>{item.name}</Link>
            </h3>
            <p className="ml-4">{formateMoney(item.price * item.quantity)}</p>
          </div>
        </div>
        <div className="flex items-end justify-between flex-1 text-sm">
          <p className="text-gray-500">
            <span className="font-semibold">Qty:</span> {item.quantity}
          </p>

          <div className="flex">
            <Button type="button" color="danger" onClick={removeCartItem}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

const CartNav = () => {
  //INFO: Get the cart from the redux store.
  const cartItems = useSelector((state) => state.cart);
  //INFO: This is the state that will be used to show/hide the cart.
  const [open, setOpen] = useState(false);

  //INFO: This is the total price of the cart.
  const totalPrice = cartItems?.items
    ?.map((item) => item.price * item.quantity)
    .reduce((total, item) => (total += item), 0);

  return (
    <>
      <div className="flow-root ml-4 lg:ml-6">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="flex items-center p-2 -m-2 group"
        >
          <ShoppingBagIcon
            className="flex-shrink-0 w-6 h-6 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {cartItems?.totalItem > 0 ? cartItems?.totalItem : null}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                    <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="flex items-center ml-3 h-7">
                            <button
                              type="button"
                              className="relative p-2 -m-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="w-6 h-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartItems?.totalItem > 0 ? (
                                cartItems?.items?.map((product) => (
                                  <CartItem item={product} key={product._id} />
                                ))
                              ) : (
                                <p className="text-center">No items in cart</p>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>${totalPrice}</p>
                        </div>

                        <div className="mt-6">
                          <Link
                            href="/order/checkout"
                            className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                          >
                            Checkout
                          </Link>
                        </div>
                        <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CartNav;
