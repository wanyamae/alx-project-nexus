
import { useState } from 'react';
import type { ProfileEditableFieldsProps } from "../interface";

export default function ProfileEditableFields({ profile }: ProfileEditableFieldsProps) {
  const [editing, setEditing] = useState<string| null>(null);
  const [values, setValues] = useState({ ...profile });

  const handleSave = (field: string) => {
    setEditing(null);
  }

  const handleCancel = () => {
    setEditing(null);
    // Here you would update the database or state with the new values
  };

  const handleReset = (field: string) => {
    setValues(prev => ({ ...prev, [field]: profile[field as keyof typeof profile] || '' }));
  };

  return (
      <div className="space-y-4">
        {Object.entries(values).map(([field, value]) => (
          <div key={field} className="relative">
            <span className="input-title">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
              {editing === field ? (
                <div className="flex gap-4">
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    className="input-field"
                    value={value || ''}
                    onChange={e => setValues(prev => ({ ...prev, [field]: e.target.value }))}
                  />
              <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => handleSave(field)}>Save</button>
              <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={handleCancel}>Cancel</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleReset(field)}>Reset</button>
            </div>
          ) : (
            <button
              className="input-field text-left w-full hover:bg-blue-50 px-2 py-1 rounded"
              onClick={() => setEditing(field)}
              >
                {value || <span className='italic text-gray-400'>Not set</span>}
                <span className="ml-2 text-blue-500 underline text-xs">Edit</span>
          </button>
          )}
        </div>
        ))}
      </div>
  );
}