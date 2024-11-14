import { type User } from "next-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./UserAvatar";
import { LogoutButton } from "./LogoutButton";

type UserNavigationProps = {
  user: Pick<User, "name" | "image" | "email">;
};

export const UserNavigation = ({ user }: UserNavigationProps) => {
  return (
    <div className="flex items-center space-x-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <UserAvatar size={40} user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white p-2" align="end">
          <div className="w-[250px] flex flex-col items-center pt-2 pb-6">
            <UserAvatar user={user} size={120} />
            <div className="my-2 text-base">{user.name || ""}</div>
            <div className="text-sm">{user.email || ""}</div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};