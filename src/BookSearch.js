import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import BookShelf from './BookShelf.js'
import {DebounceInput} from 'react-debounce-input';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import LinearProgress from 'material-ui/LinearProgress';


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
    query&&BooksAPI.search(query,MAX_BOOKS_QUERY).then((data)=>{

      var nBooks = data&&data.error?[]:data.map((b)=>{
        var findBook = this.props.currentBooks.find((b2)=>b2.id===b.id)
        b.shelf= findBook?findBook.shelf:b.shelf
        b.shelf= b.shelf?b.shelf:'none'
        return b
      })

      this.setState({loading:false,books:nBooks})
    })
    !query&&this.setState({loading:false,books:[]})
  }

  render(){
    const{query,books} =this.state

    return(
      <div className="search-books">

        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
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
        {this.state.loading&&(
                <div style={style.container}>
                  <LinearProgress style={style.refresh} mode="indeterminate" />
                </div>
        )}

        <div className="search-books-results">
          <ol className="books-grid">
            <BookShelf books={books} moveToShelf={this.props.moveToShelf} noTitle={true}/>

            {!this.state.loading&&query&&books.length===0&&
              <div className="noresults-container">
              <p className="noresults-legend" >No results for: <strong>{query}</strong></p>
              <img className="noresults" src={'/sademoji.jpg'} />
            </div>
            }

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
