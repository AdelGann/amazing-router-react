import { describe, it, expect } from "vitest";
import { transformRoutes } from "../helpers/TransformRoutes";
import type { RouteNode } from "@amazing-router/core";

describe("transformRoutes", () => {
  it("should transform an empty array", () => {
    expect(transformRoutes([], {})).toEqual([]);
  });

  it("should transform basic routes", () => {
    const nodes: RouteNode[] = [
      {
        id: "root",
        path: "/",
        pagePath: "./src/app/page.tsx",
      },
    ];

    const transformed = transformRoutes(nodes, {});
    expect(transformed).toHaveLength(1);
    expect(transformed[0].id).toBe("root");
    expect(transformed[0].path).toBe("/");
    expect(transformed[0].element).toBeDefined();
  });

  it("should transform layouts and children correctly", () => {
    const nodes: RouteNode[] = [
      {
        id: "layout",
        path: "/",
        layoutPath: "./src/app/layout.tsx",
        children: [
          {
            id: "page",
            path: "/",
            pagePath: "./src/app/page.tsx",
          },
        ],
      },
    ];

    const transformed = transformRoutes(nodes, {});
    expect(transformed).toHaveLength(1);
    expect(transformed[0].children).toBeDefined();
    expect(transformed[0].children).toHaveLength(1);
  });

  it("should verify that group routes can ignore root layout (depending on structure)", () => {
    // Testing behavior: if core gives group route as sibling of root layout, they are independent.
    const nodes: RouteNode[] = [
      {
        id: "root-layout",
        path: "/",
        layoutPath: "./src/app/layout.tsx",
        children: [
          {
            id: "home",
            path: "/",
            pagePath: "./src/app/page.tsx",
          },
        ],
      },
      {
        id: "group-auth",
        // groups have no path contribution themselves usually or are represented similarly
        path: "/login",
        pagePath: "./src/app/(auth)/login/page.tsx",
      },
    ];

    const transformed = transformRoutes(nodes, {});
    // They should be top-level siblings
    expect(transformed).toHaveLength(2);
    expect(transformed[0].id).toBe("root-layout");
    expect(transformed[1].id).toBe("group-auth");
  });
});
