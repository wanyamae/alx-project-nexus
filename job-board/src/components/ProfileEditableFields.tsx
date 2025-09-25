
import React, { useState } from 'react';
import type { ProfileEditableFieldsProps } from "../interface";

export default function ProfileEditableFields({ profile }: ProfileEditableFieldsProps) {
  const [editing, setEditing] = useState<string| null>(null);
  const [values, setValues] = useState({ ...profile });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<null | { type: 'success' | 'error', message: string }>(null);

  const handleSaveAll = async () => {
    setSaving(true);
    setFeedback(null);
    setEditing(null);
    // Simulate async save
    try {
      await new Promise(res => setTimeout(res, 1200));
      // Simulate random error (10% chance)
      if (Math.random() < 0.1) throw new Error('Network error');
      setFeedback({ type: 'success', message: 'Saved!' });
      setDirty(false);
    } catch (err) {
      setFeedback({ type: 'error', message: 'Error saving. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  // Clear feedback after 5 seconds
  React.useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleBlur = () => {
    setEditing(null);
    setDirty(true);
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
      {Object.entries(values)
        .filter(([field]) => field !== 'userId' && field !== 'username' && field !== 'role' && field !== 'avatarUrl' )
        .map(([field, value]) => (
        <div key={field} className="relative">
          <span className="input-title">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
            {editing === field ? (
              <div className="flex gap-4 p-0 w-full">
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  className="input-field w-full focus:outline-none rounded bg-red-100"
                  value={typeof value === 'string' ? value : ''}
                  autoFocus
                  onChange={e => {
                    setValues(prev => ({ ...prev, [field]: e.target.value}))
                    setDirty(true);
                  }}
                  onBlur={handleBlur}
                />
              </div>
        ) : (
          <button
            className="input-field text-left w-full hover:bg-blue-50 px-2 py-1 rounded"
            onClick={() => setEditing(field)}
            >
              {typeof value === 'string' && value.length > 0 ? value 
              :
               <span className='italic text-gray-400'>Not set</span>}
              <span className="ml-2 text-blue-500 underline text-xs">Edit</span>
        </button>
        )}
      </div>
      ))}
      <div className="pt-4 flex flex-col gap-2">
        <button
          className={
            `${editing ? 'bg-red-600' : 'bg-green-600'} text-white px-6 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed`
          }
          onClick={handleSaveAll}
          disabled={!dirty || saving}
        >
          {saving
            ? 'Saving...'
            : editing
              ? 'Editing... Click to save'
              : 'Save'}
        </button>
        {feedback && (
          <div className={
            feedback.type === 'success'
              ? 'text-green-600 text-sm font-semibold'
              : 'text-red-600 text-sm font-semibold'
          }>
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
}