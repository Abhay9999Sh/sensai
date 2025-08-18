"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  FileText,
  BarChart3,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit3,
} from "lucide-react";

export default function ATSResultsPage() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  useEffect(() => {
    const storedResult = sessionStorage.getItem("atsAnalysisResult");
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        setAnalysis(parsedResult);
      } catch (error) {
        console.error("Failed to parse stored result:", error);
        router.push("/resume/ats-checker");
      }
    } else {
      router.push("/resume/ats-checker");
    }
    setLoading(false);
  }, [router]);

  const handleNewAnalysis = () => {
    sessionStorage.removeItem("atsAnalysisResult");
    router.push("/resume/ats-checker");
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBadge = (score) => {
    if (score >= 80)
      return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800";
    if (score >= 60)
      return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800";
    return "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800";
  };

  if (loading) {
    return (
      <div className="container mx-auto py-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="container mx-auto py-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card>
            <CardContent className="pt-6">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">
                No Analysis Results Found
              </h2>
              <p className="text-muted-foreground mb-4">
                Please run an ATS analysis first to see results.
              </p>
              <Button onClick={() => router.push("/resume/ats-checker")}>
                <FileText className="h-4 w-4 mr-2" />
                Start New Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/resume/ats-checker")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to ATS Checker
            </Button>
          </div>
          <Button variant="outline" onClick={handleNewAnalysis}>
            <FileText className="h-4 w-4 mr-2" />
            New Analysis
          </Button>
        </div>

        {/* Main Score Card */}
        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl font-bold">
              ATS Compatibility Score
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Analysis for {analysis.jobTitle || "Your Position"}
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div
                className={`text-6xl font-bold mb-3 ${getScoreColor(
                  analysis.overallScore
                )}`}
              >
                {analysis.overallScore}%
              </div>
              <Badge
                className={`${getScoreBadge(
                  analysis.overallScore
                )} text-sm px-4 py-1`}
              >
                {analysis.overallScore >= 80
                  ? "Excellent"
                  : analysis.overallScore >= 60
                  ? "Good"
                  : "Needs Improvement"}
              </Badge>
              <div className="mt-4 max-w-xs mx-auto">
                <Progress value={analysis.overallScore} className="h-3" />
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div
                  className={`text-2xl font-bold ${getScoreColor(
                    analysis.keywordScore
                  )}`}
                >
                  {analysis.keywordScore}%
                </div>
                <div className="text-sm text-muted-foreground">Keywords</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div
                  className={`text-2xl font-bold ${getScoreColor(
                    analysis.formatScore
                  )}`}
                >
                  {analysis.formatScore}%
                </div>
                <div className="text-sm text-muted-foreground">Format</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">
                  {analysis.matchedKeywords?.total?.length || 0}
                </div>
                <div className="text-muted-foreground">Matched</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600">
                  {analysis.missingKeywords?.critical?.length || 0}
                </div>
                <div className="text-muted-foreground">Missing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis Tabs */}
        <Tabs defaultValue="improvements" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="improvements">Improvements</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
          </TabsList>

          {/* Improvements Tab */}
          <TabsContent value="improvements" className="space-y-4">
            {/* Critical Missing Keywords */}
            {analysis.missingKeywords?.critical?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-5 w-5" />
                    Critical Keywords Missing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground mb-3">
                      Add these keywords to your resume to improve ATS
                      compatibility:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {analysis.missingKeywords.critical
                        .slice(0, 6)
                        .map((keyword, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 border rounded-lg"
                          >
                            <span className="font-medium text-sm">
                              {keyword}
                            </span>
                            <Badge variant="destructive" className="text-xs">
                              Critical
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Specific Section Improvements */}
            {analysis.sectionAnalysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="h-5 w-5" />
                    Specific Section Improvements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(analysis.sectionAnalysis).map(
                      ([sectionName, section]) => {
                        // Only show sections that have specific, actionable issues
                        const hasActionableIssues = section.improvements?.some(
                          (improvement) =>
                            improvement.includes("Add") ||
                            improvement.includes("Include") ||
                            improvement.includes("Quantify") ||
                            improvement.includes("specific")
                        );

                        if (!hasActionableIssues) return null;

                        return (
                          <div
                            key={sectionName}
                            className="p-4 border rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold text-lg capitalize">
                                {sectionName.replace(/([A-Z])/g, " $1").trim()}
                              </h4>
                            </div>

                            {/* Show current content if exists */}
                            {section.content &&
                              section.content.trim() !== "" && (
                                <div className="mb-4">
                                  <h5 className="text-sm font-medium text-muted-foreground mb-2">
                                    Current Content:
                                  </h5>
                                  <div className="text-sm bg-muted p-3 rounded border">
                                    {section.content}
                                  </div>
                                </div>
                              )}

                            {/* Show specific, actionable improvements */}
                            <div className="space-y-3">
                              <h5 className="text-sm font-medium">
                                Specific Improvements Needed:
                              </h5>
                              {section.improvements
                                ?.filter(
                                  (improvement) =>
                                    improvement.includes("Add") ||
                                    improvement.includes("Include") ||
                                    improvement.includes("Quantify") ||
                                    improvement.includes("specific")
                                )
                                .slice(0, 3)
                                .map((improvement, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg"
                                  >
                                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                      <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                                        {improvement}
                                      </p>
                                      {/* Add specific examples based on improvement type */}
                                      {improvement.includes("Quantify") && (
                                        <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                                          Example: "Increased performance by
                                          40%" or "Handled 1000+ concurrent
                                          users"
                                        </p>
                                      )}
                                      {improvement.includes("LinkedIn") && (
                                        <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                                          Add: linkedin.com/in/yourprofile
                                        </p>
                                      )}
                                      {improvement.includes("portfolio") && (
                                        <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                                          Add: yourname.github.io or
                                          yourportfolio.com
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Action Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Quick Action Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium">Immediate Actions:</h5>
                    <ul className="text-sm space-y-1">
                      {analysis.missingKeywords?.critical
                        ?.slice(0, 3)
                        .map((keyword, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                            Add "{keyword}" keyword to relevant sections
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium">Content Enhancements:</h5>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                        Add specific metrics to project descriptions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                        Include quantifiable achievements
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                        Add missing contact information
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keywords Tab */}
          <TabsContent value="keywords" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Matched Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Matched Keywords (
                    {analysis.matchedKeywords?.total?.length || 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(analysis.matchedKeywords?.total || [])
                      .slice(0, 12)
                      .map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-muted"
                        >
                          {keyword}
                        </Badge>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Missing Keywords */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-600">
                    <XCircle className="h-5 w-5" />
                    Missing Keywords (
                    {(analysis.missingKeywords?.critical?.length || 0) +
                      (analysis.missingKeywords?.important?.length || 0)}
                    )
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium mb-2 text-red-600">
                        Critical:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {(analysis.missingKeywords?.critical || [])
                          .slice(0, 6)
                          .map((keyword, index) => (
                            <Badge
                              key={index}
                              variant="destructive"
                              className="text-xs"
                            >
                              {keyword}
                            </Badge>
                          ))}
                      </div>
                    </div>
                    {analysis.missingKeywords?.important?.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium mb-2 text-amber-600">
                          Important:
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {(analysis.missingKeywords?.important || [])
                            .slice(0, 6)
                            .map((keyword, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              >
                                {keyword}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sections Tab */}
          <TabsContent value="sections" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Resume Sections Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.sectionAnalysis &&
                    Object.entries(analysis.sectionAnalysis).map(
                      ([sectionName, section]) => (
                        <div
                          key={sectionName}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {section.present ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                            <span className="font-medium capitalize">
                              {sectionName.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm font-bold ${getScoreColor(
                                section.score || 0
                              )}`}
                            >
                              {section.score || 0}%
                            </span>
                            <Badge
                              variant={
                                section.present ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {section.present ? "Present" : "Missing"}
                            </Badge>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Next Steps to Improve Your Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-2">
                  {analysis.missingKeywords?.critical?.length || 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Critical keywords to add immediately
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600 mb-2">
                  {
                    Object.values(analysis.sectionAnalysis || {}).filter(
                      (section) => (section.improvements?.length || 0) > 0
                    ).length
                  }
                </div>
                <p className="text-sm text-muted-foreground">
                  Sections needing improvement
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  85%
                </div>
                <p className="text-sm text-muted-foreground">
                  Target score for top candidates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
