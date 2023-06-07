import React from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import img from './img/carasol.jpeg';
import './main.css';
import AddForm from './AddForm';
import UpdateBook from './UpdateBook';
import { withAuth0 } from '@auth0/auth0-react';


class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showAddModal: false,
      showUpdateModal: false,
      selectedBook: {}
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    try {
      const res = await this.props.auth0.getIdTokenClaims();
      const jwt = res.__raw
      const config = { headers:{'Authorization':`Bearer ${jwt}`}}
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/getBooks`, config);
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
    this.setState({ showAddModal: true })
  }

  hideBookModal = () => {
    this.setState({ showAddModal: false })
  }

  addBook = (e) => {
    e.preventDefault();
  }

  deleteBook = async (bookToDelete) => {
    console.log(bookToDelete);
    const url = `${process.env.REACT_APP_SERVER}/books/${bookToDelete._id}`
    await axios.delete(url);
    const updatedBooks = this.state.books.filter(book => book._id !== bookToDelete._id);
    this.setState({ books: updatedBooks });
  }
  deleteHandler = (e) => {
    e.preventDefault();
  }

  updateBook = async (bookToUpdate) => {
    console.log(bookToUpdate);  
    const url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`
    await axios.put(url, bookToUpdate);
    const updateBooksArray = this.state.books.map(oldBook => oldBook._id === bookToUpdate._id ? bookToUpdate : oldBook);
    this.setState({ books: updateBooksArray });
  }

  updateHandler = (e) => {
    e.preventDefault();
  }

  openUpdateModal = (book) => this.setState({ showUpdateModal: true, selectedBook: book })
  closeUpdateModal = () => this.setState({ showUpdateModal: false })

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
                <button onClick={() => this.openUpdateModal(book)}>Update book</button>

              </Carousel.Caption>
            </Carousel.Item>;
          })
            : (
              <h3>No Books Found </h3>
            )
          }
        </Carousel>
        <Button onClick={() => this.showBookModal()}>Add Book Here </Button>
        {/* <Button onClick = {() => this.deleteBook()}>  Delete   </Button> */}

        <AddForm
          show={this.state.showAddModal}
          hideBookModal={this.hideBookModal}
          postBooks={this.postBooks}
        />
        <UpdateBook
          showUpdateModal={this.state.showUpdateModal}
          closeUpdateModal={this.closeUpdateModal}
          updateBook={this.updateBook}
          selectedBook={this.state.selectedBook}
        />


      </>
    )
  }
}
export default withAuth0(BestBooks);
