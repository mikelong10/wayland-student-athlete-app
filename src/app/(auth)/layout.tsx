interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-secondary to-white to-70% dark:from-stone-900 dark:to-background">
      {children}
    </div>
  );
}
