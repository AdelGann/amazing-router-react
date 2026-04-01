import { ReactNode } from "react";

/**
 * Metadata that can be attached to any route node.
 * This information is read at runtime by the {@link useAmazingMeta} hook.
 */
export interface MetaProps {
  /** The page title displayed in the browser tab and used for SEO. */
  title?: string;
  /** A short description of the page, used for SEO meta tags. */
  description?: string;
  /** URL of the Open Graph / social share image. */
  image?: string;
  /** List of keywords associated with the page for SEO purposes. */
  keywords?: string[];
  /** The canonical URL for the page, used to avoid duplicate content issues. */
  canonical?: string;

  /** Breadcrumb label shown in navigation hierarchies. */
  breadcrumb?: string | ReactNode;
  /** Icon associated with this route, used in menus or tabs. */
  icon?: string | ReactNode;
  /** When `true`, hides this route from automatically generated menus. */
  hideInMenu?: boolean;

  /** List of roles allowed to access this route, used for authorization checks. */
  roles?: string[];
  /** When `true`, the route requires the user to be authenticated. */
  requiresAuth?: boolean;

  /** Allows any additional custom metadata fields. */
  [key: string]: any;
}
