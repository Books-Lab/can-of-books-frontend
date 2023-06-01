import React from "react";
import { Form, Button, Modal } from "react-bootstrap";
// import BestBooks from "./BestBooks";



class AddForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value
    }
    this.props.postBooks(newBook)
    this.props.hideBookModal();
  }




  render() {
    return (

      <Modal show={this.props.show} onHide={this.props.hideBookModal}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Book Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Book Here" />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Book Plot</Form.Label>
            <Form.Control type="text" placeholder="Enter Plot Here" />
            <Form.Group controlId="status">
              <Form.Label>Read or Unread?</Form.Label>
              <Form.Control type="text" placeholder="Have you read this book before?" />
            </Form.Group>
          </Form.Group>
          <Button type="submit">Add Book</Button>
          <Button variant="secondary">Update</Button>
        </Form>
      </Modal>
    )
  }
};

export default AddForm;