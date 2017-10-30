import React,{Component} from 'react'
import {Route,Link} from 'react-router-dom'
import BookList from './BookList.js'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class App extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
     books:[{shelf:'currentlyReading',title:'To Kill a Mockingbird',author:'Harper Lee',coverURL:'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',id:'PGR2AwAAQBAJ'},
     {shelf:'wantToRead',title:"Ender's Game",author:'Orson Scott Card',coverURL:'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',id:'yDtCuFHXbAYC'},
   {shelf:'read',title:"Harry Potter and the Sorcerer's Stone",author:'J.K Rowling',coverURL:'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',id:'wrOQLV6xB-wC'}

]
  }
  moveToShelf = (bID,newShelf)=>{
    this.setState((state) => ({
      books: state.books.map((b) => b.id === bID?{shelf:newShelf,title:b.title,author:b.author,coverURL:b.coverURL,id:b.id}:b)
    }))
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={()=>(
          <BookList moveToShelf={this.moveToShelf} books={this.state.books}/>
        )}/>
        <Route path="/search" render={()=>(
          <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default App
