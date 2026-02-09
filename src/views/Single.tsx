import {useLocation, Link} from 'react-router';
import type {MediaItemWithOwner} from '../types/DBTypes';

const Single = () => {
  const {state} = useLocation();
  const item: MediaItemWithOwner = state?.item;

  const linkButtonClasses =
    'inline-block py-2 px-4 mb-4 bg-transparent border border-accent rounded text-accent font-medium transition-colors duration-200 hover:bg-accent hover:text-text-primary';

  if (!item) {
    return (
      <div className="p-8 max-w-[900px] mx-auto">
        <p className="text-text-muted">No media item selected</p>
        <Link to="/" className={linkButtonClasses}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[900px] mx-auto">
      <Link to="/" className={linkButtonClasses}>
        ← Back
      </Link>
      <h2 className="block w-full text-[1.8em] mb-4 pb-2 border-b-2 border-accent">
        {item.title}
      </h2>
      <p className="text-accent font-medium mb-4">By: {item.username}</p>
      {item.description && (
        <p className="text-text-muted leading-relaxed mb-4">
          {item.description}
        </p>
      )}
      <div className="mt-6">
        {item.media_type.startsWith('image/') ? (
          <img
            src={item.filename}
            alt={item.title}
            className="w-full max-h-[70vh] object-contain rounded-lg border border-border"
          />
        ) : item.media_type.startsWith('video/') ? (
          <video
            src={item.filename}
            controls
            className="w-full max-h-[70vh] object-contain rounded-lg border border-border"
          />
        ) : null}
      </div>
    </div>
  );
};

export default Single;
