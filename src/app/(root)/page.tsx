"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { columns } from "@/components/users-table/columns";
import DataTable from "@/components/users-table/data-table";
import { useUsersContext } from "@/context/UsersContext";
import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const { users, setUsers } = useUsersContext();
  const handleLogout = () => {
    signOut();
    router.replace("/signIn");
  };

  useEffect(() => {
    const fetchUsers = () => {
      fetch("/api/user/read")
        .then((response) => response.json())
        .then((response) => {
          setUsers(response);
        });
    };

    fetchUsers();
  }, [setUsers]);

  if (!users) return <p>No users data</p>;

  return (
    <>
      <Menubar className="justify-end m-4">
        <MenubarMenu>
          <MenubarTrigger>Theme</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setTheme("light")}>
              Light{" "}
              <MenubarShortcut>
                <SunIcon />
              </MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => setTheme("dark")}>
              Dark
              <MenubarShortcut>
                <MoonIcon />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Options</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={handleLogout}>
              {"Logout"}
              <MenubarShortcut>
                <ExitIcon />
              </MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="xl:justify-center xl:flex xl:mx-0 mx-4">
        <DataTable columns={columns} data={users} />
      </div>
    </>
  );
}
