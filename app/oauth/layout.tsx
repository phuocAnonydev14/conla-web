import { PropsWithChildren, Suspense } from "react";

export default function layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
}
