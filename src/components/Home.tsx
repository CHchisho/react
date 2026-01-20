import {useState} from 'react';
import type {MediaItem} from '../types/DBTypes';
import MediaRow from './MediaRow';
import SingleView from './SingleView';
 
const mediaArray: MediaItem[] = [
  {
    media_id: 8,
    user_id: 5,
    filename: 'https://picsum.photos/1200/800?random=1',
    thumbnail: 'https://picsum.photos/320/240?random=1',
    filesize: 170469,
    media_type: 'image/jpeg',
    title: 'Picture 1',
    description: 'This is a placeholder picture.',
    created_at: '2024-01-07T20:49:34.000Z',
    screenshots: [],
  },
  {
    media_id: 9,
    user_id: 7,
    filename: 'https://picsum.photos/800/600?random=2',
    thumbnail: 'https://picsum.photos/320/240?random=2',
    filesize: 1002912,
    media_type: 'image/jpeg',
    title: 'Pic 2',
    description: '',
    created_at: '2024-01-07T21:32:27.000Z',
    screenshots: [],
  },
  {
    media_id: 17,
    user_id: 2,
    filename:
      'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4',
    thumbnail: 'https://picsum.photos/320/240?random=3',
    filesize: 1236616,
    media_type: 'video/mp4',
    title: 'Bunny',
    description: 'Butterflies fly around the bunny.',
    created_at: '2024-01-07T20:48:13.000Z',
    screenshots: [],
  },
];

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<MediaItem | undefined>();

  return (
    <>
      <h2>My Media</h2>
      {selectedItem && (
        <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
