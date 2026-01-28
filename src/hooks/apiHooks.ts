import {useEffect, useState} from 'react';
import type {MediaItem, MediaItemWithOwner, UserWithNoPassword} from '../types/DBTypes';
import type {LoginResponse, UserResponse, MessageResponse} from '../types/MessageTypes';
import type {Credentials, RegisterCredentials} from '../types/LocalTypes';
import {fetchData} from '../functions';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState<MediaItemWithOwner[]>([]);

  useEffect(() => {
    let ignore = false;

    const getMedia = async () => {
      try {
        const mediaItems = await fetchData<MediaItem[]>(
          import.meta.env.VITE_MEDIA_API + '/media',
        );

        const mediaWithOwner = await Promise.all<MediaItemWithOwner>(
          mediaItems.map(async (item) => {
            const user = await fetchData<UserWithNoPassword>(
              import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
            );
            return {...item, username: user.username};
          }),
        );

        if (!ignore) {
          setMediaArray(mediaWithOwner);
        }
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    getMedia();

    return () => {
      ignore = true;
    };
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (credentials: Credentials): Promise<LoginResponse> => {
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    };
    const loginResult = await fetchData<LoginResponse>(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );
    return loginResult;
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token: string): Promise<UserResponse> => {
    const fetchOptions: RequestInit = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const userResult = await fetchData<UserResponse>(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );
    return userResult;
  };

  const postRegister = async (credentials: RegisterCredentials): Promise<MessageResponse> => {
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    };
    const registerResult = await fetchData<MessageResponse>(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );
    return registerResult;
  };

  return {getUserByToken, postRegister};
};

export {useMedia, useAuthentication, useUser};
