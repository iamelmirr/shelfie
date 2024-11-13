"use strict"




const API_URL = 'https://www.googleapis.com/books/v1/volumes?q='

const API_KEY = "" 

export async function tabBooks(category) {
    
    
    const response = await fetch(`${API_URL}subject:${category}&maxResults=30&key=${API_KEY}`)
    
    

    const data = await response.json()

    let books = []

    if (data.items) {
        books = data.items.map(book => {
        return {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown author",
            image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "default-img.png",
            id: book.volumeInfo.id
        }
        
    })
    }

    console.log(books)
    return books
    
}




