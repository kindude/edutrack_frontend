import { User } from "@auth0/auth0-react";
import { Post } from "../types/Post";

interface PostProps {
    post: Post
}



const PostComponent: React.FC<PostProps> = ({post}) => {
    return (
        <div className="border border-gray-300 p-4 m-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.text}</p>
            <p className="text-gray-700"><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>

            <div className="mt-4 text-sm text-gray-600">
                <strong>Author:</strong>
                <p><strong>Name:</strong> {post.author.first_name} {post.author.last_name}</p>
                <p><strong>In {post.module.title}</strong></p>
            </div>

        </div>
    );
}

export default PostComponent;