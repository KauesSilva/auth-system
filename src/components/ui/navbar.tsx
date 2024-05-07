import type { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className="flex w-full justify-between items-center py-4 px-4">
      {children}
    </nav>
  );
}
