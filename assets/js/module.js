"use strict"


export function createBookCard(bookId, bookImage, bookTitle, bookAuthors) {
const bookCard = `
<div class="card" data-id="${bookId}">
                   
                  <figure class="card-media img-holder">
                    <img src="${bookImage}" width="200" height="200" loading="lazy" alt="Book name"
                      class="img-cover">
                  </figure>

                  <div class="card-body">

                    <h3 class="title-small">
                      <a href="./book-details.html?id=${bookId}" class="card-link">${bookTitle}</a>
                    </h3>

                    <div class="meta-wrapper">

                      <div class="meta-item">
                        <span class="fa-solid fa-pen"></span>

                        <span class="label-medium">${bookAuthors}</span>
                      </div>
                        <button class="icon-btn has-state removed" removesaved savebtn aria-label="Add to saved books">
                          ${isSaved(bookId) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                        </button>
                        

                    </div>

                  </div>

                  

                </div>`

  return bookCard                
}  



// Function attaching event listner to the book image and redirecting to the book-details page with the book id

export function attachBookEventListener(bookElements, booksList) {
  
    
    booksList.addEventListener("click", (event) => {
      if (event.target && event.target.matches('.card-media img')) {
       const bookElements = event.target.closest('.card')         
       const  bookId = bookElements.dataset.id
       window.location.href = `./book-details.html?id=${bookId}`}})

   }




// Defining variable/function isSaved that checks if the book is added to the savedBooks array in the local storage, return true or false

export const isSaved = (bookId) => {
  const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || []
  return savedBooks.includes(bookId)
}



// Function that toggles the save and unsave button. Removes the book from the savedBooks if saved and adds it to savedBooks if not saved. Changes saveBtn icon.

export function toggleSave(bookId, saveBtn) {
  
  let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || []

  const existingBook = savedBooks.find(book => book.id === bookId)

  if (savedBooks.includes(bookId)) {
  
    savedBooks = savedBooks.filter(id => id !== bookId);
    saveBtn.innerHTML = '<span class="fa-regular fa-bookmark"></span>';
    showPopupMessage("Book removed.")
  } else {
    
    savedBooks.push(bookId);
    saveBtn.innerHTML = '<span class="fa-solid fa-bookmark"></span>';
    showPopupMessage("Book saved.")
  }
  
  localStorage.setItem("savedBooks", JSON.stringify(savedBooks))
  console.log(savedBooks)
}


// Attaching the save button listener, toggling the books saved/not saved

export function attachSaveButtonListener(saveBtn, bookId) {
  saveBtn.addEventListener("click", () => {
    toggleSave(bookId, saveBtn);
    });
  }



// Showing the popup message when book is saved or removed from saved books.

function showPopupMessage(message) {
  const popup = document.getElementById("popup-notification");
  popup.textContent = message;
  popup.classList.remove("hidden");
  popup.classList.add("show");

  
  setTimeout(() => {
    popup.classList.remove("show");
    popup.classList.add("hidden");
  }, 3000);
}