"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleClick = () => {
    signOut();
    router.replace("/signIn");
  };
  return <Button onClick={handleClick}>Logout</Button>;
}
