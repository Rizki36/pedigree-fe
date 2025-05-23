import { cn } from "@/modules/common/lib/utils";
import { AnimalGender } from "@/modules/animal/types";
import clsx from "clsx";
import {
  useMemo,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import { Loader2, ChevronDown, Skull, VenusIcon, MarsIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/modules/common/components/ui/tooltip";
import { Link } from "@tanstack/react-router";
import type { TreeNode } from "../../services/pedigree.type";
import pedigreeService from "../../services/pedigree";

type PedigreeNodeProps = {
  node: TreeNode;
  style?: React.CSSProperties;
};

const GAP = 70;
const WIDTH = 220;
const HEIGHT = 70;

const PedigreeNode = ({ node, style }: PedigreeNodeProps) => {
  return (
    <Link
      to="/animals/$animalId"
      params={{
        animalId: node.id,
      }}
      target="_blank"
    >
      <div
        style={style}
        className="cursor-pointer h-full flex items-center justify-center"
      >
        <div
          className={clsx("border px-3 py-2.5 rounded-lg text-xs relative", {
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
              <VenusIcon className="text-yellow-600 size-4" />
            )}
            {node.gender === AnimalGender.MALE && (
              <MarsIcon className="text-green-600 size-4" />
            )}
          </div>
          {!!node.diedAt && (
            <div className="absolute bottom-1 right-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Skull className="text-red-600 size-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    Died at {format(node.diedAt, "dd MMM yyyy")}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          <div className="text-[10px] text-neutral-700">{node.code}</div>
          <div className="line-clamp-1 break-all mt-0.5 font-medium">
            {node.name}
          </div>
          {node.dateOfBirth && (
            <div className="line-clamp-1 break-all mt-0.5 text-neutral-500 text-[10px]">
              BD : {format(node.dateOfBirth, "dd/MM/yyyy")}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

// Context to track IDs that have already appeared in the current branch
const VisitedNodesContext = createContext<Set<string>>(new Set());

const Tree: FC<{
  node: TreeNode;
  onNodeUpdate?: (nodeId: string, updatedNodes: TreeNode) => void;
  maxDepth?: number;
  currentDepth?: number;
}> = ({ node, onNodeUpdate, maxDepth = 10, currentDepth = 0 }) => {
  const visitedNodes = useContext(VisitedNodesContext);

  // Use the isCircular flag from the backend instead of our custom detection
  const isMaxDepthReached = currentDepth >= maxDepth;

  const filteredNodes = useMemo(() => {
    return node?.nodes?.filter((n) => !!n);
  }, [node?.nodes]);

  // Only allow fetching if conditions are met
  const needFetchNodes =
    node.hasNextNodes &&
    !filteredNodes?.length &&
    !isMaxDepthReached &&
    !node.isCircular;

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
        query: {
          animal_id_eq: node.id!,
          level: 2,
          visited_ids: Array.from(visitedNodes),
        },
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

  // If this is a circular reference, show a special indicator using the backend flag
  if (node.isCircular) {
    return (
      <ul className="relative flex flex-col">
        <div style={{ marginBottom: `${GAP}px` }}>
          <PedigreeNode node={node} />
          <div className="text-xs text-red-500 text-center mt-1">
            ⚠️ Circular reference detected
          </div>
        </div>
      </ul>
    );
  }

  // If max depth reached, show a visual indicator
  if (isMaxDepthReached) {
    return (
      <ul className="relative flex flex-col">
        <div style={{ marginBottom: `${GAP}px` }}>
          <PedigreeNode node={node} />
          {node.hasNextNodes && (
            <div className="text-xs text-gray-500 text-center mt-1">
              Max depth reached
            </div>
          )}
        </div>
      </ul>
    );
  }

  // Create a new set with this node ID added for child components
  const newVisitedNodes = new Set(visitedNodes);
  if (node.id) newVisitedNodes.add(node.id);

  return (
    <ul className="relative flex flex-col">
      <div style={{ marginBottom: `${GAP}px` }}>
        <PedigreeNode node={node} />

        {/* Add warning for same gender parents */}
        {node.isSameGenderParent && hasChild && (
          <div className="text-xs text-amber-500 text-center absolute left-[50%] translate-x-[-50%] mt-1.5 z-20 bg-white">
            ⚠️ Same gender parents detected
          </div>
        )}

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
              "border border-neutral-200 z-10 bg-white rounded-full absolute left-[50%] translate-x-[-50%] translate-y-[-50%] transition-all",
              {
                "hover:rotate-180": canOpen && !isLoading,
              },
            )}
            style={{
              top: canOpen ? `${HEIGHT + GAP / 2}px` : `${HEIGHT - 5}px`,
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
          <VisitedNodesContext.Provider value={newVisitedNodes}>
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
                  <Tree
                    node={child}
                    onNodeUpdate={onNodeUpdate}
                    maxDepth={maxDepth}
                    currentDepth={currentDepth + 1}
                  />
                </li>
              );
            })}
          </VisitedNodesContext.Provider>
        </div>
      )}
    </ul>
  );
};

// Update the main PedigreeTree component to pass initial values
const PedigreeTree: FC<{
  nodes: (TreeNode | null)[];
  setNodes: Dispatch<SetStateAction<(TreeNode | null)[]>>;
  maxDepth?: number; // Allow setting max depth at top level
}> = ({ nodes, setNodes, maxDepth = 10 }) => {
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
        <VisitedNodesContext.Provider value={new Set()}>
          {nodes.map((node) => {
            if (!node) return null;

            return (
              <Tree
                key={node.id}
                node={node}
                onNodeUpdate={handleNodeUpdate}
                maxDepth={maxDepth}
                currentDepth={0}
              />
            );
          })}
        </VisitedNodesContext.Provider>
      )}
    </div>
  );
};

export default PedigreeTree;
