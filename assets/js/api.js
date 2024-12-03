"use strict"




const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='
const API_URL_ID_FETCH = 'https://www.googleapis.com/books/v1/volumes/'
const API_KEY = window.NETLIFY_GOOGLE_BOOKS_API_KEY



export async function searchCategoryFromUrl(category) {



    const fetchUrl = `${API_URL}subject:${category}`

    const response = await fetch(`${fetchUrl}&maxResults=40&key=${API_KEY}`)

    const data = await response.json()

    let books = []

    if (data.items) {
        books = data.items.map(book => {
            const authors = book.volumeInfo.authors
                ? book.volumeInfo.authors.map(name => {
                    const nameParts = name.split(' ');
                    const initial = nameParts[0].charAt(0).toUpperCase() + '.';
                    const lastName = nameParts.slice(1).join(' ');
                    return `${initial} ${lastName}`;
                }).join(', ') 
                : "Unknown author";

            return {
                id: book.id,
                title: book.volumeInfo.title,
                authors: authors,
                image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
                averageRating: book.volumeInfo.averageRating || 0,
                isAvailable: book.saleInfo.saleability === "FOR_SALE" || book.saleInfo.saleability === "FREE",
            };
        });
    }

    return books
    
}

export async function searchBooksFromInput(query, bookType, language, price, availability, rating) {

    const fetchUrl = `${API_URL}${query}` + 
        (bookType === "books" ? `&printType=books` : bookType === "ebook" ? `&filter=ebook` : "") + 
        (language ? `&langRestrict=${language}` : "") + 
        (price ? `$filter=${price}` : "");
    
    const response = await fetch(`${fetchUrl}&maxResults=40&key=${API_KEY}`);
    const data = await response.json();

    let books = [];

    if (data.items) {
        books = data.items.map(book => {
            const authors = book.volumeInfo.authors
                ? book.volumeInfo.authors.map(name => {
                    const nameParts = name.split(' ');
                    
                    const initial = nameParts[0].charAt(0).toUpperCase() + '.';
                    const lastName = nameParts.slice(1).join(' ');
                    return `${initial} ${lastName}`;
                }).join(', ') 
                : "Unknown author";

            return {
                id: book.id,
                title: book.volumeInfo.title,
                authors: authors,
                image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
                averageRating: book.volumeInfo.averageRating || 0,
                isAvailable: book.saleInfo.saleability === "FOR_SALE" || book.saleInfo.saleability === "FREE",
            };
        });

        
        if (availability === "yes") {
            books = books.filter(book => book.isAvailable);
        }

        
        if (rating) {
            const minRating = parseFloat(rating);
            books = books.filter(book => book.averageRating >= minRating);
        }
    }

    return books;
}









export async function searchBooks(query) {

    console.log('API Key:', window.NETLIFY_GOOGLE_BOOKS_API_KEY);
    
    
    const response = await fetch(`${API_URL}subject:${query}&orderBy=relevance&maxResults=17&key=${API_KEY}`)
    
    

    const data = await response.json()

    let books = []

    if (data.items) {
        books = data.items.map(book => {
            const authors = book.volumeInfo.authors
                ? book.volumeInfo.authors.map(name => {
                    const nameParts = name.split(' ');
                    const initial = nameParts[0].charAt(0).toUpperCase() + '.';
                    const lastName = nameParts.slice(1).join(' ');
                    return `${initial} ${lastName}`;
                }).join(', ') 
                : "Unknown author";

            return {
                id: book.id,
                title: book.volumeInfo.title,
                authors: authors,
                image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
            };
        });
    }

    return books;
}







export async function tabBooks(category) {

    console.log('API Key:', window.NETLIFY_GOOGLE_BOOKS_API_KEY);
    
    
    const response = await fetch(`${API_URL}subject:${category}&maxResults=30&key=${API_KEY}`)
    
    

    const data = await response.json()

    let books = []

    if (data.items) {
        books = data.items.map(book => {
            const authors = book.volumeInfo.authors
                ? book.volumeInfo.authors.map(name => {
                    const nameParts = name.split(' ');
                    
                    const initial = nameParts[0].charAt(0).toUpperCase() + '.';
                    const lastName = nameParts.slice(1).join(' ');
                    return `${initial} ${lastName}`;
                }).join(', ') 
                : "Unknown author";

            return {
                id: book.id,
                title: book.volumeInfo.title,
                authors: authors,
                image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
            };
        });
    }

    return books;
}


export async function latestReleasesBooks() {
    
    const response = await fetch(`${API_URL}subject:general&orderBy=newest&maxResults=10&key=${API_KEY}`)

    const data = await response.json()

    let books = []

    if (data.items) {
        books = data.items.map(book => {
            const authors = book.volumeInfo.authors
                ? book.volumeInfo.authors.map(name => {
                    const nameParts = name.split(' ');
                    
                    const initial = nameParts[0].charAt(0).toUpperCase() + '.';
                    const lastName = nameParts.slice(1).join(' ');
                    return `${initial} ${lastName}`;
                }).join(', ') 
                : "Unknown author";

            return {
                id: book.id,
                title: book.volumeInfo.title,
                authors: authors,
                image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
            };
        });
    }

    return books;
}



const authors = [
    "J.K.+Rowling", "George+R.R.+Martin", "Stephen+King", "Agatha+Christie",
    "Jane+Austen", "Haruki+Murakami", "Isaac+Asimov", "Mark+Twain",
    "Ernest+Hemingway", "F.+Scott+Fitzgerald"
  ]


  async function fetchBooksByAuthor(author) {
    const url = `${API_URL}${author}&maxResults=10&key=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
        return data.items.map(book => {
            const authors = book.volumeInfo.authors
                ? book.volumeInfo.authors.map(name => {
                    const nameParts = name.split(' ');
                    const initial = nameParts[0].charAt(0).toUpperCase() + '.';
                    const lastName = nameParts.slice(1).join(' ');
                    return `${initial} ${lastName}`;
                }).join(', ') 
                : "Unknown author";

            return {
                id: book.id,
                title: book.volumeInfo.title,
                authors: authors,
                image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
                averageRating: book.volumeInfo.averageRating || 0,
            };
        });
    }

    return [];
}


export async function chooseTopBooks() {
    const allBooks = []

    for (let author of authors) {
        const books = await fetchBooksByAuthor(author)
        allBooks.push(...books)
    }
    
    const sortedBooks = allBooks.sort((a, b) => b.averageRating - a.averageRating)

    const top10Books = sortedBooks.slice(0,10)

    return top10Books
}


export async function fetchBooksByUrlId(bookId) {

    const url = `${API_URL_ID_FETCH}${bookId}&key=${API_KEY}`

    const response = await fetch(url)

    const data = await response.json()
    
    return data
    
}




export async function fetchBooksByIds(bookIds) {

    const fetchBooks = bookIds.map(id =>
        fetch(`${API_URL_ID_FETCH}${id}&key=${API_KEY}`).then(response => response.json())
    )

    const booksData = await Promise.all(fetchBooks)

    return booksData.map(data => {
        const authors = data.volumeInfo.authors
            ? data.volumeInfo.authors.map(name => {
                const nameParts = name.split(' ');
                
                const initial = nameParts[0].charAt(0).toUpperCase() + '.';
                const lastName = nameParts.slice(1).join(' ');
                return `${initial} ${lastName}`;
            }).join(', ') 
            : "Unknown author";

        return {
            id: data.id,
            title: data.volumeInfo.title,
            authors: authors,
            image: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
        };
    });
}