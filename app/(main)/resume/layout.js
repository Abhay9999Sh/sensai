import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, Target } from "lucide-react";

const Layout = ({ children }) => {
  return (
    <div className="px-5">
      {/* Navigation */}
      <div className="flex justify-center mb-6">
        <div className="flex space-x-2 bg-muted p-1 rounded-lg">
          <Link href="/resume">
            <Button variant="ghost" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Resume Builder
            </Button>
          </Link>
          <Link href="/resume/ats-checker">
            <Button variant="ghost" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              ATS Checker
            </Button>
          </Link>
        </div>
      </div>

      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
