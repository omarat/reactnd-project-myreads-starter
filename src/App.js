import React,{Component} from 'react'
import {Route,Link} from 'react-router-dom'
import BookList from './BookList.js'
import * as BooksAPI from './BooksAPI.js'
import BookSearch from './BookSearch.js'
import './App.css'

class App extends Component {
  state = {
     books:[]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    }
    )
  }
  moveToShelf = (book,newShelf)=>{
    this.state.books.push(book);
    this.setState((state) => ({
      books: state.books.map((b) => {
        b.shelf=b.id===book.id?newShelf:b.shelf
        return b
      })
    }))
    BooksAPI.update(book,newShelf)
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookList moveToShelf={this.moveToShelf} books={this.state.books}/>
        )}/>
        <Route path="/search" render={()=>(
          <BookSearch currentBooks={this.state.books} moveToShelf={this.moveToShelf}/>
        )}/>

      </div>
    )
  }
}

export default App
