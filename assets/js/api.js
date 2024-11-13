"use strict"


import { API_KEY } from "./config.js"

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='


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