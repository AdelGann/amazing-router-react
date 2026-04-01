import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAmazingRouter } from "../hooks/useAmazingRouter";

vi.mock("react-router", () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: "/test" }),
}));

describe("useAmazingRouter", () => {
  it("should return router utilities", () => {
    const { result } = renderHook(() => useAmazingRouter());
    expect(result.current.pathname).toBe("/test");
    expect(typeof result.current.push).toBe("function");
    expect(typeof result.current.replace).toBe("function");
    expect(typeof result.current.back).toBe("function");
  });
});
