import { PropsWithChildren } from "react";

export default function ShimmerTitle({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return <span className={`holo-shimmer ${className}`}>{children}</span>;
}
