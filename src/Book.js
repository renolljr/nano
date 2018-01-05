import React, {Component} from 'react';
class Book extends Component{
    //every component has a render method:
    render(){
        let{book,section} = this.props;
        return(
            <div className="book">
            <div className="book-top">
               {book.imageLinks && (
                   <div className="book-cover" style={{ width: 128, height: 193,  backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>    
               )}
              {!book.imageLinks && (
                   <div className="book-cover" style={{ width: 128, height: 193 }}></div>    
               )}

              <div className="book-shelf-changer">
                <select value={section} onChange={(event) => this.props.onUpdate(book, event.target.value)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{ book.authors && (book.authors.join(', '))}</div>
          </div>
        )
    }
}




export default Book