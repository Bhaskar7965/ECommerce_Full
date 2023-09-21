import React, { useState } from 'react';
import { Backdrop, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { AiFillDatabase, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { GiCardboardBox } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch } from 'react-redux';

const UserOptions = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        alert.success("Logout Successfully");
    };

    const handleUserProfile = () => {
        navigate("/account");
    };

    const handleOrders = () => {
        navigate("/orders");
    };

    const handleDashboard = () => {
        navigate("/admin/dashboard");
    };

    const handleCart = () => {
        navigate("/Cart");
    };

    const actions = [
        { name: 'Profile', icon: user && user.profileImage ? <SpeedDialIcon /> : <AiOutlineUser />, onClick: handleUserProfile },
        { name: 'Orders', icon: <GiCardboardBox />, onClick: handleOrders },
        { name: 'Cart', icon: <AiOutlineShoppingCart />, onClick: handleCart },
        { name: 'Logout', icon: <RiLogoutBoxLine />, onClick: handleLogout },
    ];

    if (user && user.role === 'admin') {
        actions.unshift({ name: 'Dashboard', icon: <AiFillDatabase />, onClick: handleDashboard });
    }

    return (
        <div>
            <Backdrop
                open={open}
                onClick={handleClose}
                sx={{ display: 'none', '@media (hover:hover)': { display: 'block' } }}
            />
            <SpeedDial
                ariaLabel="User Options"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => {
                            action.onClick();
                            handleClose(); // Close the SpeedDial after clicking an option
                        }}
                    />
                ))}
            </SpeedDial>
        </div>
    );
};

export default UserOptions;
