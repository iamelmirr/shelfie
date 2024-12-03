"use strict"

import { fetchBooksByIds } from "./api.js"
import { isSaved, toggleSave, createBookCard } from "./module.js"



document.addEventListener("DOMContentLoaded", async function savedBooks() {
    
    await displaySavedBooks()
    removeSavedBook()
})


async function displaySavedBooks() {

    const savedBooksContainer = document.querySelector(".saved-books-container")
    const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || []

    savedBooksContainer.innerHTML = ""

    const booksData = await fetchBooksByIds(savedBooks)


    booksData.forEach(book => {
        
        const bookCard = createBookCard(book.id, book.image, book.title, book.authors)

        savedBooksContainer.innerHTML += bookCard

        const xMark = document.createElement("span")
        xMark.classList.add("unsave-icon", "fa-solid",  "fa-circle-xmark")
        
        const bookElement = savedBooksContainer.lastElementChild

        bookElement.appendChild(xMark)

    })

    emptyPage ()
    
}




function removeSavedBook() {
    const unsaveBtns = document.querySelectorAll("[removesaved]")
    const unsaveIcon = document.querySelectorAll(".unsave-icon") 

    unsaveBtns.forEach(button => {
        button.addEventListener("click", (event) => {
            const bookCard = event.target.closest(".card")
            const bookId = bookCard.dataset.id
  
        toggleSave(bookId, button) 

        bookCard.remove()
        emptyPage ()
        
        })
    })


    unsaveIcon.forEach(icon => {
        icon.addEventListener("click", (event) => {
            const bookCard = event.target.closest(".card")
            const bookId = bookCard.dataset.id
  
        toggleSave(bookId, icon) 

        bookCard.remove()
        emptyPage ()
        
        })
    })

}

function emptyPage () {
    const savedBooksContainer = document.querySelector(".saved-books-container")
    const title = document.querySelector(".saved-books-title")
    const booksPageEmpty = savedBooksContainer.innerHTML === "" || savedBooksContainer.innerHTML.trim() === "" 

    if(booksPageEmpty == true) {
        title.innerHTML = "No saved books :("
    }
}