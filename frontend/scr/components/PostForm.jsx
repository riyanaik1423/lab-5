import React, { useState, useEffect } from 'react';

export default function PostForm({ initial = null, onCreate, onUpdate, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setContent(initial.content || '');
      setAuthor(initial.author || '');
    }
  }, [initial]);

  function reset() { setTitle(''); setContent(''); setAuthor(''); }

  async function submit(e) {
    e.preventDefault();
    const payload = { title, content, author };
    if (initial && initial._id) {
      await onUpdate(initial._id, payload);
    } else {
      await onCreate(payload);
      reset();
    }
  }

  return (
    <form onSubmit={submit} className="post-form">
      <label>
        Title
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <label>
        Author
        <input value={author} onChange={e => setAuthor(e.target.value)} />
      </label>
      <label>
        Content
        <textarea value={content} onChange={e => setContent(e.target.value)} required />
      </label>

      <div className="buttons">
        <button type="submit">{initial ? 'Save' : 'Create'}</button>
        {initial && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
