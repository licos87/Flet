import { useEffect, useState } from 'react';
import { TComment } from '../../shared/types';

type CommentsListProps = {
  postId: number;
  onLoadingHandler: (value: boolean) => void;
};

export function CommentsList({ postId, onLoadingHandler }: CommentsListProps) {
  const [comments, setComments] = useState<TComment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      await fetch('https://jsonplaceholder.typicode.com/comments')
        .then((response) => response.json())
        .then((response) => setComments(response))
        .catch((err) => console.error(err))
        .finally(() => onLoadingHandler(false));
    };
    fetchComments();
  }, [onLoadingHandler]);

  const commetsForPost = comments.filter((item) => item.postId === postId);

  return (
    <div>
      <h3 className="mb-5 text-xl text-left">Comments</h3>
      <ul className="flex flex-col gap-5 border-2 border-blue-600">
        {commetsForPost.map((item) => (
          <li key={item.id}>
            <div className="p-5 flex flex-col">
              <h2 className="text-base font-black text-indigo-500">
                {item.name[0].toUpperCase() + item.name.slice(1)}
              </h2>
              <p className="text-base text-left">
                {item.body[0].toUpperCase() + item.body.slice(1)}
              </p>
              <span className="self-end text-amber-500">{item.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
