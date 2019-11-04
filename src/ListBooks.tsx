
import React  from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import { listBooksProps } from './types';

class ListBooks extends React.Component<listBooksProps>{
    render(){
        let {books, sections} = this.props
        return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                { sections.map((section)=>(
                   <div className="bookshelf" key={section.id}>
                   <h2 className="bookshelf-title">{section.title}</h2>
                   <div className="bookshelf-books">
                     <ol className="books-grid">
                     { books.filter( book => book.shelf === section.id).map((book) => (
                       <li key={book.id}>
                          <Book 
                              onUpdate={this.props.onUpdate}
                              book={book}
                              shelf={section.id}/>
                       </li>))}
                       </ol>
                     </div>
                 </div>
                ))}
            </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
        </div>)
                  
    }

}

export default ListBooks
