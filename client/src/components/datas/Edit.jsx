import React, { useState, useEffect } from "react";
import { Form, Container } from "react-bootstrap";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Edit = function (props) {
  const id = props.location.state.id;
  //found in docs for react router

  const [inputs, setInputs] = useState({
    bookName: "",
    bookIsbn: "",
    bookYear: "",
    bookAuthor: "",
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const dataResp = await Axios.get("/api/datas/${id}");
      if (dataResp.status === 200) setInputs(dataResp.data);
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const resp = await Axios.post("/api/datas/update", inputs);

      if (resp.status === 200) {
        toast("the book was updated successfully", {
          type: toast.TYPE.SUCCESS,
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the book .", {
          type: toast.TYPE.ERROR,
        });
      }
    } catch (error) {
      toast("There was an issue updating the book .", {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleInputChange = async (event) => {
    event.persist();

    const { name, value } = event.target;

    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  };

  if (redirect) return <Redirect to="/datas" />;

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Book </h1>
      </header>

      <hr />

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              Book Name:
              <Form.Control
                name="bookName"
                onChange={handleInputChange}
                value={inputs.bookName}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Book Isbn:
              <Form.Control
                name="bookIsbn"
                onChange={handleInputChange}
                value={inputs.bookIsbn}
              />
            </Form.Label>
          </Form.Group>

           <Form.Group>
            <Form.Label>
              Book Year:
              <Form.Control
                name="bookYear"
                onChange={handleInputChange}
                value={inputs.bookYear}
              />
            </Form.Label>
          </Form.Group>

          
           <Form.Group>
            <Form.Label>
              Book Author:
              <Form.Control
                name="bookAuthor"
                onChange={handleInputChange}
                value={inputs.bookAuthor}
              />
            </Form.Label>
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn-primary">
              Update
            </button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default Edit;
