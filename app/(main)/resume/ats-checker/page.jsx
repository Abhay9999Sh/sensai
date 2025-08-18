import ATSCheckerWrapper from '../_components/ats-checker-wrapper';

export const metadata = {
  title: 'ATS Score Checker - SENSAI',
  description: 'Check your resume ATS compatibility and get improvement suggestions powered by AI',
};

export default function ATSCheckerPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="font-bold gradient-title text-4xl md:text-5xl">
          ATS Score Checker
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload your resume and job description to get an AI-powered ATS compatibility score 
          with detailed improvement recommendations.
        </p>
      </div>
      <ATSCheckerWrapper />
    </div>
  );
}
