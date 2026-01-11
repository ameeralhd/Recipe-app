import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1rem 0'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h2 style={{ margin: 0, color: 'hsl(var(--color-primary))', fontWeight: 800 }}>
                        Culin<span style={{ color: 'rgb(var(--color-text))' }}>ary.</span>
                    </h2>
                </Link>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link to="/" style={{ textDecoration: 'none', fontWeight: 500, color: 'rgb(var(--color-text))' }}>Home</Link>
                    <Link to="/explore" style={{ textDecoration: 'none', fontWeight: 500, color: 'rgb(var(--color-text))' }}>Explore</Link>

                    {user ? (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600 }}>Hi, {user.name}</span>
                            <button onClick={handleLogout} className="btn" style={{ padding: '8px 16px', fontSize: '0.9rem', backgroundColor: '#ddd' }}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login">
                                <button className="btn" style={{ padding: '8px 16px', fontSize: '0.9rem', backgroundColor: 'transparent', border: '1px solid #ddd' }}>
                                    Log In
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
