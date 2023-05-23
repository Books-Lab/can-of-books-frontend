import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import img from './img/carasol.jpeg';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    this.fetchBooks();
  }

  async fetchBooks() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/getBooks`);
      this.setState({ books: response.data });
    } catch (err) {
      console.error(err);
    }

  }


  render() {

    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Carousel>
          {this.state.books.length > 0 ? this.state.books.map((books) => {
            return <Carousel.Item>
              <img
                className="d-block w-100"
                src={img}
                alt={books.description}
                height='700'
              />
              <Carousel.Caption>
                <h3>{books.title}</h3>
                <p>{books.description}</p>
                <p>{books.status}</p>

              </Carousel.Caption>
            </Carousel.Item>;
          })
            : (
              <h3>No Books Found </h3>
            )
          }
        </Carousel>
      </>
    );
  }
}

export default BestBooks;