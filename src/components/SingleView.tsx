import {useEffect, useRef} from 'react';
import type {MediaItem} from '../types/DBTypes';

const SingleView = (props: {
  item: MediaItem;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    setSelectedItem(undefined);
  };

  return (
    <dialog
      ref={dialogRef}
      style={{padding: '20px', maxWidth: '90vw', maxHeight: '90vh'}}
    >
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <h2>{item.title}</h2>
        {item.description && <p>{item.description}</p>}
        <div style={{maxWidth: '100%', maxHeight: '70vh', overflow: 'auto'}}>
          {item.media_type.startsWith('image/') ? (
            <img
              src={item.filename}
              alt={item.title}
              style={{maxWidth: '100%', height: 'auto'}}
            />
          ) : item.media_type.startsWith('video/') ? (
            <video
              src={item.filename}
              controls
              style={{maxWidth: '100%', height: 'auto'}}
            />
          ) : null}
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
    </dialog>
  );
};

export default SingleView;
