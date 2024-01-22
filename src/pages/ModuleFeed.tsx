import { Link, useParams } from "react-router-dom";
import isAdmin from "../utils/isAdmin";
import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import axiosInstance from "../apis/axios_init";
import PostComponent from "../components/Post";


interface Props{
    id: string
}

const ModuleFeed: React.FC<Props> = ({id}) => {
    const [posts, setPosts] = useState<Post[]>([]);
    


    return (
        <div>
            <p>{id}</p>
          {isAdmin() === 'TEACHER' && (
            <Link to={`/module/${id}/posts/new`}>Create New Post</Link>
          )}
      
          <div>
            {posts && posts.map((post) => (
              <PostComponent key={post.id} post={post} />
            ))}
          </div>
        </div>
      );
}

export default ModuleFeed;