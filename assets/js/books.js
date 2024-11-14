

import { searchBooksFromInput } from "./api.js"





let booksList = document.querySelector(".books-list")


async function getSearchTermFromUrl () {
    const params = new URLSearchParams(window.location.search)
    const results = params.get("search")

    console.log(results)

    if(results) {
        booksList.innerHTML = ``
        const books = await searchBooksFromInput(results)

        books.forEach(book => {
            const bookCard = `
            <div class="card">
    
                        <figure class="card-media img-holder">
                          <img src="${book.image}" width="200" height="200" loading="lazy" alt="Book name"
                            class="img-cover">
                        </figure>
      
                        <div class="card-body">
      
                          <h3 class="title-small">
                            <a href="./detail.html" class="card-link">${book.title}</a>
                          </h3>
      
                          <div class="meta-wrapper">
      
                            <div class="meta-item">
                              <i></i>
      
                              <span class="label-medium">${book.authors}</span>
                            </div>
      
                            <button class="icon-btn has-state removed" aria-label="Add to saved recipes">
                              <i></i>
      
                              <i></i>
                            </button>
      
                          </div>
      
                        </div>
      
                      </div>
                      
            `
            booksList.innerHTML += bookCard
        })
    }
}

getSearchTermFromUrl()

