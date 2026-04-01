import { Suspense } from "react";

export function wrapLazy(LazyComp: React.LazyExoticComponent<any>) {
  return (
    <Suspense fallback={null}>
      <LazyComp />
    </Suspense>
  );
}

