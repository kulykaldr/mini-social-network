import React, { memo } from 'react';
import FollowerFollowingList from "./FollowerFollowingList";
import PostsList from "./PostsList";

const ProfileTabs = memo(({ following, followers, posts }) => {
    return (
        <div className="row">
            <div className="col-md-4">
                <h3 className="text-primary">Followers</h3>
                <hr/>
                <FollowerFollowingList list={followers} />
            </div>
            <div className="col-md-4">
                <h3 className="text-primary">Following</h3>
                <hr/>
                <FollowerFollowingList list={following} />
            </div>
            <div className="col-md-4">
                <h3 className="text-primary">Posts</h3>
                <hr/>
                <PostsList posts={posts} />
            </div>
        </div>
    )
});

export default ProfileTabs;