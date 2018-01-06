import React, {Component} from 'react'
import Book from './Book'
import {Link} from 'react-router-dom'

class SearchBooks extends Component{
    //get state
    render(){
        //query={this.state.query} books={this.state.books} onUpdate={this.update} search={this.search}
        let{query,books,update,search} = this.props;
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" value={query} onChange={(event)=>search(event.target.value)} placeholder="Search by title or author"/>
              </div>
            </div>
            {books.length > 1 && (
              
               <div className="search-books-results">
               <ol className="books-grid">
                { books.map((book) => (
                     <li key={book.id}>
                        <Book onUpdate={update} book={book} section={book.shelf ? book.shelf : 'none'}/>
                     </li>)
                     )
                }
               </ol>
             </div>
             )
            }
          </div>
      )
    }
   
}



export default SearchBooks