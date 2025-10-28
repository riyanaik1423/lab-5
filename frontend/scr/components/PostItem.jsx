import React from 'react';

export default function PostItem({ post, onEdit, onDelete }) {
  return (
    <article className="post-item">
      <h3>{post.title}</h3>
      <div className="meta">{post.author} • {new Date(post.createdAt).toLocaleString()}</div>
      <p>{post.content.length > 200 ? post.content.slice(0,200) + '...' : post.content}</p>
      <div className="actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </article>
  );
}
