import React, { memo } from 'react';
import { NavLink } from "react-router-dom";

const PostsList = memo(({ posts }) => {
    return (
        <>
            {posts.map(post =>
                <div key={post._id}>
                    <NavLink to={`/post/${post._id}`}>
                        <div>
                            <p className='lead'>{post.title}</p>
                        </div>
                    </NavLink>
                </div>)
            }
        </>
    )
});

export default PostsList;