import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import SearchBooks from "./SearchBooks"
import ListBooks from './ListBooks'
import { appProps,appState, books, book } from './types'

class App extends React.Component<appProps, appState> {
  state:appState = {
    books: [],
    query:"",
    searchResults:[],
    sectionIDs:[{id:"currentlyReading", title:"Currently Reading"},
                {id:"wantToRead", title:"Want to Read"},
                {id:"read", title:"Read"}],
  }

  //invoke componentDidMount() to perform ajax request 
  componentDidMount(){
    this.loadBooks();
  }

  loadBooks = () => {
    BooksAPI.getAll().then((books)=> {
      this.setState({books})
    });
  }

  clearSearchQuery = () => {
    this.setState({ query: '' })
  }

  updateSearchQuery = (query:string) => {
    this.setState({ query: query ? query : '' })
  }

  search = (query:string) => {
    const searchLimit:number = 100;
    this.updateSearchQuery(query);
    let searchCriteria = query && query.length > 1;
    if(searchCriteria){
      let cabinet = this.state.books;
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
            this.setState({searchResults})
          }else{
            this.setState({searchResults:[]})
          }
        }
      });
    }
    else{
      this.setState({searchResults:[]})
    }
  };

  update = (book:book,shelf:string) =>{
    BooksAPI.update(book,shelf).then(()=>{
      this.loadBooks();
      this.search(this.props.query);
    })
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <ListBooks 
              books={this.state.books}
              sections={this.state.sectionIDs} 
              onUpdate={this.update}/>
        )}/>
        <Route exact path="/search" render={(history)=>(
          <SearchBooks 
              query={this.state.query}
              books={this.state.searchResults}
              update={this.update}
              search={this.search}/>
        )}/>
        )
      </div>
    )
  }
}
export default App
