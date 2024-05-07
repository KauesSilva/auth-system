import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useUsersContext } from "@/context/UsersContext";

const UserActionsCell = ({ row }: any) => {
  const id = row.original.id;
  const [name, setName] = useState(row.original.name);
  const [email, setEmail] = useState(row.original.email);
  const [password, setPassword] = useState(row.original.hashedPassword);
  const { fetchUsers } = useUsersContext();

  const handleDelete = async () => {
    await axios
      .delete(`/api/user/delete?id=${id}`)
      .then((response) => {
        fetchUsers();
        toast.success(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error while deleting user");
      });
  };

  const handleEdit = async () => {
    await axios
      .post(`/api/user/update?id=${id}`, { name, email, password })
      .then((response) => {
        fetchUsers();
        toast.success(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error while updating user");
      });
  };

  return (
    <DropdownMenu>
      <Dialog>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit user</DialogTitle>
            <DialogDescription>
              Make changes to user profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                className="col-span-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEdit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>

        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </Dialog>
    </DropdownMenu>
  );
};

export default UserActionsCell;
