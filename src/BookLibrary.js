import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf.js'

class BookLibrary extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves:PropTypes.array.isRequired,
    moveToShelf: PropTypes.func.isRequired
  }
  compare(a,b){
    var nameA = a.title.toUpperCase();
    var nameB = b.title.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
  render(){
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.props.shelves.map((lib)=>
              <BookShelf
                moveToShelf={this.props.moveToShelf}
                books={this.props.books.filter((book)=>book.shelf===lib.filter)}
                name={lib.name}
              />
            )}

          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookLibrary
