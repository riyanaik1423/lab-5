const API_ROOT = import.meta.env.VITE_API_ROOT || 'http://localhost:4000/api';

export async function fetchPosts() {
  const res = await fetch(`${API_ROOT}/posts`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch(`${API_ROOT}/posts/${id}`);
  if (!res.ok) throw new Error('Failed to fetch post');
  return res.json();
}

export async function createPost(payload) {
  const res = await fetch(`${API_ROOT}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create post');
  return res.json();
}

export async function updatePost(id, payload) {
  const res = await fetch(`${API_ROOT}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to update post');
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_ROOT}/posts/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete post');
  return res.json();
}
