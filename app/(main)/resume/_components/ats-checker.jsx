"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Upload, FileText, Target } from "lucide-react";
import { atsAnalysisSchema } from "@/app/lib/schema";
import useFetch from "@/hooks/use-fetch";
import ATSUploadZone from "./ats-upload-zone";

export default function ATSChecker() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(atsAnalysisSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      industry: "",
    },
  });

  const {
    loading: isAnalyzing,
    fn: analyzeResume,
    error: analysisError,
  } = useFetch(async (data) => {
    try {
      const formData = new FormData();
      formData.append("resume", uploadedFile);
      formData.append("jobTitle", data.jobTitle);
      formData.append("jobDescription", data.jobDescription);
      formData.append("industry", data.industry || "");

      const response = await fetch("/api/resume/ats-analysis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze resume");
      }

      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  });

  const onSubmit = async (data) => {
    if (!uploadedFile) {
      toast.error("Please upload a resume first");
      return;
    }

    try {
      const result = await analyzeResume(data);
      if (result) {
        // Store the result in sessionStorage for the results page
        sessionStorage.setItem("atsAnalysisResult", JSON.stringify(result));

        // Redirect to results page
        router.push("/resume/ats-checker/results");

        toast.success("ATS analysis completed successfully!");
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(error.message || "Failed to analyze resume");
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    if (file) {
      setActiveTab("form");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">ATS Resume Checker</h1>
          <p className="text-muted-foreground">
            Get your resume analyzed for ATS compatibility and receive
            improvement suggestions
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Resume</span>
            </TabsTrigger>
            <TabsTrigger
              value="form"
              disabled={!uploadedFile}
              className="flex items-center space-x-2"
            >
              <Target className="h-4 w-4" />
              <span>Job Details</span>
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Upload Your Resume</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ATSUploadZone
                  onFileUpload={handleFileUpload}
                  uploadedFile={uploadedFile}
                />
              </CardContent>
            </Card>

            {uploadedFile && (
              <div className="text-center">
                <Button onClick={() => setActiveTab("form")} className="px-8">
                  Continue to Job Details
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Form Tab */}
          <TabsContent value="form" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Provide job details to get more accurate ATS analysis
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Job Title */}
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      placeholder="e.g., Software Engineer, Marketing Manager"
                      {...register("jobTitle")}
                      error={errors.jobTitle?.message}
                    />
                    {errors.jobTitle && (
                      <p className="text-sm text-red-500">
                        {errors.jobTitle.message}
                      </p>
                    )}
                  </div>

                  {/* Job Description */}
                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Job Description *</Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the complete job description here..."
                      rows={8}
                      {...register("jobDescription")}
                      error={errors.jobDescription?.message}
                    />
                    {errors.jobDescription && (
                      <p className="text-sm text-red-500">
                        {errors.jobDescription.message}
                      </p>
                    )}
                  </div>

                  {/* Industry */}
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry (Optional)</Label>
                    <Input
                      id="industry"
                      placeholder="e.g., Technology, Healthcare, Finance"
                      {...register("industry")}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setActiveTab("upload")}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isAnalyzing}
                      className="px-8"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Resume"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Error Display */}
        {analysisError && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600 text-center">{analysisError}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
