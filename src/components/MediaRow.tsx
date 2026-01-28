import {Link} from 'react-router';
import type {MediaItemWithOwner} from '../types/DBTypes';

const MediaRow = (props: {item: MediaItemWithOwner}) => {
  const {item} = props;
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
        <Link to="/single" state={{item}} className="link-button">
          View
        </Link>
      </td>
    </tr>
  );
};

export default MediaRow;
