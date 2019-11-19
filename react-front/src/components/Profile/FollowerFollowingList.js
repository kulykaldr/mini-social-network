import React, { memo } from 'react';
import { NavLink } from "react-router-dom";
import anonimPhoto from '../../images/anonim.jpg';

const FollowerFollowingList = memo(({ list }) => {
    return (
        <>
            {list.map(item =>
                <div key={item._id}>
                    <NavLink to={`/user/${item._id}`}>
                        <img
                            style={{
                                borderRadius: '50%',
                                border: '1px solid black'
                            }}
                            className='float-left mr-2'
                            height='30px'
                            width='30px'
                            src={item.photo || anonimPhoto}
                            alt={item.name}
                        />
                        <div>
                            <p className='lead'>{item.name}</p>
                        </div>
                    </NavLink>
                </div>)
            }
        </>
    )
});

export default FollowerFollowingList;