import { useEffect, useState } from 'react';
import { TAuthor } from '../../shared/types';

type AuthorProps = {
  onLoadingHandler: (value: boolean) => void;
  userId: number;
};

export function Author({ onLoadingHandler, userId }: AuthorProps) {
  const [authors, setAuthors] = useState<TAuthor[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      await fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((response) => setAuthors(response))
        .catch((err) => console.error(err))
        .finally(() => onLoadingHandler(false));
    };
    fetchAuthors();
  }, [onLoadingHandler]);
  const author = authors.find((item) => item.id === userId);

  return (
    <div className="flex flex-col justify-centr items-end gap-0.5">
      <h3 className="text-xl font-semibold text-teal-800">
        <span className="text-base font-normal text-white">author: </span>
        {author?.username}
      </h3>
      <p className="text-xl font-semibold text-teal-800">
        <span className="text-base font-normal text-white">email: </span>{' '}
        {author?.email}
      </p>
      <p className="text-xl font-semibold text-teal-800">
        <span className="text-base font-normal text-white">company: </span>
        {author?.company.name}
      </p>
    </div>
  );
}
