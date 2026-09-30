"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { recordPageView } from "@/lib/visit-source";

// Records the first page of a visit and the last page seen before Contact.
export default function VisitSourceTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const q = searchParams?.toString();
    recordPageView(q ? `${pathname}?${q}` : pathname);
  }, [pathname, searchParams]);
  return null;
}
