import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js'
import Book from './Book.js'
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
    BooksAPI.search(query,20).then((data)=>{
      console.log(data);
      var nBooks = data.error?[]:data.map((b)=>{
        var findBook = this.props.currentBooks.find((b2)=>b2.id===b.id)
        b.shelf= findBook?findBook.shelf:b.shelf
        return b
      })
      this.setState({loading:false,books:nBooks})
    })
  }

  render(){
    const{query,books} =this.state

    return(
      <div className="search-books">

        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput onKeyPress={(event)=>!this.state.loading&&this.setState({loading:true})} minLength={2} debounceTimeout={300} type="text" placeholder="Search by title or author" value={query} onChange={(event)=>this.updateQuery(event.target.value)}/>
          </div>
        </div>
{this.state.loading&&(

            <div style={style.container}>

      <LinearProgress style={style.refresh} mode="indeterminate" />
    </div>
)}

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
