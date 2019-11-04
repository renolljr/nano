
export interface imageLink {thumbnail: string}
export interface sectionID {id: string;title:string;}
export interface updateBook {
  onUpdate: (book:book, shelf:string) => void
}
export interface searchBook {
  search: (query:string) => void
}

export interface book { id: number, shelf: string, title: string,  authors: string[], imageLinks : imageLink}

export interface bookProps extends updateBook {
  book: book,
  shelf: string
}

export interface listBooksProps extends updateBook{
  books: books,
  sections: sectionID[]
}

export interface searchBooksProps extends searchBook{
  query: string,
  books: books,
  update: (book:book, shelf:string) => void
}

export type books = book[];
export type appState = { 
  books: books;
  query: string,
  searchResults: books,
  sectionIDs: sectionID[]
}
export type appProps = appState;