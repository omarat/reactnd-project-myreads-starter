import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import BookShelf from './BookShelf.js'
import {DebounceInput} from 'react-debounce-input';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import LinearProgress from 'material-ui/LinearProgress';

//supports loading bar
const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    marginTop:'53px'
  },
};

//constants
const MAX_BOOKS_QUERY=20;
const CURRENT_READING_SHELF=20;

class BookSearch extends Component{
  static propTypes = {
    moveToShelf: PropTypes.func.isRequired,
    currentBooks:PropTypes.array.isRequired
  }
  state = {
    query: "",
    books:[],
    loading:false
  }
  updateQuery = (query) => {
    this.setState({query: query.trim()})
    //if query is not empty go to server
    query&&BooksAPI.search(query,MAX_BOOKS_QUERY).then((data)=>{

      let nBooks = data&&data.error?[]:data.map((b)=>{
        let findBook = this.props.currentBooks.find((b2)=>b2.id===b.id)
        b.shelf= findBook?findBook.shelf:b.shelf
        b.shelf= b.shelf?b.shelf:'none'
        return b
      })
      this.setState({loading:false,books:nBooks})
    })
    //query is empty, clear state
    !query&&this.setState({loading:false,books:[]})
  }

  render(){
    const{query,books} =this.state

    return(
      <div className="search-books">

        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/* A debounced input to not spam the server :) */}
            <DebounceInput
              onKeyPress={(event)=>!this.state.loading&&this.setState({loading:true})}
              minLength={2}
              debounceTimeout={300}
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>

        {/* This is a Google material UI loading bar */}
        {this.state.loading&&(
                <div style={style.container}>
                  <LinearProgress style={style.refresh} mode="indeterminate" />
                </div>
        )}

        <div className="search-books-results">
          <ol className="books-grid">
            <BookShelf books={books} moveToShelf={this.props.moveToShelf} noTitle={true}/>
            {/* No results for your query :( */}
            {!this.state.loading&&query&&books.length===0&&
              <div className="noresults-container">
              <p className="noresults-legend" >No results for: <strong>{query}</strong></p>
              <img className="noresults" src={'/sademoji.jpg'} />
            </div>
            }
            {/* You should search something dude */}
            {!query&&books.length===0&&
              <div className="noresults-container">
              <p className="noresults-legend" >Search above</p>

            </div>
            }

          </ol>


        </div>
      </div>

    )
  }
}

export default BookSearch
