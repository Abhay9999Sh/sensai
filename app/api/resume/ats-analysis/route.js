import { NextRequest, NextResponse } from "next/server";
import { analyzeResumeATS } from "@/actions/ats-analysis";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get("resume");
    const jobTitle = formData.get("jobTitle");
    const jobDescription = formData.get("jobDescription");
    const industry = formData.get("industry");

    if (!resumeFile || !jobTitle || !jobDescription) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check file type
    if (resumeFile.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (resumeFile.size > maxSize) {
      return NextResponse.json(
        { error: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());

    // Analyze the resume with the uploaded file
    const analysis = await analyzeResumeATS(
      resumeBuffer,
      jobTitle,
      jobDescription,
      industry || ""
    );

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error in ATS analysis API:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze resume" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "ATS Analysis API - Use POST method to analyze resume" },
    { status: 200 }
  );
}
