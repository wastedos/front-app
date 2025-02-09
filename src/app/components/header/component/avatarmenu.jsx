'use client'
import { useEffect, useState } from 'react';
import AdminMenu from './auth/admin';
import EmployeeMenu from './auth/employee';
import UserMenu from './auth/user';
import SignMenu from './auth/sign';
import axios from 'axios';

export default function AvatarMenu() {
  const [role, setRole] = useState('');

  // وظيفة لجلب الكوكيز بالقيمة المطلوبة
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    const fetchRole = async () => {
      // الحصول على التوكن من الكوكيز
      const token = getCookie('token');
      if (!token) {
        console.error('Token not found, redirecting to login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/protected/role', {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setRole(response.data.role); // تعيين الدور من الاستجابة
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };

    fetchRole();
  }, ); // تشغيل عند تحميل المكون فقط

  const Sign = () => {
    switch (role) {
      case 'admin':
        return <AdminMenu />;
      case 'employee':
        return <EmployeeMenu />;
      case 'user':
        return <UserMenu />;
      default:
        return <SignMenu />;
    }
  };

  return <Sign />;
}
