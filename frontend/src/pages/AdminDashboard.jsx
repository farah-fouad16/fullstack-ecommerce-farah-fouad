import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/admin/stats').then(res => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      {stats ? (
        <div>
          <p>Users: {stats.totalUsers}</p>
          <p>Products: {stats.totalProducts}</p>
          <p>Orders: {stats.totalOrders}</p>
        </div>
      ) : (
        <p>Admin Access Required or Loading Stats...</p>
      )}
    </div>
  );
}