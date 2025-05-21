import React from 'react';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const UserRow = ({ user, onUserUpdated }) => {
  const navigate = useNavigate();

  const handleRoleUpdate = async () => {
    const newRole = prompt('Enter new role for the user (User, Organizer, Admin):', user.role);
    if (newRole && newRole !== user.role) {
      try {
        await axios.put(`/users/${user.id}`, { role: newRole });
        alert('User role updated successfully!');
        onUserUpdated();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to update role.');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/users/${user.id}`);
        alert('User deleted successfully!');
        onUserUpdated();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete user.');
      }
    }
  };

  return (
    <tr>
      <td className="px-4 py-2">{user.name}</td>
      <td className="px-4 py-2">{user.email}</td>
      <td className="px-4 py-2">{user.role}</td>
      <td className="px-4 py-2">
        <button
          onClick={handleRoleUpdate}
          className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
        >
          Update Role
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;

