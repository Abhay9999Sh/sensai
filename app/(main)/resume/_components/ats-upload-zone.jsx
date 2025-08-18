"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function ATSUploadZone({ onFileUpload, uploadedFile }) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const error = rejectedFiles[0].errors[0];
        if (error.code === "file-too-large") {
          toast.error("File size must be less than 5MB");
        } else if (error.code === "file-invalid-type") {
          toast.error("Only PDF files are allowed");
        } else {
          toast.error("Invalid file. Please try again.");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileUpload(file);
        toast.success("Resume uploaded successfully!");
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
  });

  const removeFile = () => {
    onFileUpload(null);
    toast.success("File removed");
  };

  if (uploadedFile) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-800">
                  {uploadedFile.name}
                </p>
                <p className="text-sm text-green-600">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-green-600 hover:text-green-800 hover:bg-green-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
        isDragActive || dragActive
          ? "border-primary bg-primary/5"
          : "border-gray-300 hover:border-primary hover:bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      <div className="space-y-4">
        <div className="flex justify-center">
          <div
            className={`p-4 rounded-full ${
              isDragActive ? "bg-primary/10" : "bg-gray-100"
            }`}
          >
            <Upload
              className={`h-8 w-8 ${
                isDragActive ? "text-primary" : "text-gray-400"
              }`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium">
            {isDragActive ? "Drop your resume here" : "Upload your resume"}
          </p>
          <p className="text-sm text-muted-foreground">
            Drag and drop your PDF resume here, or click to select
          </p>
          <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200">
            <AlertCircle className="inline h-3 w-3 mr-1" />
            Upload your PDF and provide job details for comprehensive ATS
            analysis.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground">
          <AlertCircle className="h-3 w-3" />
          <span>PDF only, max 5MB</span>
        </div>

        <Button type="button" variant="outline" className="mt-4">
          Browse Files
        </Button>
      </div>
    </div>
  );
}
