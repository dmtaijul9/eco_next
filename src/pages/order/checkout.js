import { Container } from "@/components/Container";
import { Layout } from "@/components/Layout";
import OrderForm from "@/components/pages/order/OrderForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import Logo from "@/icons/Logo";
import { formateMoney } from "@/tools/importantTools";
import { Disclosure } from "@headlessui/react";
import { FcEmptyFilter } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/reducers/cartSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const total = "$341.68";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/login");
    },
  });
  //INFO: This is a custom hook that will save the cart items in the local storage
  const [localCartItems, setCartItems] = useLocalStorage("CART", {
    items: [],
    totalItem: 0,
  });

  //INFO: This is a redux hook that will get the cart items from the redux store
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //INFO: counting total price of the cart items
  const totalPrice = cartItems?.items
    ?.map((item) => item.price * item.quantity)
    .reduce((total, item) => (total += item), 0);

  //INFO: This function will remove an item from the cart
  const handleRemoveItemFromCart = (product) => {
    //INFO: This will remove the item from the local storage
    const newCartItems = {
      items: cartItems?.items?.filter((item) => item._id !== product._id),
      totalItem: cartItems?.totalItem - product.quantity,
    };

    setCartItems(newCartItems);
    dispatch(addToCart(newCartItems));
  };

  return (
    <Layout>
      <Container>
        <main className="justify-between py-10 lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
          <div className="px-4 py-6 sm:px-6 lg:hidden">
            <div className="flex max-w-lg mx-auto">
              <Link href="/">
                <span className="sr-only">Your Company</span>
                <img
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                  className="w-auto h-8"
                />
              </Link>
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
                      {cartItems?.totalItem <= 0 && (
                        <li className="flex items-center justify-center gap-2 my-6">
                          <span>
                            <FcEmptyFilter className="w-10 h-10" />
                          </span>{" "}
                          <span>No items in cart.</span>
                        </li>
                      )}
                      {cartItems?.items?.map((product) => (
                        <li key={product._id} className="flex py-6 space-x-6">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={160}
                            height={160}
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
                                <span className="font-bold">Subtotal: </span>
                                {formateMoney(product.quantity * product.price)}
                              </p>
                            </div>
                            <div className="flex space-x-4">
                              <div className="flex pl-4 border-l border-gray-300">
                                <button
                                  type="button"
                                  className="text-sm font-medium text-red-600 hover:text-red-500"
                                  onClick={() =>
                                    handleRemoveItemFromCart(product)
                                  }
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
                    <span className="text-base">
                      {formateMoney(totalPrice)}
                    </span>
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
              {cartItems?.totalItem <= 0 && (
                <li className="flex items-center justify-center gap-2 mt-6">
                  <span>
                    <FcEmptyFilter className="w-10 h-10" />
                  </span>{" "}
                  <span>No items in cart.</span>
                </li>
              )}
              {cartItems?.items?.map((product) => (
                <li key={product.id} className="flex py-6 space-x-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={160}
                    height={160}
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
                        <span className="font-bold">Subtotal: </span>
                        {formateMoney(product.quantity * product.price)}
                      </p>
                    </div>
                    <div className="flex space-x-4">
                      <div className="flex pl-4 border-l border-gray-300">
                        <button
                          type="button"
                          className="text-sm font-medium text-red-600 hover:text-red-500"
                          onClick={() => handleRemoveItemFromCart(product)}
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
            className="w-full px-4 pt-12 pb-16 overflow-y-auto sm:px-6 sm:pt-16 lg:px-0 lg:pb-24 lg:pt-0"
          >
            <div className="max-w-lg mx-auto lg:mx-0">
              <div className="items-center justify-start hidden pt-10 pb-6 lg:flex">
                <Link
                  href="/"
                  className="flex items-center justify-center w-full"
                >
                  <Logo className="w-12 h-12 text-primary" text />
                </Link>
              </div>
              <OrderForm total={totalPrice} />
            </div>
          </section>
        </main>
      </Container>
    </Layout>
  );
}
