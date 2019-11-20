import React from 'react';
import { NavLink } from "react-router-dom";

const PostCard = ({ post }) => {

    const posterUrl = post.postedBy ? `/user/${post.postedBy._id}` : '#';
    const posterName = post.postedBy ? post.postedBy.name : 'Unknown';

    const createdDate = new Date(post.created)
        .toLocaleDateString('en-US',
            {
                year: 'numeric', month: 'numeric', day: 'numeric',
                hour: 'numeric', minute: 'numeric'
            });

    return (
        <div className="card col-md-4" style={{ width: '18rem' }}>
            <div className="card-body">
                <img className="card-img-top"
                     src={post.thumbnail}
                     alt={post.title}
                     style={{ width: 'auto', height: '200px'}}
                />
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body.substring(0, 100)}</p>
                <br/>
                <p className='font-italic mark'>
                    Posted by <NavLink to={posterUrl}>{posterName}</NavLink> <br/> on {createdDate}
                </p>
                <NavLink to={`/post/${post._id}`} className="btn btn-raised btn-primary btn-sm">Read more</NavLink>
            </div>
        </div>
    )
};


export default PostCard;