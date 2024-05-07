import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { useUsersContext } from "@/context/UsersContext";

export default function RefreshButton() {
  const router = useRouter();

  return (
    <Button variant="ghost" type="button">
      Refresh
      <RefreshCcw className="ml-2 h-4 w-4" />
    </Button>
  );
}
