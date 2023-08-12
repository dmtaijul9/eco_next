import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function Layout({ children }) {
  // children is a prop that can be passed to the Layout component to render its children
  return (
    <>
      <Header />
      <main className="flex-auto">{children}</main>
      <Footer />
    </>
  );
}
