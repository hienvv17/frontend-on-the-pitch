'use client';

import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

// Gửi yêu cầu POST đến /api/auth/logout.
// Sau khi logout, chuyển hướng về trang chủ.
export default function LogoutButton() {
  const { handleLogout } = useContext(AppContext);

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
      Logout
    </button>
  );
}
