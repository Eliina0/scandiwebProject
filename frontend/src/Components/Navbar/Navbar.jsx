import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './navbar.scss';

const Navbar = ({ onSave, onMassDelete }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <h1 className="title">
                    {pathname === '/add-product'
                        ? 'Product Add'
                        : 'Product List'}
                </h1>
                <div className="buttons">
                    {pathname === '/add-product'
                        ? <>
                            <button className="btn btn-primary" onClick={onSave}>Save</button>
                            <button className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
                        </>
                        : <>
                            <button className="btn btn-primary" onClick={() => navigate('/add-product')}>Add</button>
                            <button className="btn btn-danger" onClick={onMassDelete}>Mass Delete</button>
                        </>
                    }
                </div>
            </div>
            <hr />
        </nav>
    );
};

export default Navbar;
