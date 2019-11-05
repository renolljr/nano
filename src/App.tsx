import './App.css'
import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import SearchBooks from "./SearchBooks"
import ListBooks from './ListBooks'
import { appProps,books, book } from './types'

const App:React.FC<appProps> = (props:appProps) => {
  const[books, setBooks] = useState<books>([]);
  const[query, setQuery] = useState<string>("");
  const[searchResults, setSearchResults] = useState<books>([]);
  const[sectionIDs] = useState([{id:"currentlyReading", title:"Currently Reading"},
            {id:"wantToRead", title:"Want to Read"},
            {id:"read", title:"Read"}])

  function loadBooks(){
    BooksAPI.getAll().then((books)=> {
      setBooks(books);
    });
  }

  function clearSearchQuery(){
    setQuery(''); 
  }

  function updateSearchQuery(query:string){
    query ? setQuery(query) : clearSearchQuery();
  }

  useEffect(()=>{  //equivalent to componentDidMount(), on component rerender
    loadBooks();
  })

  const search = (query:string) => {
    const searchLimit:number = 100;
    updateSearchQuery(query);

    let searchCriteria = query && query.length > 1;
    if(searchCriteria){
      let cabinet = books;
      BooksAPI.search(query, searchLimit).then((results:books)=>{
        let hasResults = results && results.length>1;
        if(hasResults){
          let searchResults = results.map(function(result:book){
            let index = cabinet.findIndex(i => i.id === result.id)
            if(index !== -1){
              return cabinet[index]
            } else {
              result.shelf = 'none';
              return result
            }
          });
          if(searchResults && searchResults.length >1){
            setSearchResults(searchResults);
          }else{
            setSearchResults([]);
          }
        }
      });
    }
    else{
      setSearchResults([]);
    }
  };

  const update = (book:book,shelf:string) =>{
    BooksAPI.update(book,shelf).then(()=>{
      loadBooks();
      search(props.query);
    })
  };

  return (
    <div className="app">
      <Route exact path='/' render={()=>(
        <ListBooks 
            books={books}
            sections={sectionIDs} 
            onUpdate={update}/>
      )}/>
      <Route exact path="/search" render={()=>(
        <SearchBooks 
            query={query}
            books={searchResults}
            update={update}
            search={search}/>
      )}/>
      )
    </div>
  )
}
export default App
