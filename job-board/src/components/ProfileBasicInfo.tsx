
import type { Profile } from '../interface';

const randomAvatar = () => `https://picsum.photos/80?random=${Math.floor(Math.random()*10000)}`;

export default function ProfileBasicInfo({ profile }: { profile: Profile }) {
  return (
    <div className="bg-white rounded shadow p-6 outline-2 outline-gray-500 flex flex-col items-center hover:outline-2 hover:outline-blue-500">
      <img src={profile.avatarUrl || randomAvatar()} alt="Avatar" className="w-24 h-24 rounded-full mb-4" />
      <h2 className="text-xl font-bold">{profile.name}</h2>
      <p className="text-gray-500">@{profile.username}</p>
      <p className="mt-2">{profile.role}</p>
      <p className="mt-4 text-center text-gray-600">{profile.bio}</p>
      
    </div>
    
  );
}