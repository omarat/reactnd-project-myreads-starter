import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book.js'
import {DebounceInput} from 'react-debounce-input';

class BookSearch extends Component{
  static propTypes = {
    moveToShelf: PropTypes.func.isRequired,
    currentBooks:PropTypes.array.isRequired
  }
  state = {
    query: "",
    books:[]
  }
  updateQuery = (query) => {
    debugger
    this.setState({query: query.trim()})
    BooksAPI.search(query,20).then((data)=>{
      var nBooks = data.map((b)=>{
        var findBook = this.props.currentBooks.find((b2)=>b2.id===b.id)
        b.shelf= findBook?findBook.shelf:b.shelf
        return b
      })
      this.setState({books:nBooks})
    })
  }

  render(){
    const{query,books} =this.state
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput minLength={2} debounceTimeout={300} type="text" placeholder="Search by title or author" value={query} onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            {books&&books.map&&books.map((b)=>
              <li key={b.id}>
              <Book moveHandler={this.props.moveToShelf} book={b}/>
            </li>
            )}
          </ol>
        </div>
      </div>

    )
  }
}

export default BookSearch
