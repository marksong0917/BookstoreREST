import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Nav({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

      <Link to="/" className="navbar-brand">
        Home
      </Link>

      <Link to="/books" className="navbar-brand">
        Book List 
      </Link>

      <Link to="/books/new" className="navbar-brand">
        New Book  
      </Link>

      <Link to="/register" className="navbar-brand">
        Register
      </Link>

      <Link to="/login" className="navbar-brand">
        Login
      </Link>

      <Link to="/logout" className="navbar-brand">
        Logout
      </Link>

    </nav> 
  );
}

export default Nav;
