import { useEffect, useState } from 'react';
import { Author } from '../author';
import { CommentsList } from '../comments-list';
import { TPost } from '../../shared/types';

type PostsProps = {
  onLoadingHandler: (value: boolean) => void;
};
export function Posts({ onLoadingHandler }: PostsProps) {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [count, setCount] = useState<number>(5);

  const STEP = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((response) => setPosts(response))
        .catch((err) => console.error(err))
        .finally(() => onLoadingHandler(false));
    };
    fetchPosts();
  }, [onLoadingHandler]);

  return (
    <div>
      <h1 className="mb-5">Posts</h1>
      <ul className="flex flex-col gap-5 lg:grid grid-cols-2 mb-5">
        {posts.slice(0, count).map((item) => (
          <li key={item.id}>
            <div className="border-2 border-blue-600 p-5">
              <h2 className="text-xl font-black text-green-700">
                {item.title[0].toUpperCase() + item.title.slice(1)}
              </h2>
              <p className="text-base text-left">
                {item.body[0].toUpperCase() + item.body.slice(1)}
              </p>
              <Author
                onLoadingHandler={onLoadingHandler}
                userId={item.userId}
              />
              <CommentsList
                onLoadingHandler={onLoadingHandler}
                postId={item.id}
              />
            </div>
          </li>
        ))}
      </ul>
      <button className="p-5 bg-cyan-800" onClick={() => setCount(count + STEP)}>
        Показать еще {STEP} постов
      </button>
    </div>
  );
}
