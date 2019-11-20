import React, { useEffect } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import { getPosts } from "../../redux/postReducer";
import PostCard from "./PostCard";

const Posts = ({ error, posts, getPosts, isLoading }) => {

    useEffect(() => {
        getPosts();
    }, [ getPosts ]);

    const postsItems = posts.map(post => <PostCard post={post} key={post._id}/>);

    return (
        <div className='container'>
            <h2 className="mt-5 mb-5">Recent posts</h2>
            {isLoading && <Preloader/>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                {!error && postsItems}
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    posts: state.post.posts,
    isLoading: state.post.isLoading,
    error: state.post.error
});

export default compose(
    connect(mapStateToProps, { getPosts })
)(Posts);