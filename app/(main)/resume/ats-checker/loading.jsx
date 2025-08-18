import { BarLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="text-center space-y-4">
        <h1 className="font-bold gradient-title text-4xl md:text-5xl">
          ATS Score Checker
        </h1>
        <p className="text-muted-foreground">
          Loading ATS checker...
        </p>
      </div>
      <div className="mt-8">
        <BarLoader className="w-full" color="rgb(var(--primary))" />
      </div>
    </div>
  );
}
