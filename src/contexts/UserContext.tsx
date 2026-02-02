import React, {createContext, useEffect, useState} from 'react';
import type {UserWithNoPassword} from '../types/DBTypes';
import {useAuthentication, useUser} from '../hooks/apiHooks';
import {useNavigate} from 'react-router-dom';
import type {AuthContextType, Credentials} from '../types/LocalTypes';

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserWithNoPassword | null>(null);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();
  const navigate = useNavigate();

  // Check user validity by token
  useEffect(() => {
    let ignore = false;
    const token = localStorage.getItem('token');
    if (!token) return;

    const checkToken = async () => {
      try {
        const userResult = await getUserByToken(token);
        if (!ignore) {
          setUser(userResult.user);
        }
      } catch (e) {
        if (!ignore) {
          localStorage.removeItem('token');
        }
        console.log((e as Error).message);
      }
    };
    checkToken();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line
  }, []);

  const handleLogin = async (credentials: Credentials) => {
    try {
      const loginResult = await postLogin(credentials);
      localStorage.setItem('token', loginResult.token);
      setUser(loginResult.user);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      navigate('/');
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  return (
    <UserContext.Provider value={{user, handleLogin, handleLogout}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
