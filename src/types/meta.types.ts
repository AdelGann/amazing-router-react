import { ReactNode } from "react";

export interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  canonical?: string;

  breadcrumb?: string | ReactNode;
  icon?: string | ReactNode;
  hideInMenu?: boolean;

  roles?: string[];
  requiresAuth?: boolean;

  [key: string]: any;
}
