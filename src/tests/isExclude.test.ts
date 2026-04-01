import { describe, it, expect } from "vitest";
import { isExcluded } from "../utils/isExclude";

describe("isExcluded", () => {
  it("should match excluded paths", () => {
    expect(isExcluded("/api/auth", ["/api"])).toBe(true);
    expect(isExcluded("/favicon.ico", ["/api"])).toBe(false);
    expect(isExcluded("/_next/data", ["/_next"])).toBe(true);
    expect(isExcluded("/normal", [])).toBe(false);
  });
});
