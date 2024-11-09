import MainLayout from "@/common/layouts/MainLayout";
import Tree, { type MyNode } from "./Tree";
import nodes from "./tree.json";

const Pedigree = () => {
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <Tree nodes={nodes as MyNode[]} />
      </div>
    </MainLayout>
  );
};

export default Pedigree;
