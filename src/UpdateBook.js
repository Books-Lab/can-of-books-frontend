import React from "react";
import { Form, Button, Modal } from "react-bootstrap";

class UpdateBook extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = {
      title: e.target.title.value || this.props.selectedBook.title,
      description: e.target.description.value || this.props.selectedBook.description,
      status: e.target.status.value || this.props.selectedBook.status,
      _id: this.props.selectedBook._id
    }
    console.log(updatedBook);
    this.props.updateBook(updatedBook);
    this.props.closeUpdateModal();
    
  }



  render() {
    return (

      <Modal show={this.props.showUpdateModal} onHide={this.props.closeUpdateModal}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Book Name</Form.Label>
            <Form.Control type="text" placeholder={this.props.selectedBook.title} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>{this.props.selectedBook.description}</Form.Label>
            <Form.Control type="text" placeholder="Enter Plot Here" />
            <Form.Group controlId="status">
              <Form.Label>Read or Unread?</Form.Label>
              <Form.Control type="text" placeholder={this.props.selectedBook.status} />
            </Form.Group>
          </Form.Group>
          <Button variant="secondary" type="submit" onSubmit={this.updateBook}>Update Book</Button>
        </Form>
      </Modal>
    )
  }
}

export default UpdateBook;