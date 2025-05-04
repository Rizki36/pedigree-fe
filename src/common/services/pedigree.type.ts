import type { Animal } from "../types";

// #region GET /v1/pedigree/tree
export type TreeNode = Animal & {
  hasNextNodes: boolean;
  nodes: [TreeNode | null, TreeNode | null];
};
export type GetPedigreeTreeQuery = {
  animal_id_eq: string;
  level: number;
};
export type GetPedigreeTreeResponse = {
  docs: TreeNode[];
};
// #endregion
