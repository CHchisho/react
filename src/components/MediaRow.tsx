import {useNavigate} from 'react-router';
import type {MediaItemWithOwner} from '../types/DBTypes';
import {useUserContext} from '../hooks/ContextHooks';

type MediaRowProps = {
  item: MediaItemWithOwner;
};

const buttonClasses =
  'inline-block py-2 px-4 bg-transparent border border-accent rounded text-accent font-medium transition-colors duration-200 hover:bg-accent hover:text-text-primary';

const MediaRow = ({item}: MediaRowProps) => {
  const navigate = useNavigate();
  const {user} = useUserContext();
  const canModifyOrDelete =
    user && (user.username === item.username || user.level_name === 'Admin');

  return (
    <tr className="group transition-colors hover:bg-bg-tertiary [&:last-child_td]:border-b-0">
      <td className="p-4 border-b border-border text-text-muted align-middle">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-20 h-[60px] object-cover rounded border-2 border-border transition-colors group-hover:border-accent"
        />
      </td>
      <td className="p-4 border-b border-border text-text-muted align-middle">
        {item.title}
      </td>
      <td className="p-4 border-b border-border text-text-muted align-middle">
        {item.description}
      </td>
      <td className="p-4 border-b border-border text-text-muted align-middle">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </td>
      <td className="p-4 border-b border-border text-text-muted align-middle">
        {item.filesize}
      </td>
      <td className="p-4 border-b border-border text-text-muted align-middle">
        {item.media_type}
      </td>
      <td className="p-4 border-b border-border text-text-muted align-middle">
        {item.username}
      </td>
      <td className="p-4 border-b border-border text-text-muted align-middle">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={buttonClasses}
            onClick={() => navigate('/single', {state: {item}})}
          >
            View
          </button>
          {canModifyOrDelete && (
            <>
              <button
                type="button"
                className={buttonClasses}
                onClick={() => console.log('modify', item)}
              >
                Modify
              </button>
              <button
                type="button"
                className={buttonClasses}
                onClick={() => console.log('delete', item)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default MediaRow;
