import { forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

const baseStyles = {
  solid:
    "inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors",
  outline:
    "inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors",
};

const variantStyles = {
  solid: {
    cyan: "relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors",
    white:
      "bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70",
    gray: "bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80",
    danger:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-600 active:text-white/80",
  },
  outline: {
    gray: "border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80",
    cyan: "border-cyan-500 text-cyan-500 hover:border-cyan-600 active:bg-cyan-100 active:text-cyan-500/80",
    danger:
      "border-red-500 text-red-500 hover:border-red-600 active:bg-red-100 active:text-red-500/80",
  },
};

export const Button = forwardRef(function Button(
  {
    variant = "solid",
    color = "gray",
    className,
    href,
    children,
    disabled,
    ...props
  },
  ref
) {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return href ? (
    <Link ref={ref} href={href} className={className} {...props}>
      {children}
    </Link>
  ) : (
    <button
      ref={ref}
      className={`flex items-center gap-3 ${className}`}
      {...props}
      disabled={disabled}
    >
      <div>{children}</div>
      {disabled && (
        <div
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      )}
    </button>
  );
});
