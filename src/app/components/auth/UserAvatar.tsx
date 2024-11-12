import { Avatar } from "@/components/ui/avatar";
import { type User } from "next-auth";
import Image from "next/image";

type UserAvatarProps = {
  user: Pick<User, "image" | "name">;
  size: number;
};

export const UserAvatar = ({ user, size }: UserAvatarProps) => {
  const imageURL = user.image || "/avatar/no-image.jpeg";
  return (
    <Avatar
      className={`w-[${size}px] h-[${size}px] border-2 border-gray-200 shadow-lg`}
    >
      <Image width={size} height={size} src={imageURL} alt="user image" />
    </Avatar>
  );
};