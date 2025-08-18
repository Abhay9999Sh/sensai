import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GenerateCoverLetter from "../_components/cover-letter-generate";

export default function newCoverLetterPage() {
  return (
    <div>
      <div className="flex flex-col space-y-2">
        <Link href="/ai-cover-letter">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters Page
          </Button>
        </Link>

        <div className="pb-6">
          <h1 className="text-6xl font-bold gradient-title">
            Create Cover Letter
          </h1>
          <p className="text-muted-foreground">
            Generate a tailored cover letter for your job description
          </p>
        </div>
      </div>
      <GenerateCoverLetter />
    </div>
  );
}
