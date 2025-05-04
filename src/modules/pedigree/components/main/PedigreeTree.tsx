import { cn } from "@/common/lib/utils";
import { AnimalGender, type Animal } from "@/common/types";
import clsx from "clsx";
import type { FC } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";

export type Node = Animal & {
  nodes: [Node | undefined, Node | undefined];
};

type PedigreeNodeProps = {
  node: Node;
  style?: React.CSSProperties;
};

const GAP = 60;
const WIDTH = 220;
const HEIGHT = 58;

const PedigreeNode = ({ node, style }: PedigreeNodeProps) => {
  return (
    <div
      style={style}
      className="cursor-pointer h-full flex items-center justify-center"
    >
      <div
        className={clsx("border p-3 rounded-lg text-xs relative", {
          "bg-white text-neutral-900": true,
          "border-yellow-100": node.gender === AnimalGender.FEMALE,
          "border-green-100": node.gender === AnimalGender.MALE,
        })}
        style={{
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
        }}
      >
        <div className="absolute top-1 right-1">
          {node.gender === AnimalGender.FEMALE && (
            <IoMdFemale className="text-yellow-600 text-lg" />
          )}
          {node.gender === AnimalGender.MALE && (
            <IoMdMale className="text-green-600 text-lg" />
          )}
        </div>
        <div className="line-clamp-1 break-all mr-2">{node.name}</div>
        <div className="">#{node.id}</div>
      </div>
    </div>
  );
};

const Tree: FC<{
  nodes: Node;
}> = ({ nodes }) => {
  const hasChild = !!nodes.nodes.filter((n) => !!n).length;

  return (
    <ul className="relative flex flex-col">
      <div style={{ marginBottom: `${GAP}px` }}>
        <PedigreeNode node={nodes} />
        {hasChild && (
          <div
            className="absolute border-l-2 border-l-neutral-300 left-[50%]"
            style={{
              height: `${GAP / 2}px`,
              top: HEIGHT,
            }}
          />
        )}
      </div>

      <div className="flex flex-row">
        {nodes.nodes.map((child, index) => {
          const currentNodes = nodes.nodes.filter((n) => !!n);
          const isLastChild = index === currentNodes.length - 1;
          const isNoSiblings = currentNodes.length === 1;

          if (!child) return null;

          return (
            <li key={child.id} className="relative px-2">
              {(!isLastChild || isNoSiblings) && (
                <div
                  className={cn("rounded-tl-xl", {
                    "absolute border-t-2 border-t-neutral-300 left-[50%] w-[50%]":
                      !isNoSiblings,
                    "absolute border-l-2 border-l-neutral-300 left-[50%]": true,
                  })}
                  style={{
                    top: `-${GAP / 2}px`,
                    height: `${GAP}px`,
                  }}
                />
              )}

              {!!isLastChild && !isNoSiblings && (
                <div
                  className={cn(
                    "rounded-tr-xl",
                    "absolute border-t-2 border-t-neutral-300 right-[50%] w-[50%]",
                    "absolute border-r-2 border-r-neutral-300 right-[50%]",
                  )}
                  style={{
                    top: `-${GAP / 2}px`,
                    height: `${GAP}px`,
                  }}
                />
              )}
              {/* {hasChild && (
                <div
                  className="absolute border-l-2 border-l-neutral-300 left-[50%]"
                  style={{
                    height: `${GAP}px`,
                    top: `${HEIGHT - GAP / 2}px`,
                  }}
                />
              )} */}

              <Tree nodes={child} />
            </li>
          );
        })}
      </div>
    </ul>
  );
};

const PedigreeTree: FC<{ nodes: Node }> = ({ nodes }) => {
  return (
    <div className="flex items-center justify-center w-full h-full relative overflow-scroll">
      <Tree nodes={nodes} />
    </div>
  );
};

export default PedigreeTree;
