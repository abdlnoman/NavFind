// client/src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // This would be replaced with actual traffic data later
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load dashboard data');
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">NavFind Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {currentUser?.name}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Traffic Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800">Active Incidents</h3>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-800">Routes Optimized</h3>
              <p className="text-3xl font-bold mt-2">142</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-yellow-800">Your Reports</h3>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>
          </div>

          
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
