import React,{Component} from 'react'
import {Route,Link} from 'react-router-dom'
import BookLibrary from './BookLibrary.js'
import * as BooksAPI from './BooksAPI.js'
import BookSearch from './BookSearch.js'
import './App.css'

class App extends Component {
  state = {
     books:[],
     shelves:[
       {name:'Currently Reading',filter:'currentlyReading'},
       {name:'Want To Read',filter:'wantToRead'},
       {name:'Read',filter:'read'}
     ]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    }
    )
  }
  moveToShelf = (book,newShelf)=>{
    if(newShelf!='none'){
      this.setState((state) => ({
        books: state.books.concat([book]).map((b) => {
          b.shelf=b.id===book.id?newShelf:b.shelf
          return b
        })
      }))
    }
    else{
      this.setState((state) => ({
        books: state.books.filter((b) => {
          return b.id!=book.id
        })
      }))
    }

    BooksAPI.update(book,newShelf)
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookLibrary moveToShelf={this.moveToShelf} books={this.state.books} shelves={this.state.shelves}/>
        )}/>
        <Route path="/search" render={()=>(
          <BookSearch currentBooks={this.state.books} moveToShelf={this.moveToShelf}/>
        )}/>

      </div>
    )
  }
}

export default App
