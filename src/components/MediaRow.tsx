import type {MediaItemWithOwner} from '../types/DBTypes';

type MediaRowProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | null) => void;
};

const MediaRow = ({item, setSelectedItem}: MediaRowProps) => {
  return (
    <tr>
      <td>
        <img src={item.thumbnail} alt={item.title} />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td>{item.username}</td>
      <td>
        <button className="link-button" onClick={() => setSelectedItem(item)}>
          View
        </button>
      </td>
    </tr>
  );
};

export default MediaRow;
