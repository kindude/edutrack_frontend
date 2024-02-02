import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import axiosInstance from "../apis/axios_init";
import PostComponent from "../components/Post";

const News: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get<Post[]>('/posts/all');
                const sortedPosts = response.data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setPosts(sortedPosts);
            } catch (error) {
                setError('A problem occurred while fetching the news');
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            {posts && posts.map((post) => (
                <PostComponent key={post.id} post={post} />
            ))}
        </div>
    );
};

export default News;
