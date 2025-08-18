"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

//gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      //update if present or insert if not present
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
  } catch (error) {
    console.log("Error saving resume: ", error.message);
    throw new Error("Failed to save resume");
  }
}

//to get resume if resume already exist
export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type, company, position }) {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User Not found");

  const prompt = `
    As an expert resume writer, improve the following existing ${type} content for a ${
    user.industry || "professional"
  } applying to ${company} for the ${position} role.
    
    IMPORTANT: You must improve and enhance the PROVIDED content below, not create entirely new content. Build upon what's already written.
    
    EXISTING CONTENT TO IMPROVE:
    "${current}"

    Instructions:
    1. Keep the core structure and meaning of the existing content
    2. Enhance with stronger action verbs and more impactful language
    3. Add specific metrics and quantifiable results where appropriate
    4. Include relevant technical skills and keywords for the ${position} role
    5. Make it more concise and powerful while maintaining the original intent
    6. Focus on achievements and impact over just responsibilities
    7. Ensure ATS compatibility with industry keywords
    
    Return only the improved version of the existing content, maintaining similar length and structure.
    Do not add explanations or additional text.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    console.log("Resume response = ", response);
    const improvedContent = response.text().trim();
    console.log("Resume text = ", improvedContent);

    return improvedContent;
  } catch (error) {
    console.log("Error improving content: ", error);
    throw new Error("Failed to improve content");
  }
}
