import { Link, type LinkProps, type ReactNode } from "@tanstack/react-router";
import { useState, type FC } from "react";
import { useSidebar } from "@/modules/common/contexts/SidebarContext"; // Import the context hook

import enFlag from "@/assets/flags/en.png";
import { cn } from "@/modules/common/lib/utils";
import {
  BirdIcon,
  ChevronDown,
  ChevronsLeftRight,
  ChevronsRightLeft,
  CodesandboxIcon,
  GitForkIcon,
  HeartIcon,
  LogOutIcon,
} from "lucide-react";
import { useAuth } from "@/modules/auth/contexts/AuthContext";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

const menus = [
  {
    key: "dashboard",
    name: "Dashboard",
    path: "/",
    icon: <CodesandboxIcon className="shrink-0" size={16} />,
  },
  {
    key: "animals",
    name: "Animals",
    path: "/animals",
    icon: <BirdIcon className="shrink-0" size={16} />,
  },
  {
    key: "pedigree",
    name: "Pedigree",
    path: "/pedigree",
    icon: <GitForkIcon className="shrink-0" size={16} />,
  },
  {
    key: "breeding",
    name: "Breeding",
    path: "/breeding",
    icon: <HeartIcon className="shrink-0" size={16} />,
  },
] as const satisfies ReadonlyArray<{
  key: string;
  name: string;
  path: LinkProps["to"];
  icon: ReactNode;
}>;

const Sidebar: FC = () => {
  // Use the sidebar context instead of props
  const { collapsed, toggleSidebar } = useSidebar();

  return (
    <div
      className={cn(
        "bg-neutral-50 transition-all ease-in-out fixed h-screen border-r border-gray-200",
        {
          "w-[300px] px-4": !collapsed,
          "w-[50px] px-1": collapsed,
        },
      )}
    >
      <div className="mt-2.5 text-center mb-6 text-2xl font-semibold text-teal-700">
        {!collapsed ? "Pedigree" : "P"}
      </div>

      <div
        className={cn("py-5 rounded-2xl", {
          "px-3 border": !collapsed,
        })}
      >
        {menus.map((menu) => (
          <Link
            key={menu.key}
            to={menu.path}
            className={cn(
              "flex items-center gap-x-2 [&.active]:text-neutral-50 [&.active]:font-semibold [&.active]:bg-teal-600 py-2 rounded-full",
              {
                "px-4": !collapsed,
                "px-2 justify-center": collapsed,
              },
            )}
          >
            {menu.icon}
            {!collapsed ? menu.name : undefined}
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={toggleSidebar} // Use context method
        className="border text-neutral-500 grid place-items-center bg-white rounded-full size-[26px] absolute top-[14px] right-[-13px]"
      >
        {collapsed ? (
          <ChevronsLeftRight className="text-inherit" size={16} />
        ) : (
          <ChevronsRightLeft className="text-inherit" size={16} />
        )}
      </button>
    </div>
  );
};

const languageOptions = [
  { key: "en", name: "English", flagImgPath: enFlag },
  // { key: "id", name: "Indonesia", flagImgPath: idFlag },
] as const satisfies ReadonlyArray<{
  key: "id" | "en";
  name: string;
  flagImgPath: string;
}>;

type LanguageOption = (typeof languageOptions)[number];

const LanguageSwitcher = () => {
  const [current, setCurrent] = useState<LanguageOption["key"]>("en");

  const activeOption = languageOptions.find((option) => option.key === current);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="py-2 border px-3 flex items-center rounded-lg">
        <img
          src={activeOption?.flagImgPath}
          alt="Language"
          className="size-3 rounded-full"
        />
        <ChevronDown className="text-neutral-500 ml-2 size-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.key}
            onClick={() => setCurrent(option.key)}
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  // Use the sidebar context instead of local state
  const { collapsed } = useSidebar();

  return (
    <div className="flex">
      <Sidebar />

      <div
        className={cn("mr-[24px] flex-1", {
          "ml-[calc(300px+24px)]": !collapsed,
          "ml-[calc(50px+24px)]": collapsed,
        })}
      >
        <div className="bg-neutral-50 border-b px-4 py-2 w-[calc(100%+48px)] ml-[-24px] flex justify-between items-center">
          <div className="ml-3">
            {/* <div className="relative opacity-40 transition-all hover:opacity-100 ease-in-out">
              <Input
                placeholder="Search your animals"
                className="w-[300px] rounded-3xl"
              />
              <Button className="absolute right-0 top-0" variant="link">
                <FiSearch />
              </Button>
            </div> */}
          </div>
          <div className="flex items-center">
            <LanguageSwitcher />

            <div className="mx-4 border-l h-5" />

            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={user?.profilePictureUrl} />
                <AvatarFallback>
                  {(user?.name || "").charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-xs text-neutral-400 ml-2">
                <div>{user?.name}</div>
                <div>{user?.email}</div>
              </div>
            </div>

            <div className="mx-4 border-l h-5" />

            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5 text-neutral-500 hover:text-red-600 transition-colors"
            >
              <LogOutIcon className="size-4" />
            </Button>
          </div>
        </div>

        <div className="pt-4 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
