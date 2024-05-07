"use client";

import type React from "react";
import { type ReactNode, createContext, useContext, useState } from "react";
import type { IUser } from "@/types/IUser";

interface usersContextProps {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  fetchUsers: () => void;
}

interface UsersProviderProps {
  children: ReactNode;
}

const usersContext = createContext<usersContextProps | undefined>(undefined);

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = () => {
    fetch("/api/user/read")
      .then((response) => response.json())
      .then((response) => {
        setUsers(response);
      });
  };

  return (
    <usersContext.Provider value={{ users, setUsers, fetchUsers }}>
      {children}
    </usersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(usersContext);
  if (!context) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
};
