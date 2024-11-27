export function attachBookEventListener(bookElements, booksList) {
  
    
    booksList.addEventListener("click", (event) => {
      if (event.target && event.target.matches('.card-media img')) {
       const bookElements = event.target.closest('.card')         
       const  bookId = bookElements.dataset.id
       window.location.href = `./book-details.html?id=${bookId}`}})

   }


export const isSaved = (bookId) => {
  return localStorage.getItem(bookId) !== null
}


export function toggleSave(bookId, bookTitle, button) {
  let savedBooks = JSON.parse(localStorage.getItem("savedBooks")) || []

  const bookIndex = savedBooks.findIndex(book => book.id === bookId)

  if(bookIndex === -1) {
    const book = { id: bookId, title: bookTitle}
    savedBooks.push(book)
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks))

    button.innerHTML = '<span class="fa-solid fa-bookmark"></span>'
  } else {
    savedBooks.splice(bookIndex, 1) 
    localStorage.setItem("savedBooks", JSON.stringify(savedBooks))

    button.innerHTML = '<span class="fa-regular fa-bookmark"></span>'
  }
}