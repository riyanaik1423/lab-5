import React from 'react';
import PostItem from './PostItem';

export default function PostList({ posts = [], onEdit, onDelete }) {
  if (!posts.length) return <p>No posts yet.</p>;
  return (
    <div className="post-list">
      {posts.map(p => (
        <PostItem key={p._id} post={p} onEdit={() => onEdit(p)} onDelete={() => onDelete(p._id)} />
      ))}
    </div>
  );
}
