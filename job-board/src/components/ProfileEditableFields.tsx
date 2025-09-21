
import { useState } from 'react';
import type { ProfileEditableFieldsProps } from "../interface";

export default function ProfileEditableFields({ profile }: ProfileEditableFieldsProps) {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(profile.email || '');
  const [phone, setPhone] = useState(profile.phone || '');

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would update the database or state with the new values
    setShowModal(false);
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <span className="block text-sm font-medium">Email</span>
          <span className="block text-gray-700 mt-1">{profile.email || <span className='italic text-gray-400'>Not set</span>}</span>
        </div>
        <div>
          <span className="block text-sm font-medium">Phone</span>
          <span className="block text-gray-700 mt-1">{profile.phone || <span className='italic text-gray-400'>Not set</span>}</span>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          onClick={handleEdit}
        >
          Edit
        </button>
      </div>

      {/* Modal for editing */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Profile Info</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="mt-1 w-full border rounded px-3 py-2"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded px-3 py-2"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}