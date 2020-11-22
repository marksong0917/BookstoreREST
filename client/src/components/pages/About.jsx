import React from "react";
import { Container } from "react-bootstrap";

function About() {
  return (
    <Container class="my-5">
      <header className="jumbotron">
        <h1>About the Website</h1>
      </header>

      <div>
        <p>
          This is a bookstore mock-up website. It will provide a web based storage for books 
        </p>
      </div>
    </Container>
  );
}

export default About;
