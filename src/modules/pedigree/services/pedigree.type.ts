import type { Animal } from "@/modules/animal/types";

// #region GET /v1/pedigree/tree
export type TreeNode = Animal & {
  hasNextNodes: boolean;
  isCircular: boolean;
  nodes: [TreeNode | null, TreeNode | null];
};
export type GetPedigreeTreeQuery = {
  animal_id_eq: string;
  level: number;
  visited_ids?: string[];
};
export type GetPedigreeTreeResponse = {
  docs: TreeNode[];
};
// #endregion
