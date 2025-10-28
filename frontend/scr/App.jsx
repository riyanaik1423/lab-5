import React, { useEffect, useState } from 'react';
import { fetchPosts, createPost, updatePost, deletePost } from './api';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import './index.css';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);

  async function load() {
    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(payload) {
    try {
      const newPost = await createPost(payload);
      setPosts(prev => [newPost, ...prev]);
    } catch (e) { setError(e.message); }
  }

  async function handleUpdate(id, payload) {
    try {
      const updated = await updatePost(id, payload);
      setPosts(prev => prev.map(p => p._id === id ? updated : p));
      setEditing(null);
    } catch (e) { setError(e.message); }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return;
    try {
      await deletePost(id);
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (e) { setError(e.message); }
  }

  return (
    <div className="container">
      <header>
        <h1>Blog Management</h1>
      </header>

      <main>
        <section className="form">
          <h2>{editing ? 'Edit Post' : 'Create Post'}</h2>
          <PostForm
            key={editing ? editing._id : 'new'}
            initial={editing}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        </section>

        <section className="list">
          <h2>All Posts</h2>
          {error && <p className="error">{error}</p>}
          <PostList posts={posts} onEdit={setEditing} onDelete={handleDelete} />
        </section>
      </main>

      <footer>
        <small>Built with Express + MongoDB + React</small>
      </footer>
    </div>
  );
}
