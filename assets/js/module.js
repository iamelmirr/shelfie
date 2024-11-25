export function attachBookEventListener(bookElements, booksList) {
  
    
    booksList.addEventListener("click", (event) => {
      if (event.target && event.target.matches('.card-media img')) {
       const bookElements = event.target.closest('.card')         
       const  bookId = bookElements.dataset.id
       window.location.href = `./book-details.html?id=${bookId}`}})

   }