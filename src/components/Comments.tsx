import {useEffect, useRef, useState} from 'react';
import useForm from '../hooks/formHooks';
import {useUserContext} from '../hooks/ContextHooks';
import {useCommentStore} from '../store';
import {useComment} from '../hooks/apiHooks';

type CommentFormProps = {
  mediaId: number;
  onSuccess: () => void;
};

const CommentForm = ({mediaId, onSuccess}: CommentFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const {postComment, getCommentsByMediaId} = useComment();
  const {setComments} = useCommentStore();
  const initValues = {comment_text: ''};

  const doSubmit = async (inputs: Record<string, string>) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    await postComment(inputs.comment_text, mediaId, token);
    const comments = await getCommentsByMediaId(mediaId);
    setComments(comments);
    formRef.current?.reset();
    onSuccess();
  };

  const {handleInputChange, handleSubmit} = useForm(doSubmit, initValues);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-bg-secondary p-4 rounded-lg mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
    >
      <div className="mb-3">
        <label
          htmlFor="comment_text"
          className="block mb-2 text-text-muted font-medium"
        >
          Add a comment
        </label>
        <input
          name="comment_text"
          type="text"
          id="comment_text"
          onChange={handleInputChange}
          className="w-full py-3 px-3 border border-border rounded bg-bg-tertiary text-text-primary text-base font-[inherit] box-border transition-[border-color,box-shadow] duration-200 focus:outline-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(230,57,70,0.2)] placeholder:text-text-muted placeholder:opacity-50"
          placeholder="Write a comment..."
        />
      </div>
      <button
        type="submit"
        className="py-2 px-4 rounded-lg border border-accent font-medium font-[inherit] bg-transparent text-accent cursor-pointer transition-colors duration-200 hover:bg-accent hover:text-text-primary focus:outline-2 focus:outline-accent-hover focus:outline-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

type CommentsProps = {
  mediaId: number;
};

const Comments = ({mediaId}: CommentsProps) => {
  const {user} = useUserContext();
  const {comments, setComments} = useCommentStore();
  const {getCommentsByMediaId} = useComment();
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    const fetchComments = async () => {
      try {
        const list = await getCommentsByMediaId(mediaId);
        if (!ignore) {
          setComments(list);
        }
      } catch (e) {
        console.error('Error fetching comments:', e);
      }
    };
    fetchComments();
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaId]);

  const mediaComments = comments.filter((c) => c.media_id === mediaId);

  return (
    <div className="mt-6">
      <h3 className="text-[1.3em] mb-3 pb-2 border-b border-accent">
        Comments
      </h3>
      {user && (
        <CommentForm
          key={formKey}
          mediaId={mediaId}
          onSuccess={() => setFormKey((k) => k + 1)}
        />
      )}
      <ul className="space-y-2">
        {mediaComments.map((comment) => (
          <li
            key={comment.comment_id}
            className="bg-bg-secondary p-3 rounded-lg border border-border"
          >
            <span className="font-medium text-accent">
              {comment.username}:{' '}
            </span>
            <span className="text-text-primary">{comment.comment_text}</span>
            {comment.created_at && (
              <span className="block text-sm text-text-muted mt-1">
                {new Date(comment.created_at).toLocaleString()}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
