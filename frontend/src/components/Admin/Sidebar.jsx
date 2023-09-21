import React from 'react'
import './Sidebar.css'
import { TreeView, TreeItem } from '@material-ui/lab';
import logo from '../layout/Header/logo.png'
import { Link } from 'react-router-dom';
import { MdDashboardCustomize, MdExpandMore, MdOutlineCreateNewFolder } from 'react-icons/md';
import { BsCardChecklist, BsChevronBarContract, BsDatabaseFillAdd, BsFillPeopleFill } from 'react-icons/bs';
import { GoCodeReview } from 'react-icons/go';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to='/'>
                <img src={logo} alt="Ecommerce" />
            </Link>
            <Link to='/admin/dashboard'>
                <p>
                    <MdDashboardCustomize /> Dashboard
                </p>
            </Link>
            <Link>
                <TreeView
                    defaultCollapseIcon={<BsChevronBarContract />}
                    defaultExpandIcon={<MdExpandMore />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<BsDatabaseFillAdd />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<MdOutlineCreateNewFolder />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <BsCardChecklist />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <BsFillPeopleFill /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <GoCodeReview />
                    Reviews
                </p>
            </Link>
        </div>
    )
}

export default Sidebar