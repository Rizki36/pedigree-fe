import { AnimalGender, AnimalStatus } from "@/modules/animal/types";
import MainLayout from "@/modules/common/components/layouts/MainLayout";
import { cn } from "@/modules/common/lib/utils";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

type TreeNodeItem = {
  label: string;
  value: number;
  color: string;
  children?: TreeNodeItem[];
  linkProps?: LinkProps;
};

// Pastel color palette
const colors = {
  root: "#FFFFFF",
  male: "#BFDBFE", // pastel blue
  female: "#FBE3E4", // pastel pink
  alive: "#BBF7D0", // pastel green
  dead: "#FECACA", // pastel red
};

const Dashboard = () => {
  // Animal distribution data
  const animalData: TreeNodeItem = {
    label: "Total Animal",
    value: 40,
    color: colors.root,
    linkProps: {
      to: "/animals",
    },
    children: [
      {
        label: "Male",
        value: 20,
        color: colors.male,
        children: [
          {
            label: "Dead",
            value: 10,
            color: colors.dead,
            linkProps: {
              to: "/animals",
              search: {
                gender: [AnimalGender.MALE],
                status: [AnimalStatus.DEAD],
              },
            },
          },
          {
            label: "Alive",
            value: 10,
            color: colors.alive,
            linkProps: {
              to: "/animals",
              search: {
                gender: [AnimalGender.MALE],
                status: [AnimalStatus.ALIVE],
              },
            },
          },
        ],
        linkProps: {
          to: "/animals",
          search: {
            gender: [AnimalGender.MALE],
          },
        },
      },
      {
        label: "Female",
        value: 20,
        color: colors.female,
        children: [
          {
            label: "Dead",
            value: 10,
            color: colors.dead,
            linkProps: {
              to: "/animals",
              search: {
                gender: [AnimalGender.FEMALE],
                status: [AnimalStatus.DEAD],
              },
            },
          },
          {
            label: "Alive",
            value: 10,
            color: colors.alive,
            linkProps: {
              to: "/animals",
              search: {
                gender: [AnimalGender.FEMALE],
                status: [AnimalStatus.ALIVE],
              },
            },
          },
        ],
        linkProps: {
          to: "/animals",
          search: {
            gender: [AnimalGender.FEMALE],
          },
        },
      },
    ],
  };

  // Tree Node component
  const TreeNode = ({ node }: { node: TreeNodeItem }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggleOpen = () => setIsOpen((prev) => !prev);

    return (
      <div className="flex items-center">
        <Link {...node.linkProps}>
          <div
            className="rounded-md flex flex-col items-center justify-center w-32 h-16 relative"
            style={{ backgroundColor: node.color }}
          >
            <div className="text-neutral-800 text-xs">{node.label}</div>
            <div className="text-sm font-semibold">{node.value}</div>

            {isOpen && node.children && node.children.length > 0 && (
              <div className="absolute top-[50%] left-[100%] border-t-2 border-t-neutral-300 w-9" />
            )}

            {node.children && node.children.length > 0 && (
              <button
                type="button"
                className={cn(
                  "border border-neutral-200 z-10 bg-white rounded-full absolute top-[50%] translate-x-[-50%] translate-y-[-50%] transition-all",
                  {
                    "left-[calc(100%)]": !isOpen,
                    "left-[calc(100%+32px)] hover:rotate-180": isOpen,
                  },
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleOpen();
                }}
                aria-label="toggle loading children"
              >
                <ChevronRight className="size-5" />
              </button>
            )}
          </div>
        </Link>

        {isOpen && node.children && node.children.length > 0 && (
          <div className="flex flex-col my-8">
            {node.children.map((child, index) => (
              <div
                key={node.label + child.label}
                className="flex flex-col ml-16 mr-12 py-3 relative"
              >
                {/* first */}
                {index === 0 && (
                  <div className="absolute top-[50%] h-[50%] border-l-2 border-t-2 rounded-tl-lg border-neutral-300 -left-7 w-7" />
                )}

                {/* last */}
                {index === (node?.children?.length || 0) - 1 && (
                  <div className="absolute top-0 h-[50%] border-l-2 border-b-2 rounded-bl-lg border-neutral-300 -left-7 w-7" />
                )}

                {/* middle */}
                {/* This is the line that connects the nodes */}
                {!(
                  index === 0 || index === (node?.children?.length || 0) - 1
                ) && (
                  <div className="absolute top-[50%] -left-7 border-t border-t-neutral-300 w-7" />
                )}

                <TreeNode node={child} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="flex gap-6">
        <div className="flex justify-center w-full bg-neutral-100 rounded-2xl py-8 px-4 border border-neutral-200 min-h-[700px]">
          <TransformWrapper
            initialScale={1}
            centerOnInit={true}
            maxScale={99999}
            minScale={0.1}
          >
            {() => (
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <TreeNode node={animalData} />
              </TransformComponent>
            )}
          </TransformWrapper>
        </div>

        {/* <div className="w-80">
          <div className="flex flex-col bg-neutral-100 rounded-2xl py-8 px-4 border border-neutral-200"></div>
        </div> */}
      </div>
    </MainLayout>
  );
};

export default Dashboard;
