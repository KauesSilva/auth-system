import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

interface ProtectedRootLayoutProps {
  children: ReactNode;
}

export default async function ProtectedRootLayout({
  children,
}: ProtectedRootLayoutProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signIn");
  }

  return <main>{children}</main>;
}
