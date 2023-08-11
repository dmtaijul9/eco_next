import Link from "next/link";

import { CirclesBackground } from "@/components/CirclesBackground";
import Logo from "@/icons/Logo";

export function AuthLayout({ title, subtitle, children }) {
  return (
    <main className="flex min-h-full pt-16 overflow-hidden sm:py-28">
      <div className="flex flex-col w-full max-w-2xl px-4 mx-auto sm:px-6">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center justify-center"
        >
          <Logo className="w-auto h-10 mx-auto" text />
        </Link>
        <div className="relative mt-12 sm:mt-16">
          <CirclesBackground
            width="1090"
            height="1090"
            className="absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto"
          />
          <h1 className="text-2xl font-medium tracking-tight text-center text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-lg text-center text-gray-600">{subtitle}</p>
          )}
        </div>
        <div className="flex-auto px-4 py-10 mt-10 -mx-4 bg-white shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-5xl sm:p-24">
          {children}
        </div>
      </div>
    </main>
  );
}
