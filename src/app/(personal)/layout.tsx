import Header from "@components/header/Header";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <Header />
      {children}
    </div>
  );
}
