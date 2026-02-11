import {useReducer, useEffect} from 'react';
import type {MediaItemWithOwner, Like} from '../types/DBTypes';
import {useLike} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/ContextHooks';

type LikeState = {
  count: number;
  userLike: Like | null;
};

type LikeAction = {
  type: 'setLikeCount' | 'like';
  like?: Like | null;
  count?: number;
};

const likeInitialState: LikeState = {
  count: 0,
  userLike: null,
};

function likeReducer(state: LikeState, action: LikeAction): LikeState {
  switch (action.type) {
    case 'setLikeCount':
      return {...state, count: action.count ?? 0};
    case 'like':
      if (action.like !== undefined) {
        return {...state, userLike: action.like};
      }
      return state;
    default:
      return state;
  }
}

type LikesProps = {
  item: MediaItemWithOwner | null;
};

const Likes = ({item}: LikesProps) => {
  const {user} = useUserContext();
  const [likeState, likeDispatch] = useReducer(likeReducer, likeInitialState);
  const {postLike, deleteLike, getCountByMediaId, getUserLike} = useLike();

  const getLikes = async () => {
    const token = localStorage.getItem('token');
    if (!item || !token) {
      return;
    }
    try {
      const userLike = await getUserLike(item.media_id, token);
      likeDispatch({type: 'like', like: userLike});
    } catch (e) {
      likeDispatch({type: 'like', like: null});
      console.log('get user like error', (e as Error).message);
    }
  };

  const getLikeCount = async () => {
    if (!item) {
      return;
    }
    try {
      const count = await getCountByMediaId(item.media_id);
      likeDispatch({type: 'setLikeCount', count});
    } catch (e) {
      likeDispatch({type: 'setLikeCount', count: 0});
      console.log('get like count error', (e as Error).message);
    }
  };

  useEffect(() => {
    getLikes();
    getLikeCount();
  }, [item?.media_id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!item || !token) {
        return;
      }
      if (likeState.userLike) {
        await deleteLike(likeState.userLike.like_id, token);
        await getLikes();
        await getLikeCount();
      } else {
        await postLike(item.media_id, token);
        await getLikes();
        await getLikeCount();
      }
    } catch (e) {
      console.log('like error', (e as Error).message);
    }
  };

  if (!item) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center gap-4">
      <p className="text-text-muted m-0">Likes: {likeState.count}</p>
      {user && (
        <button
          type="button"
          className={
            'inline-block py-2 px-4 bg-transparent border border-accent rounded text-accent font-medium transition-colors duration-200 hover:bg-accent hover:text-text-primary'
          }
          onClick={handleLike}
        >
          {likeState.userLike ? 'Unlike' : 'Like'}
        </button>
      )}
    </div>
  );
};

export default Likes;
