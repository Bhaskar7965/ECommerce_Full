import React, { useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const navigate = useNavigate();

    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <MetaData title={`${user?.name || 'Profile'} Profile`} />
                    <div className="profileContainer">
                        <div>
                            <h1>My Profile</h1>
                            {user?.avatar && <img src={user.avatar.url} alt={user?.name || 'User'} />}
                            <Link to="/me/update">Edit Profile</Link>
                        </div>
                        <div className='rightContainer'>

                            <div className='userDetailContainer'>
                                <h4>Full Name</h4>
                                <p className='para'>{user && user.name}</p>
                            </div>
                            <div className='userDetailContainer'>
                                <h4>Email Address</h4>
                                <p className='para'>{user && user.email}</p>
                            </div>
                            <div className='userDetailContainer'>
                                <h4>Joined On</h4>
                                <p className='para'>{user && String(user.createdAt).substring(0, 10)}</p>
                            </div>
                            <div>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
