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
        <h2 className="text-[1.8em] mb-4 pb-2 border-b-2 border-accent inline-block">
          Profile
        </h2>
        <p className="text-text-muted">Please login to view your profile.</p>
      </>
    );
  }

  return (
    <>
      <h2 className="text-[1.8em] mb-4 pb-2 border-b-2 border-accent inline-block">
        Profile
      </h2>
      <div className="bg-bg-secondary p-8 rounded-lg max-w-[500px] shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <p className="my-3 text-text-muted">
          <strong className="text-accent mr-2">Username:</strong>{' '}
          {user.username}
        </p>
        <p className="my-3 text-text-muted">
          <strong className="text-accent mr-2">Email:</strong> {user.email}
        </p>
        <p className="my-3 text-text-muted">
          <strong className="text-accent mr-2">User Level:</strong>{' '}
          {user.level_name}
        </p>
        <p className="my-3 text-text-muted">
          <strong className="text-accent mr-2">Created:</strong>{' '}
          {new Date(user.created_at).toLocaleString('fi-FI')}
        </p>
      </div>
    </>
  );
};

export default Profile;
