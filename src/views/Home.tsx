import MediaRow from '../components/MediaRow';
import {useMedia} from '../hooks/apiHooks';

const Home = () => {
  const {mediaArray} = useMedia();

  return (
    <>
      <h2 className="text-[1.8em] mb-4 pb-2 border-b-2 border-accent inline-block">
        My Media
      </h2>
      <table className="w-full border-collapse bg-bg-secondary rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <thead>
          <tr>
            <th className="p-4 text-left font-semibold text-accent uppercase text-[0.85em] tracking-wide border-b-2 border-accent bg-bg-tertiary">
              Thumbnail
            </th>
            <th className="p-4 text-left font-semibold text-accent uppercase text-[0.85em] tracking-wide border-b-2 border-accent bg-bg-tertiary">
              Title
            </th>
            <th className="p-4 text-left font-semibold text-accent uppercase text-[0.85em] tracking-wide border-b-2 border-accent bg-bg-tertiary">
              Description
            </th>
            <th className="p-4 text-left font-semibold text-accent uppercase text-[0.85em] tracking-wide border-b-2 border-accent bg-bg-tertiary">
              Created
            </th>
            <th className="p-4 text-left font-semibold text-accent uppercase text-[0.85em] tracking-wide border-b-2 border-accent bg-bg-tertiary">
              Size
            </th>
            <th className="p-4 text-left font-semibold text-accent uppercase text-[0.85em] tracking-wide border-b-2 border-accent bg-bg-tertiary">
              Type
            </th>
            <th className="p-4 text-left font-semibold text-accent uppercase text-[0.85em] tracking-wide border-b-2 border-accent bg-bg-tertiary">
              Owner
            </th>
            <th className="p-4 text-left font-semibold text-accent uppercase text-[0.85em] tracking-wide border-b-2 border-accent bg-bg-tertiary">
              Actions
            </th>
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
