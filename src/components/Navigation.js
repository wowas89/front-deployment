import React from 'react';
import { NavLink} from 'react-router-dom';

const Navigation = () =>(
    <nav className="nav navigation">
    <NavLink to="/home" className="navigationLink">Home</NavLink>
    <NavLink to="/admin" className="navigationLink">Admin</NavLink>
</nav>
)

export default Navigation;