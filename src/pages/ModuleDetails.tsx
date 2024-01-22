import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../apis/axios_init";
import User from "../types/User";
import ModuleUsers from "../types/ModuleUsers";
import MarkingCalendar from "./Calendar";
import Role from "../utils/isAdmin";
import ModuleFeed from "./ModuleFeed";
import { Post } from "../types/Post";
import isAdmin from "../utils/isAdmin";
import PostComponent from "../components/Post";

const ModuleDetails: React.FC = () => {
  const { id: moduleIdFromParams } = useParams<{ id?: string }>();
  const id = moduleIdFromParams || '';
  const [posts, setPosts] = useState<Post[]>([]);
  const [moduleUsers, setModuleUsers] = useState<ModuleUsers>();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUsersInfo = async () => {
      try {
        const response = await axiosInstance.get(`/actions/module/${id}/users`);
        setModuleUsers(response.data);
      } catch (error) {
        setError('Failed to fetch user information.');
      }
    };

    fetchUsersInfo();
  }, [id]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axiosInstance.get(`/posts/${id}/feed`);
      setPosts(response.data);
    };

    fetchPosts();
  }, [id]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-blue-500">
        {moduleUsers?.module.title}
      </h1>
      {Role() === 'TEACHER' && <MarkingCalendar module_id={id ?? ''} />}
      <div className="mt-8">
        {isAdmin() === 'TEACHER' && (
          <Link
            to={`/module/${id}/posts/new`}
            className="text-blue-500 hover:underline bg-yellow-300 px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Create New Post
          </Link>
        )}

        <div className="mt-6">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <PostComponent key={post.id} post={post} />
            ))
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModuleDetails;
