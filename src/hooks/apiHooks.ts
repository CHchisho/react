import { useEffect, useState } from 'react';
import type { MediaItem, MediaItemWithOwner, UserWithNoPassword } from '../types/DBTypes';
import type {
  LoginResponse,
  UserResponse,
  MessageResponse,
  UploadResponse,
  MediaResponse,
} from '../types/MessageTypes';
import type { Credentials, RegisterCredentials } from '../types/LocalTypes';
import { fetchData } from '../functions';

const useFile = () => {
  const postFile = async (file: File, token: string): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(import.meta.env.VITE_UPLOAD_API + '/upload', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });

    const json = await response.json();
    if (!response.ok) {
      throw new Error((json as { message?: string }).message || `Error ${response.status}`);
    }
    return json as UploadResponse;
  };

  return { postFile };
};

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
            return { ...item, username: user.username };
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

  const postMedia = async (
    file: UploadResponse,
    inputs: Record<string, string>,
    token: string,
  ): Promise<MediaResponse> => {
    const mediaData = {
      filename: file.data.filename,
      filesize: file.data.filesize,
      media_type: file.data.media_type,
      title: inputs.title,
      description: inputs.description || null,
    };

    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(mediaData),
    };

    const result = await fetchData<MediaResponse>(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions,
    );
    return result;
  };

  return { mediaArray, postMedia };
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

  return { postLogin };
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

  return { getUserByToken, postRegister };
};

export { useMedia, useFile, useAuthentication, useUser };
