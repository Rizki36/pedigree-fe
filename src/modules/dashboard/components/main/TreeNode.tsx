import { cn } from "@/modules/common/lib/utils";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { TreeNodeItem } from "../../types";

const TreeNode = ({ node, testId }: { node: TreeNodeItem; testId: string }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  const nestedTestId = testId ? `${testId}-${node.label}` : node.label;

  return (
    <div className="flex items-center">
      <Link {...node.linkProps}>
        <div
          data-testid={nestedTestId}
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
        <div className="flex flex-col">
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
                <>
                  <div className="absolute top-[50%] -left-7 border-t border-t-neutral-300 w-7" />
                  <div className="absolute top-0 bottom-0 h-full border-l-2 border-neutral-300 -left-7" />
                </>
              )}

              <TreeNode node={child} testId={nestedTestId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
