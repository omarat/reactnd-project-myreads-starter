import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book.js'

class BookShelf extends Component{
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveToShelf: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }
  compare(a,b){
    //aux to sort books
    let nameA = a.title.toUpperCase();
    let nameB = b.title.toUpperCase();
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
        <div className="bookshelf">
          {!this.props.noTitle&&
          <h2 className="bookshelf-title">{this.props.name}</h2>
          }
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.sort(this.compare).map((book)=>
                <li key={book.id}>
                <Book moveHandler={this.props.moveToShelf} book={book}/>
              </li>
              )}
            </ol>
          </div>
        </div>
    )
  }
}

export default BookShelf
