import clsx from "clsx";
import { type FC, useState } from "react";
import ReactFamilyTree from "react-family-tree";
import type { Node, ExtNode } from "relatives-tree/lib/types";
import { PinchZoomPan } from "@/common/components/PinchZoomPan";
import { IoMdFemale, IoMdMale } from "react-icons/io";

const WIDTH = 260;
const HEIGHT = 200;

type Attributes = {
  name: string;
};

export type MyNode = Node & Readonly<Attributes>;
type MyExtNode = ExtNode & Readonly<Attributes>;

interface FamilyNodeProps {
  node: MyNode;
  isRoot: boolean;
  style?: React.CSSProperties;
}

const FamilyNode = ({ node, isRoot, style }: FamilyNodeProps) => {
  return (
    <div
      style={style}
      className="p-2 cursor-pointer absolute h-full flex items-center justify-center"
    >
      <div
        className={clsx("border p-3 w-[220px] rounded-lg text-xs relative", {
          "bg-white text-neutral-900": !isRoot,
          "bg-teal-600 text-white shadow-md border-teal-600": isRoot,
          "border-yellow-100": node.gender === "female",
          "border-green-100": node.gender === "male",
        })}
      >
        <div className="absolute top-1 right-1">
          {node.gender === "female" && (
            <IoMdFemale className="text-yellow-600 text-lg" />
          )}
          {node.gender === "male" && (
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
  nodes: MyNode[];
}> = ({ nodes }) => {
  const [rootId, setRootId] = useState("0");

  return (
    <>
      {nodes.length > 0 && (
        <PinchZoomPan captureWheel max={2.5} className="h-full">
          <ReactFamilyTree
            nodes={nodes}
            rootId={rootId}
            width={WIDTH}
            height={HEIGHT}
            renderNode={(_node) => {
              const node = _node as MyExtNode;
              return (
                <FamilyNode
                  key={node.id}
                  isRoot={node.id === rootId}
                  node={node}
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
                    transform: `translate(${
                      node.left * (WIDTH / 2)
                    }px, ${node.top * (HEIGHT / 2)}px)`,
                  }}
                />
              );
            }}
          />
        </PinchZoomPan>
      )}
    </>
  );
};

export default Tree;
