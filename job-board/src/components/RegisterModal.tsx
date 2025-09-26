import React, { useState, useEffect } from 'react';

const floralBg = (
  <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="#fce7f3" fillOpacity="0.5" />
    <circle cx="320" cy="80" r="60" fill="#dbeafe" fillOpacity="0.4" />
    <ellipse cx="300" cy="300" rx="90" ry="60" fill="#fef9c3" fillOpacity="0.4" />
    <ellipse cx="80" cy="320" rx="60" ry="40" fill="#bbf7d0" fillOpacity="0.4" />
    <circle cx="200" cy="200" r="40" fill="#fca5a5" fillOpacity="0.2" />
  </svg>
);

const randomAvatar = () => `https://picsum.photos/80?random=${Math.floor(Math.random()*10000)}`;

export default function RegisterModal({ open, onClose, onSuccess }: { open: boolean, onClose: () => void, onSuccess?: () => void }) {
  const [fields, setFields] = useState<any[]>([]);
  const [values, setValues] = useState<any>({ avatarUrl: randomAvatar() });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if (open) {
      fetch('/api/profile/schema')
        .then(res => res.json())
        .then(data => {
          setFields(data.filter((f: any) => f.name !== 'id' && f.name !== 'userId'));
        });
      setValues({ avatarUrl: randomAvatar() });
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const handleChange = (field: string, value: string) => {
    setValues((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const payload = { ...values, avatarUrl: values.avatarUrl || randomAvatar() };
    const res = await fetch('/api/profile/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      setSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(onClose, 1500);
    } else {
      setError(data.error || 'Registration failed');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadein">
      <div className="bg-white rounded-3xl shadow-2xl p-0 w-full max-w-lg relative overflow-hidden border-2 border-pink-100">
        {floralBg}
        <button className="absolute top-3 right-4 text-pink-300 hover:text-pink-600 z-10 text-3xl font-bold" onClick={() => setShowRegister(false)} aria-label="Close">&times;</button>
        <div className="relative z-10 p-8 flex flex-col items-center">
          <h2 className="text-3xl font-extrabold mb-1 text-pink-600 tracking-tight">Create Your Account</h2>
          <p className="mb-6 text-pink-400 text-base font-medium">Join our floral community and blossom your career journey!</p>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-semibold mb-1 capitalize text-blue-900">{field.name}</label>
                <input
                  type={field.name === 'email' ? 'email' : 'text'}
                  className="w-full px-4 py-2 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 bg-pink-50/40"
                  value={values[field.name] || ''}
                  onChange={e => handleChange(field.name, e.target.value)}
                  required={field.notnull === 1 && field.dflt_value === null}
                />
              </div>
            ))}
            {/* Password field (not in profiles schema) */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-blue-900">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border-2 border-blue-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 bg-pink-50/40"
                value={values.password || ''}
                onChange={e => handleChange('password', e.target.value)}
                required
              />
            </div>
            {/* Avatar preview and randomize */}
            <div className="flex items-center gap-4 mb-2">
              <img src={values.avatarUrl} alt="avatar" className="w-16 h-16 rounded-full border-2 border-pink-200 shadow" />
              <button type="button" className="text-pink-500 underline text-xs font-semibold" onClick={() => setValues((v: any) => ({ ...v, avatarUrl: randomAvatar() }))}>
                Randomize Avatar
              </button>
            </div>
            {error && <div className="text-red-600 text-sm font-semibold">{error}</div>}
            {success && <div className="text-green-600 text-sm font-semibold">Registration successful! 🌸</div>}
            <div className="flex gap-3 w-full">
              <button
                type="button"
                className="w-1/3 bg-pink-100 text-pink-600 py-2 rounded-lg font-bold shadow hover:bg-pink-200 transition-colors text-base tracking-wide border border-pink-200"
                onClick={onClose}
                disabled={loading}
              >
                Close
              </button>
              <button
                type="submit"
                className="w-2/3 bg-gradient-to-r from-pink-400 to-pink-600 text-white py-2 rounded-lg font-bold shadow hover:from-pink-500 hover:to-pink-700 transition-colors text-lg tracking-wide"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <style jsx global>{`
        .animate-fadein { animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
