'use client';

import { PostConnectionQuery } from '@/tina/__generated__/types';
import Link from 'next/link';
import React from 'react';
import { useTina } from 'tinacms/dist/react';
import { tinaField } from 'tinacms/dist/react';

export default function PostsComponent(props: {
  data: PostConnectionQuery;
  variables: object;
  query: string;
}) {
  const { data } = useTina(props);
  const posts = data.postConnection.edges;

  return (
    <React.Fragment>
      {posts && posts?.length > 0 && (
        <ul>
          {posts.map((edge) => {
            const post = edge?.node;

            if (!post) {
              return null;
            }

            return (
              <li key={post._sys.filename} className='border-t border-black py-gutter pr-gutter'>
                <Link href={`/blog/${post._sys.filename}`} className='text-container'>
                  <h2 data-tina-field={tinaField(post, 'title')}>{post.title}</h2>
                  <div>{post.category.title}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </React.Fragment>
  );
}
