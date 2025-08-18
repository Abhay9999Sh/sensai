"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";

// Dynamically import the ATS checker with error handling
const ATSChecker = dynamic(() => import("./ats-checker"), {
  loading: () => (
    <Card>
      <CardContent className="pt-6 text-center">
        <p>Loading ATS Checker...</p>
      </CardContent>
    </Card>
  ),
  ssr: false, // This is now allowed in a client component
});

export default function ATSCheckerWrapper() {
  return <ATSChecker />;
}
