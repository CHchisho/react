import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';
import type {UserWithNoPassword} from '../types/DBTypes';

const Profile = () => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const fetchUser = async () => {
      try {
        const userResponse = await getUserByToken(token);
        setUser(userResponse.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <>
        <h2>Profile</h2>
        <p>Please login to view your profile.</p>
      </>
    );
  }

  return (
    <>
      <h2>Profile</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User Level:</strong> {user.level_name}</p>
        <p><strong>Created:</strong> {new Date(user.created_at).toLocaleString('fi-FI')}</p>
      </div>
    </>
  );
};

export default Profile;
