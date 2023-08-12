import clsx from "clsx";

export function Container({ className, ...props }) {
  // className is a prop that can be passed to the Container component
  return (
    <div
      className={clsx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
