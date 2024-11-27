"use strict"

import { fetchBooksByIds } from "./api.js"
import { isSaved } from "./module.js"
import { toggleSave } from "./module.js"


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
        const bookCard = `
            <div class="card" data-id="${book.id}">
                  <span class="unsave-icon fa-solid fa-circle-xmark"></span>  
                  <figure class="card-media img-holder">
                    <img src="${book.image}" width="200" height="200" loading="lazy" alt="Book name"
                      class="img-cover">
                  </figure>

                  <div class="card-body">

                    <h3 class="title-small">
                      <a href="./book-details.html?id=${book.id}" class="card-link">${book.title}</a>
                    </h3>

                    <div class="meta-wrapper">

                      <div class="meta-item">
                        <span class="fa-solid fa-pen"></span>

                        <span class="label-medium">${book.authors}</span>
                      </div>
                        <button class="icon-btn has-state removed" removesaved savebtn aria-label="Add to saved books">
                          ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                        </button>
                        

                    </div>

                  </div>

                  

                </div>
        `
        savedBooksContainer.innerHTML += bookCard
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