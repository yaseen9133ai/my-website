"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` lets Motion honour the OS setting internally: it drops
 * transform and layout animations while keeping opacity fades. Doing it here
 * rather than branching in each component keeps server and client markup
 * identical, which matters because `useReducedMotion()` is always null on the
 * server.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
