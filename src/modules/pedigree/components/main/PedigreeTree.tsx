import { cn } from "@/common/lib/utils";
import type { TreeNode } from "@/common/services/pedigree.type";
import pedigreeService from "@/common/services/pedigree";
import { AnimalGender } from "@/common/types";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useMemo, useState, useCallback, type FC } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { Loader2 } from "lucide-react";

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
  onNodeUpdate?: (nodeId: string, updatedNodes: TreeNode) => void;
}> = ({ node, onNodeUpdate }) => {
  const filteredNodes = useMemo(() => {
    return node?.nodes?.filter((n) => !!n);
  }, [node?.nodes]);

  const needFetchNodes = node.hasNextNodes && !filteredNodes?.length;
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(!needFetchNodes);
  const canOpen = open && !needFetchNodes;
  const hasChild = !!node.nodes.filter((n) => !!n).length;

  const loadNextNodes = useCallback(async () => {
    if (!needFetchNodes || isLoading) return;

    try {
      setIsLoading(true);
      // Use the existing pedigreeService function
      const response = await pedigreeService.getPedigreeTree({
        query: { animal_id_eq: node.id!, level: 2 },
      });

      const nextNodes = response.docs || [];

      // Update nodes locally if no parent callback is provided
      if (!onNodeUpdate) {
        node.nodes = nextNodes[0].nodes;
      } else {
        // Let parent component handle the update
        onNodeUpdate(node.id, nextNodes[0]);
      }

      setOpen(true);
    } catch (error) {
      console.error("Failed to load next nodes:", error);
    } finally {
      setIsLoading(false);
    }
  }, [node.id, needFetchNodes, isLoading, onNodeUpdate]);

  const toggleOpen = useCallback(() => {
    if (needFetchNodes) {
      loadNextNodes();
    } else {
      setOpen((prev) => !prev);
    }
  }, [needFetchNodes, loadNextNodes]);

  return (
    <ul className="relative flex flex-col">
      <div style={{ marginBottom: `${GAP}px` }}>
        <PedigreeNode node={node} />

        {hasChild && canOpen && (
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
            className={cn(
              "border border-neutral-200 z-20 bg-white rounded-full absolute left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all",
              {
                "hover:rotate-180": canOpen && !isLoading,
              },
            )}
            style={{
              top: canOpen ? `${HEIGHT + GAP / 2}px` : `${HEIGHT}px`,
            }}
            onClick={toggleOpen}
            disabled={isLoading}
            aria-label="toggle loading children"
          >
            {isLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <ChevronDown className="size-5" />
            )}
          </button>
        )}
      </div>

      {canOpen && (
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

// Now update the PedigreeTree component to handle node updates
const PedigreeTree: FC<{
  nodes: (TreeNode | null)[];
  setNodes: React.Dispatch<React.SetStateAction<(TreeNode | null)[]>>;
}> = ({ nodes, setNodes }) => {
  const handleNodeUpdate = useCallback(
    (nodeId: string, updatedNodes: TreeNode) => {
      setNodes((prevNodes) => {
        // Create a deep copy to avoid mutating the original state
        const newNodes = JSON.parse(JSON.stringify(prevNodes));

        // Helper function to find and update node recursively
        const updateNodeChildren = (nodes: (TreeNode | null)[]): boolean => {
          for (let i = 0; i < nodes.length; i++) {
            if (nodes && !!nodes?.[i] && nodes?.[i]?.id === nodeId) {
              // @ts-expect-error
              nodes[i].nodes = updatedNodes.nodes;
              return true;
            }

            if (!!nodes?.[i] && !!nodes?.[i]?.nodes?.length) {
              // @ts-expect-error
              if (updateNodeChildren(nodes[i].nodes)) {
                return true;
              }
            }
          }
          return false;
        };

        updateNodeChildren(newNodes);
        return newNodes;
      });
    },
    [],
  );

  return (
    <div className="flex items-center justify-center w-full h-full relative overflow-auto p-6">
      {nodes.length === 0 ? (
        <div className="text-neutral-400">No data</div>
      ) : (
        <>
          {nodes.map((node) => {
            if (!node) return null;

            return (
              <Tree key={node.id} node={node} onNodeUpdate={handleNodeUpdate} />
            );
          })}
        </>
      )}
    </div>
  );
};

export default PedigreeTree;
