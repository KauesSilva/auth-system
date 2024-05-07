"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUsersContext } from "@/context/UsersContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUsers } = useUsersContext();

  const handleSubmit = async () => {
    await axios
      .post("/api/user/create", { name, email, password })
      .then((response) => {
        toast.success("Registered sucessfully");
        setUsers(response.data);
        router.replace("/signIn");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error?.response?.data);
      });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your username"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="jus" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <p className="font-light">
          Already have an account?{" "}
          <Link href={"/"} className="font-medium">
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
