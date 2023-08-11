import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import useLocalStorage from "@/hooks/useLocalStorage";
import Logo from "@/icons/Logo";
import { Disclosure } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useSelector } from "react-redux";

const total = "$341.68";
const products = [
  {
    id: 1,
    name: "Micro Backpack",
    href: "#",
    price: "$70.00",
    color: "Moss",
    size: "5L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  // More products...
];

export default function Example() {
  const [localCartItems, setCartItems] = useLocalStorage("CART", {
    items: [],
    totalItem: 0,
  });
  const cartItems = useSelector((state) => state.cart);

  const totalPrice = cartItems?.items
    ?.map((item) => item.price * item.quantity)
    .reduce((total, item) => (total += item), 0);

  return (
    <Layout>
      <Container>
        <main className="justify-between py-10 lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
          <div className="px-4 py-6 sm:px-6 lg:hidden">
            <div className="flex max-w-lg mx-auto">
              <a href="#">
                <span className="sr-only">Your Company</span>
                <img
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                  className="w-auto h-8"
                />
              </a>
            </div>
          </div>

          <h1 className="sr-only">Checkout</h1>

          {/* Mobile order summary */}
          <section
            aria-labelledby="order-heading"
            className="px-4 py-6 bg-gray-50 sm:px-6 lg:hidden"
          >
            <Disclosure as="div" className="max-w-lg mx-auto">
              {({ open }) => (
                <>
                  <div className="flex items-center justify-between">
                    <h2
                      id="order-heading"
                      className="text-lg font-medium text-gray-900"
                    >
                      Your Order
                    </h2>
                    <Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
                      {open ? (
                        <span>Hide full summary</span>
                      ) : (
                        <span>Show full summary</span>
                      )}
                    </Disclosure.Button>
                  </div>

                  <Disclosure.Panel>
                    <ul
                      role="list"
                      className="border-b border-gray-200 divide-y divide-gray-200"
                    >
                      {cartItems?.items?.map((product) => (
                        <li key={product.id} className="flex py-6 space-x-6">
                          <img
                            src={product.imageSrc}
                            alt={product.imageAlt}
                            className="flex-none object-cover object-center w-40 h-40 bg-gray-200 rounded-md"
                          />
                          <div className="flex flex-col justify-between space-y-4">
                            <div className="space-y-1 text-sm font-medium">
                              <h3 className="text-gray-900">
                                <span className="font-bold">Name: </span>
                                {product.name}
                              </h3>
                              <p className="text-gray-900">
                                {" "}
                                <span className="font-bold">Price: </span> $
                                {product.price}
                              </p>
                              <p className="text-gray-900">
                                <span className="font-bold">Quantity: </span>{" "}
                                {product.quantity}
                              </p>
                              <p className="text-gray-900">
                                <span className="font-bold">Subtotal: </span>$
                                {product.quantity * product.price}
                              </p>
                            </div>
                            <div className="flex space-x-4">
                              <div className="flex pl-4 border-l border-gray-300">
                                <button
                                  type="button"
                                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                      <div className="flex justify-between">
                        <dt>Total Items</dt>
                        <dd className="text-gray-900">
                          {cartItems?.totalItem}
                        </dd>
                      </div>
                    </dl>
                  </Disclosure.Panel>

                  <p className="flex items-center justify-between pt-6 mt-6 text-sm font-medium text-gray-900 border-t border-gray-200">
                    <span className="text-base">Total</span>
                    <span className="text-base">${totalPrice}</span>
                  </p>
                </>
              )}
            </Disclosure>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="flex-col hidden w-full max-w-md bg-gray-50 lg:flex"
          >
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <ul
              role="list"
              className="flex-auto px-6 overflow-y-auto divide-y divide-gray-200"
            >
              {cartItems?.items?.map((product) => (
                <li key={product.id} className="flex py-6 space-x-6">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="flex-none object-cover object-center w-40 h-40 bg-gray-200 rounded-md"
                  />
                  <div className="flex flex-col justify-between space-y-4">
                    <div className="space-y-1 text-sm font-medium">
                      <h3 className="text-gray-900">
                        <span className="font-bold">Name: </span>
                        {product.name}
                      </h3>
                      <p className="text-gray-900">
                        {" "}
                        <span className="font-bold">Price: </span> $
                        {product.price}
                      </p>
                      <p className="text-gray-900">
                        <span className="font-bold">Quantity: </span>{" "}
                        {product.quantity}
                      </p>
                      <p className="text-gray-900">
                        <span className="font-bold">Subtotal: </span>$
                        {product.quantity * product.price}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex border-l border-gray-300">
                        <button
                          type="button"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="sticky bottom-0 flex-none p-6 border-t border-gray-200 bg-gray-50">
              <dl className="mt-2 space-y-6 text-sm font-medium text-gray-500">
                <div className="flex items-center justify-between pt-2 text-gray-500 ">
                  <dt className="text-base">Total Items</dt>
                  <dd className="text-base text-gray-900">
                    {cartItems?.totalItem ? cartItems?.totalItem : 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between pt-2 text-gray-900 border-t ">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">${totalPrice}</dd>
                </div>
              </dl>
            </div>
          </section>

          {/* Checkout form */}
          <section
            aria-labelledby="payment-heading"
            className="px-4 pt-12 pb-16 overflow-y-auto sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
          >
            <div className="max-w-lg mx-auto">
              <div className="items-center justify-start hidden pt-10 pb-6 lg:flex">
                <Link
                  href="/"
                  className="flex items-center justify-center w-full"
                >
                  <Logo className="w-12 h-12 text-primary" text />
                </Link>
              </div>
              0
              <form className="mt-6">
                <div className="grid grid-cols-12 gap-x-4 gap-y-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email-address"
                        name="email-address"
                        autoComplete="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="name-on-card"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name on card
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name-on-card"
                        name="name-on-card"
                        autoComplete="cc-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="card-number"
                        name="card-number"
                        autoComplete="cc-number"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-8 sm:col-span-9">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration date (MM/YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-4 sm:col-span-3">
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="csc"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        autoComplete="street-address"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-4">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="city"
                        name="city"
                        autoComplete="address-level2"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-4">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State / Province
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="region"
                        name="region"
                        autoComplete="address-level1"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-full sm:col-span-4">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="postal-code"
                        name="postal-code"
                        autoComplete="postal-code"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex mt-6 space-x-2">
                  <div className="flex items-center h-5">
                    <input
                      id="same-as-shipping"
                      name="same-as-shipping"
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </div>
                  <label
                    htmlFor="same-as-shipping"
                    className="text-sm font-medium text-gray-900"
                  >
                    Billing address is the same as shipping address
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Pay {total}
                </button>

                <p className="flex justify-center mt-6 text-sm font-medium text-gray-500">
                  <LockClosedIcon
                    className="mr-1.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Payment details stored in plain text
                </p>
              </form>
            </div>
          </section>
        </main>
      </Container>
    </Layout>
  );
}
