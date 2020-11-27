import React from 'react';
import { Link } from 'react-router-dom';

function Home ({user}) {
  return (
    <header className="home-cta">
      <h1 style={{color: '#c0392b'}} className="mb-5">Book Store </h1>

      {user ? (
        <Link to="/books/new" className="btn btn-primary reddin">Post a book</Link>
      ) : (
        <Link to="/register" className="btn btn-primary reddin">Register an Account</Link>
      )}
    </header>
  );
};

export default Home;