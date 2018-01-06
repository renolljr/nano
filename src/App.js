import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import SearchBooks from "./SearchBooks"
import ListBooks from './ListBooks'

class App extends React.Component {
  state = {
    books:[],
    query:"",
    searchResults:[],
    sectionIDs:[{id:"currentlyReading", title:"Currently Reading"},
                {id:"wantToRead", title:"Want to Read"},
                {id:"read", title:"Read"}],
  }

  loadBooks = () => {
    BooksAPI.getAll().then((books)=> {
      this.setState({books})
    });
  }

  clearSearchQuery = () => {
    this.setState({ query: '' })
  }

  updateSearchQuery = (query) => {
    this.setState({ query: query ? query : '' })
  }
  //invoke componentDidMount() to perform ajax request 
  componentDidMount(){
    this.loadBooks();
  }

  search = (query) => {
    const maxResults = 100;
    this.updateSearchQuery(query);
    if(query && query.length > 1){
      let cabinet = this.state.books;
      BooksAPI.search(query,maxResults).then((results)=>{
        if(results && results.length>1){
          let searchResults = results.map(function(result){
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

  update = (book,shelf) =>{
    BooksAPI.update(book,shelf).then(()=>{
      this.loadBooks();
      this.search(this.props.query);
    })
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <ListBooks books={this.state.books} sections={this.state.sectionIDs} onUpdate={this.update}/>
        )}/>
        <Route exact path="/search" render={(history)=>(
          <SearchBooks query={this.state.query} books={this.state.searchResults} update={this.update} search={this.search}/>
        )}/>
        )
      </div>
    )
  }
}
export default App
