import React from "react";
import { notFound } from "next/navigation";
import type { JobApplication } from "../../../interface";

type PageProps = {
  params: { id: string }
};

const ApplicationPage = ({ params }: PageProps) => {
  const appId = Number(params.id);
  const [application, setApplication] = React.useState<JobApplication | null>(null);

  React.useEffect(() => {
    fetch(`/api/applications?userId=&appId=${appId}`)
      .then(res => res.json())
      .then((apps) => {
        if (Array.isArray(apps)) {
          setApplication(apps.find((app: JobApplication) => app.applicationId === appId) || null);
        } else {
          setApplication(null);
        }
      });
  }, [appId]);

  if (!application) return notFound();

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded shadow p-8">
      <h1 className="text-2xl font-bold mb-4">{application.jobTitle}</h1>
      <div className="mb-2"><span className="font-semibold">Status:</span> {application.status}</div>
      <div className="mb-2"><span className="font-semibold">Applied At:</span> {application.appliedAt}</div>
      {/* Add more fields as needed */}
    </div>
  );
};

export default ApplicationPage;