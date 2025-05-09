import type { LinkProps } from "@tanstack/react-router";

export type TreeNodeItem = {
  label: string;
  value: number;
  color: string;
  children?: TreeNodeItem[];
  linkProps?: LinkProps;
};
