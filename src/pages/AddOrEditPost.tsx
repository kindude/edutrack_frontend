import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../apis/axios_init';

const AddOrEditPost: React.FC = () => {
  const { id } = useParams();
  const module_id = id;
  let author_id = localStorage.getItem('id');
  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    author_id = localStorage.getItem('id');
    if (author_id && typeof author_id === 'string') {
      author_id = author_id.replace(/"/g, '');
    }
    const newPost = {
      title: postTitle,
      text: postText,
      date: new Date().toISOString(), 
      module_id,
      author_id,
    };

    const response = await axiosInstance.post('/posts/add', newPost);

    console.log('New Post:', newPost);

  };

  return (
    <div>
        
        
        
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />

        <label htmlFor="postText">Text:</label>
        <textarea
          id="postText"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddOrEditPost;
