import { cn } from "@/common/lib/utils";
import type { TreeNode } from "@/common/services/pedigree.type";
import { AnimalGender } from "@/common/types";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useMemo, useState, type FC } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";

type PedigreeNodeProps = {
  node: TreeNode;
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
        <div className="">#{node.code}</div>
      </div>
    </div>
  );
};

const Tree: FC<{
  node: TreeNode;
}> = ({ node }) => {
  const filteredNodes = useMemo(() => {
    return node?.nodes?.filter((n) => !!n);
  }, [node?.nodes]);

  const needFetchNodes = node.hasNextNodes && !!filteredNodes?.length;

  const [open, setOpen] = useState(needFetchNodes);
  const hasChild = !!node.nodes.filter((n) => !!n).length;

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <ul className="relative flex flex-col">
      <div style={{ marginBottom: `${GAP}px` }}>
        <PedigreeNode node={node} />
        {hasChild && open && (
          <div
            className="absolute border-l-2 border-l-neutral-300 left-[50%]"
            style={{
              height: `${GAP / 2}px`,
              top: HEIGHT,
            }}
          />
        )}

        {node.hasNextNodes && (
          <button
            type="button"
            className="border border-neutral-200 z-20 bg-white rounded-full absolute left-[50%] translate-x-[-50%] translate-y-[-50%] hover:rotate-180 transition-all"
            style={{
              top: open ? `${HEIGHT + GAP / 2}px` : `${HEIGHT}px`,
            }}
            onClick={toggleOpen}
          >
            <ChevronDown className="size-5" />
          </button>
        )}
      </div>

      {open && (
        <div className="flex flex-row">
          {node.nodes.map((child, index) => {
            const currentNodes = node.nodes.filter((n) => !!n);
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
                <Tree node={child} />
              </li>
            );
          })}
        </div>
      )}
    </ul>
  );
};

const PedigreeTree: FC<{ nodes: TreeNode[] }> = ({ nodes }) => {
  return (
    <div className="flex items-center justify-center w-full h-full relative overflow-auto p-6">
      {nodes.length === 0 ? (
        <div className="text-neutral-400">No data</div>
      ) : (
        <>
          {nodes.map((node) => (
            <Tree key={node.id} node={node} />
          ))}
        </>
      )}
    </div>
  );
};

export default PedigreeTree;
