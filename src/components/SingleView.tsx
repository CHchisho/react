import type {MediaItemWithOwner} from '../types/DBTypes';

type SingleViewProps = {
  item: MediaItemWithOwner | null;
  setSelectedItem: (item: MediaItemWithOwner | null) => void;
};

const SingleView = ({item, setSelectedItem}: SingleViewProps) => {
  if (!item) {
    return null;
  }

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <dialog
      open
      className="border border-accent rounded-xl bg-bg-secondary shadow-[0_4px_30px_rgba(230,57,70,0.2)] max-w-[90vw] max-h-[90vh] [&::backdrop]:bg-black/85 [&::backdrop]:backdrop-blur-sm"
    >
      <div className="flex flex-col gap-2.5">
        <h2 className="m-0 mb-2.5 text-text-primary block">{item.title}</h2>
        <p className="m-0 mb-4 text-accent font-medium">By: {item.username}</p>
        {item.description && (
          <p className="m-0 mb-4 text-text-muted">{item.description}</p>
        )}
        <div className="max-w-full max-h-[60vh] overflow-auto">
          {item.media_type.startsWith('image/') ? (
            <img
              src={item.filename}
              alt={item.title}
              className="max-w-full h-auto rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
            />
          ) : item.media_type.startsWith('video/') ? (
            <video
              src={item.filename}
              controls
              className="max-w-full h-auto rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.3)]"
            />
          ) : null}
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="mt-4 self-start rounded-lg border border-accent py-2 px-4 font-medium font-[inherit] bg-transparent text-accent cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-text-primary focus:outline-2 focus:outline-accent-hover focus:outline-offset-2"
        >
          Close
        </button>
      </div>
    </dialog>
  );
};

export default SingleView;
