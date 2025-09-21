import type { JobApplication } from "../interface";

interface ProfileApplicationsProps {
  applications: JobApplication[];
}

export default function ProfileApplications({ applications }: ProfileApplicationsProps) {
  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Past Applications</h3>
      <ul className="space-y-3">
        {applications.map(app => (
          <li key={app.applicationId} className="border rounded p-3">
            <div className="font-medium">{app.jobTitle}</div>
            <div className="text-sm text-gray-500">{app.status}</div>
            <div className="text-xs text-gray-400">{app.appliedAt}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}