import React from 'react';
import { NavLink } from "react-router-dom";
import anonimPhoto from '../../images/anonim.jpg';

const UserCard = ({ user }) => (
    <div className="card col-md-4" style={{width: '18rem'}}>
        <img className='img-thumbnail'
             style={{ height: '200px', width: 'auto' }}
             src={user.photo || anonimPhoto}
             alt={user.name}
        />
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">{user.email}</p>
                <NavLink to={`/user/${user._id}`} className="btn btn-raised btn-primary btn-sm">View profile</NavLink>
            </div>
    </div>
);


export default UserCard;