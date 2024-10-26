import { Link, type LinkProps, type ReactNode } from "@tanstack/react-router";
import type { FC } from "react";

const menus = [
	{ key: "dashboard", name: "Dashboard", path: "/" },
	{ key: "animals", name: "Animals", path: "/animals" },
] as const satisfies ReadonlyArray<{
	key: string;
	name: string;
	path: LinkProps["to"];
}>;

const Sidebar = () => {
	return (
		<div className="w-[300px] absolute h-screen border-r border-gray-200 px-4">
			<div className="mt-4 text-center mb-6 text-2xl font-semibold text-teal-600">
				Pedigree
			</div>

			<div className="border px-3 py-5 rounded-2xl">
				{menus.map((menu) => (
					<Link
						key={menu.key}
						to={menu.path}
						className="[&.active]:text-white [&.active]:bg-teal-500 block py-2 px-4 rounded-full"
					>
						{menu.name}
					</Link>
				))}
			</div>
		</div>
	);
};

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="flex">
			<Sidebar />
			<div className="ml-[calc(300px+24px)] mr-[24px] pt-[50px]">
				{children}
			</div>
		</div>
	);
};

export default MainLayout;
