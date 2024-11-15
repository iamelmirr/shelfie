"use strict"


import { API_KEY } from "./config.js"

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='


export async function searchBooksFromInput(query, bookType, language, price, availability, rating) {

    const fetchUrl = `${API_URL}${query}` + 
        (bookType === "books" ? `&printType=books` : bookType === "ebook" ? `&filter=ebook` : "") + 
        (language ? `&langRestrict=${language}` : "") + 
        (price ? `$filter=${price}` : "")
    
    
    const response = await fetch(`${fetchUrl}&maxResults=40&key=${API_KEY}`)
    
    

    const data = await response.json()

    let books = []

    if (data.items) {
        books = data.items.map(book => ({
        
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown author",
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
            id: book.volumeInfo.id,
            averageRating: book.volumeInfo.averageRating || 0,
            isAvailable: book.saleInfo.saleability === "FOR_SALE" || book.saleInfo.saleability === "FREE"
        
        
    }))

    if(availability === "yes") {
        books = books.filter(book => book.isAvailable)
    }

    if(rating) {
        const minRating = parseFloat(rating)
        books = books.filter(book => book.averageRating >= minRating)
    }


    }

    return books
    
}








export async function searchBooks(query) {
    
    
    const response = await fetch(`${API_URL}subject:${query}&maxResults=30&key=${API_KEY}`)
    
    

    const data = await response.json()

    let books = []

    if (data.items) {
        books = data.items.map(book => {
        return {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown author",
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
            id: book.volumeInfo.id
        }
        
    })
    }

    return books
    
}







export async function tabBooks(category) {
    
    
    const response = await fetch(`${API_URL}subject:${category}&maxResults=30&key=${API_KEY}`)
    
    

    const data = await response.json()

    let books = []

    if (data.items) {
        books = data.items.map(book => {
        return {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown author",
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
            id: book.volumeInfo.id
        }
        
    })
    }

    return books
    
}


export async function latestReleasesBooks() {
    
    const response = await fetch(`${API_URL}best&maxResults=10&key=${API_KEY}`)

    const data = await response.json()

    let books = []

    if (data.items) {
        books = data.items.map(book => {
            return {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown author",
                image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
                id: book.volumeInfo.id 
            }
        })
    }

    return books
    
}



const authors = [
    "J.K.+Rowling", "George+R.R.+Martin", "Stephen+King", "Agatha+Christie",
    "Jane+Austen", "Haruki+Murakami", "Isaac+Asimov", "Mark+Twain",
    "Ernest+Hemingway", "F.+Scott+Fitzgerald"
  ]


async function fetchBooksByAuthor(author) {

    const url = `${API_URL}${author}&maxResults=10&key=${API_KEY}`

    const response = await fetch(url)
    const data = await response.json()


    if(data.items) {
        return data.items.map(book => ({
            
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown author",
                image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "./assets/images/book-default.jpg",
                averageRating: book.volumeInfo.averageRating || 0,
                id: book.volumeInfo.id 
            })
        )
    }

    return []
    
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


