import React from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import img from './img/carasol.jpeg';
import './main.css';
import AddForm from './AddForm';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/getBooks`);
      this.setState({ books: response.data });
    } catch (err) {
      console.error('Could not find book', err);
    }

  }

  postBooks = async (newBook) => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/books`
      const response = await axios.post(url, newBook);
      this.setState({ books: [...this.state.books, response.data] }, () => console.log(this.state.books));
    } catch (err) {
      console.error(err);
    }
  }

  showBookModal = () => {
    console.log("inside show book modal function");
    this.setState({ showModal: true })
  }

  hideBookModal = () => {
    this.setState({ showModal: false })
  }

addBook = (e) => {
  e.preventDefault();
}

deleteBook = async(bookToDelete) => {
  console.log(bookToDelete);
  const url = `${process.env.REACT_APP_SERVER}/books/${bookToDelete._id}`
  await axios.delete(url);
  const updatedBooks = this.state.books.filter(book => book._id !== bookToDelete._id);
  this.setState({books: updatedBooks});
}
deleteHandler = (e) => {
  e.preventDefault();
}

  render() {
    return (
      <>

        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Carousel>

          {this.state.books.length > 0 ? this.state.books.map((book) => {
            return <Carousel.Item>
              <img
                className="d-block w-100"
                src={img}
                alt={book.description}
                height='700'
              />
              <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>{book.status}</p>
                <button onClick={() => this.deleteBook(book)}>Delete book</button>

              </Carousel.Caption>
            </Carousel.Item>;
          })
            : (
              <h3>No Books Found </h3>
            )
          }
        </Carousel>
        <Button onClick = {() => this.showBookModal()}>Add Book Here </Button>
        {/* <Button onClick = {() => this.deleteBook()}>  Delete   </Button> */}

        <AddForm 
        show={this.state.showModal}
        hideBookModal={this.hideBookModal}
        postBooks={this.postBooks} 
    
        />
        
      </>
    )
  }
}
export default BestBooks;
