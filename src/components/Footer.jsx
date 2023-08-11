import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { TextField } from "@/components/Fields";

import { NavLinks } from "@/components/NavLinks";
import qrCode from "@/images/qr-code.svg";
import Logo from "@/icons/Logo";

function QrCodeBorder(props) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden="true" {...props}>
      <path
        d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <Container>
        <div className="flex flex-col items-start justify-between pt-16 pb-6 gap-y-12 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <div>
                <Logo className="w-10 h-10 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-base font-semibold">Eco_Next</p>
                <p className="mt-1 text-sm">Make Your Home Shopping Mall</p>
              </div>
            </div>
          </div>
          <nav className="flex gap-8 ">
            <NavLinks />
          </nav>
        </div>
        <div className="flex flex-col items-center pt-8 pb-12 border-t border-gray-200 md:flex-row-reverse md:justify-between md:pt-6">
          <form className="flex justify-center w-full md:w-auto">
            <TextField
              type="email"
              aria-label="Email address"
              placeholder="Email address"
              autoComplete="email"
              required
              className="min-w-0 w-60 shrink"
            />
            <Button type="submit" color="cyan" className="flex-none ml-4">
              <span className="hidden lg:inline">Join our newsletter</span>
              <span className="lg:hidden">Join newsletter</span>
            </Button>
          </form>
          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
