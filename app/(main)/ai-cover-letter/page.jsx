import { getCoverLetters } from "@/actions/cover-letter";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import CoverLetterList from "./_components/cover-letter-list";

const AICoverLetterPage = async () => {
  const coverLetters = await getCoverLetters(); //array
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">My Cover Letters</h1>
        <Link href="/ai-cover-letter/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
};

export default AICoverLetterPage;

//here we will get all the cover letters, if not any then go to generate cover letter page
