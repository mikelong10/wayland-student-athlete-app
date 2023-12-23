import { Footer } from "@components/footer/Footer";
import Header from "@components/header/Header";
import ScrollToTopButton from "@components/ScrollToTopButton";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header />
      {children}
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
