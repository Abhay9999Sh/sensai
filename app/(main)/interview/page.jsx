import { getAssessments } from "@/actions/interview";
import StatsCard from "./_components/stats-card";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";

const InterviewPage = async () => {
  const assessments = await getAssessments();
  console.log(assessments);
  return (
    <div>
      <h1 className="text-6xl font-bold gradient-title mb-5">
        Interview Preparation
      </h1>
      <div className="space-y-6">
        <StatsCard assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
};

export default InterviewPage;
