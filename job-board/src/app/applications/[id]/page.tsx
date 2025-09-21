import { notFound } from "next/navigation";
import applications from "@/data/applications.json";
import type { JobApplication } from "../../../interface";

export default function ApplicationDetail({ params }: { params: { id: string } }) {
  const appId = Number(params.id);
  const jobApplications = applications as JobApplication[];
  const application = jobApplications.find(app => app.applicationId === appId);

  if (!application) return notFound();

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded shadow p-8">
      <h1 className="text-2xl font-bold mb-4">{application.jobTitle}</h1>
      <div className="mb-2"><span className="font-semibold">Status:</span> {application.status}</div>
      <div className="mb-2"><span className="font-semibold">Applied At:</span> {application.appliedAt}</div>
      {/* Add more fields as needed */}
    </div>
  );
}