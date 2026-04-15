import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));  
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="animate-pulse text-gray-400 font-medium">Loading profile...</div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 py-12 relative">

      <div className="absolute top-0 left-0 w-full h-64 bg-slate-900 z-0" />

      <div className="relative z-10 w-full max-w-2xl bg-white shadow-xl rounded-[40px] overflow-hidden">
        
        <div className="absolute top-6 left-6 z-20">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-xl text-sm font-semibold transition-all border border-white/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        <div className="pt-16 pb-10 px-8 flex flex-col items-center border-b border-gray-50">
          <div className="relative mb-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 rounded-[35px] object-cover ring-8 ring-gray-50 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm"></div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{user.name}</h2>
          <span className="mt-2 px-4 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full">
            {user.role}
          </span>
        </div>

        <div className="p-10 space-y-10">
          <section>
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-5">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group border-b border-gray-100 pb-3">
                <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Email Address</label>
                <span className="text-gray-700 font-medium">{user.email}</span>
              </div>
              <div className="group border-b border-gray-100 pb-3">
                <label className="text-[10px] text-gray-400 font-bold uppercase block mb-1">Full Name</label>
                <span className="text-gray-700 font-medium">{user.name}</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-5">Account Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-5 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 font-bold text-xs">ID</div>
                  <span className="text-sm font-medium text-gray-600">User ID</span>
                </div>
                <span className="font-mono font-bold text-gray-800">#00{user.id}</span>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}