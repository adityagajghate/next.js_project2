"use client"; // This marks the file as a Client Component

import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link from next/link

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center text-2xl">Error loading data</div>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        className="border rounded p-2 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {userData
          .filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((user) => (
            <div key={user.id} className="p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-600">Email: {user.email}</p>
              <Link href={`/user/${user.id}`} className="text-blue-500 hover:underline">View Details</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
