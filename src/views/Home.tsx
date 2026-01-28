import {useEffect, useState} from 'react';
import type {MediaItem, MediaItemWithOwner, UserWithNoPassword} from '../types/DBTypes';
import MediaRow from '../components/MediaRow';
import {fetchData} from '../functions';

const Home = () => {
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

  console.log(mediaArray);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
