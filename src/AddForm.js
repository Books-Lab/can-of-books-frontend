import React from "react";
import { Form, Container, Button } from "react-bootstrap";


class AddForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    const newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked
    }
    this.props.postBooks(newBook)
  }
  
  
  
  render() {
    return (
      
      <Container>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Book Here" />
        </Form.Group>
        <Form.Group controlId="descrption">
          <Form.Label>Book Plot</Form.Label>
          <Form.Control type="text" placeholder="Enter Plot Here" />
          <Form.Group controlId="status">
            <Form.Label>Book Name</Form.Label>
            <Form.Control type="text" placeholder="Have you read this book before?" />
          </Form.Group>
        </Form.Group>
        <Button type="submit">Add Book</Button>
      </Form>
    </Container>
  )
}
};

export default AddForm;