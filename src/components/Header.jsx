import React, { Fragment, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { AiOutlineUser } from "react-icons/ai";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@/icons/Logo";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CartNav from "./CartNav";

export function Header() {
  const { data: session, status } = useSession({
    required: true,
  });

  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white " style={{ zIndex: 900 }}>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative lg:hidden"
          onClose={setOpen}
          style={{ zIndex: 9000 }}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex" style={{ zIndex: 9000 }}>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="relative inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}

                <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="block p-2 -m-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-6 space-y-6 border-t border-gray-200">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="block p-2 -m-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="block p-2 -m-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white border-b ">
        <nav
          aria-label="Top"
          className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <div>
            <div className="flex items-center h-16">
              <button
                type="button"
                className="relative p-2 text-gray-400 bg-white rounded-md lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="flex ml-4 lg:ml-0">
                <Link href="/">
                  <span className="sr-only">Your Company</span>
                  <Logo className="w-6 h-6 text-primary" />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex items-center ml-auto">
                {
                  // if user is logged in then remove login and signup link

                  status !== "authenticated" ? (
                    <>
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Link
                          href="/login"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Sign in
                        </Link>
                        <span
                          className="w-px h-6 bg-gray-200"
                          aria-hidden="true"
                        />
                        <Link
                          href="/register"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Create account
                        </Link>
                      </div>
                    </>
                  ) : (
                    <Popover className="relative">
                      <Popover.Button className="flex items-center ">
                        <AiOutlineUser className="w-6 h-6 text-gray-700" />
                      </Popover.Button>

                      <Popover.Panel className="absolute right-0 z-10 max-w-sm mt-2 bg-white border w-52 top-5">
                        <div className="grid w-full grid-cols-1">
                          <Link
                            className="w-full px-3 py-1 text-center hover:bg-gray-500"
                            href="/analytics"
                          >
                            Analytics
                          </Link>
                          <Link
                            className="w-full px-3 py-1 text-center border-t hover:bg-gray-500"
                            href="/engagement"
                          >
                            Engagement
                          </Link>
                          <Link
                            className="w-full px-3 py-1 text-center border-t hover:bg-gray-500"
                            href="/security"
                          >
                            Security
                          </Link>
                          <Link
                            className="w-full px-3 py-1 text-center border-t hover:bg-gray-500"
                            href="/integrations"
                          >
                            Integrations
                          </Link>
                        </div>
                      </Popover.Panel>
                    </Popover>
                  )
                }

                <CartNav />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
