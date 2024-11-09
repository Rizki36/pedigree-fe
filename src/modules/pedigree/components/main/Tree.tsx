import clsx from "clsx";
import { type FC, useState } from "react";
import ReactFamilyTree from "react-family-tree";
import type { Node, ExtNode } from "relatives-tree/lib/types";
import { PinchZoomPan } from "@/common/components/PinchZoomPan";

const WIDTH = 260;
const HEIGHT = 280;

type Attributes = {
  name: string;
};

export type MyNode = Node & Readonly<Attributes>;
type MyExtNode = ExtNode & Readonly<Attributes>;

interface FamilyNodeProps {
  node: MyNode;
  // isRoot: boolean;
  // isHover?: boolean;
  // onClick: (id: string) => void;
  // onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

const FamilyNode = ({
  node,
  // isRoot,
  // isHover,
  // onClick,
  // onSubClick,
  style,
}: FamilyNodeProps) => {
  return (
    <div
      style={style}
      className="p-4 absolute h-full flex items-center justify-center"
    >
      <div
        className={clsx("border p-6", {
          "bg-green-100": node.gender === "male",
          "bg-pink-100": node.gender === "female",
        })}
      >
        {node.name}
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
        <PinchZoomPan captureWheel min={0.5} max={2.5} className="h-screen">
          <ReactFamilyTree
            nodes={nodes}
            rootId={rootId}
            width={WIDTH}
            height={HEIGHT}
            className="bg-white"
            renderNode={(_node) => {
              const node = _node as MyExtNode;
              return (
                <FamilyNode
                  key={node.id}
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
