import { Link, type LinkProps, type ReactNode } from "@tanstack/react-router";
import { useState, type FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import enFlag from "@/assets/flags/en.png";
import { BiCollapseHorizontal, BiExpandHorizontal } from "react-icons/bi";
import { PiCodesandboxLogo, PiCow } from "react-icons/pi";
import { cn } from "@/common/lib/utils";
import { Button } from "../components/ui/button";
import { FiLogOut } from "react-icons/fi";
import { ChevronDown } from "lucide-react";
import { TiFlowMerge } from "react-icons/ti";
import { BsHouseHeart } from "react-icons/bs";
import { useAuth } from "@/modules/auth/contexts/AuthContext";

const menus = [
  {
    key: "dashboard",
    name: "Dashboard",
    path: "/",
    icon: <PiCodesandboxLogo className="shrink-0" />,
  },
  {
    key: "animals",
    name: "Animals",
    path: "/animals",
    icon: <PiCow className="shrink-0" />,
  },
  {
    key: "pedigree",
    name: "Pedigree",
    path: "/pedigree",
    icon: <TiFlowMerge className="shrink-0" />,
  },
  {
    key: "breeding",
    name: "Breeding",
    path: "/breeding",
    icon: <BsHouseHeart className="shrink-0" />,
  },
] as const satisfies ReadonlyArray<{
  key: string;
  name: string;
  path: LinkProps["to"];
  icon: ReactNode;
}>;

const Sidebar: FC<{
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
}> = ({ collapse, setCollapse }) => {
  return (
    <div
      className={cn(
        "bg-neutral-50 transition-all ease-in-out fixed h-screen border-r border-gray-200",
        {
          "w-[300px] px-4": !collapse,
          "w-[50px] px-1": collapse,
        },
      )}
    >
      <div className="mt-2.5 text-center mb-6 text-2xl font-semibold text-teal-700">
        {!collapse ? "Pedigree" : "P"}
      </div>

      <div
        className={cn("py-5 rounded-2xl", {
          "px-3 border": !collapse,
        })}
      >
        {menus.map((menu) => (
          <Link
            key={menu.key}
            to={menu.path}
            className={cn(
              "flex items-center gap-x-2 [&.active]:text-neutral-50 [&.active]:font-semibold [&.active]:bg-teal-600 py-2 rounded-full",
              {
                "px-4": !collapse,
                "px-2 justify-center": collapse,
              },
            )}
          >
            {menu.icon}
            {!collapse ? menu.name : undefined}
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setCollapse(!collapse)}
        className="border text-neutral-500 grid place-items-center bg-white rounded-full size-[26px] absolute top-[14px] right-[-13px]"
      >
        {collapse ? (
          <BiExpandHorizontal className="text-inherit" />
        ) : (
          <BiCollapseHorizontal className="text-inherit" />
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
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="flex">
      <Sidebar collapse={collapse} setCollapse={setCollapse} />

      <div
        className={cn("mr-[24px] flex-1", {
          "ml-[calc(300px+24px)]": !collapse,
          "ml-[calc(50px+24px)]": collapse,
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
              <img
                src={
                  user?.profilePictureUrl ||
                  "https://avatar.iran.liara.run/public/46"
                }
                alt="Language"
                className="size-9 rounded-full"
              />
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
              <FiLogOut className="size-4" />
            </Button>
          </div>
        </div>

        <div className="pt-4 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
