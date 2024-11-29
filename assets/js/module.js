"use strict"

export function attachBookEventListener(bookElements, booksList) {
  
    
    booksList.addEventListener("click", (event) => {
      if (event.target && event.target.matches('.card-media img')) {
       const bookElements = event.target.closest('.card')         
       const  bookId = bookElements.dataset.id
       window.location.href = `./book-details.html?id=${bookId}`}})

   }

export function attachSaveButtonListener(saveBtn, bookId) {
  saveBtn.addEventListener("click", () => {
    toggleSave(bookId, saveBtn);
    });
  }


export const isSaved = (bookId) => {
  const savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || []
  return savedBooks.includes(bookId)
}


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