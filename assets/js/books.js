

import { searchBooksFromInput } from "./api.js"


document.addEventListener("DOMContentLoaded", plainBooksPage)
document.addEventListener("DOMContentLoaded", loadFromLocalStorage)



let booksList = document.querySelector(".books-list")

const $loadMoreBtn = document.querySelector("[load-more-btn]")


async function getSearchTermFromUrl () {
    const params = new URLSearchParams(window.location.search)

    const searchTerm = params.get("search")
    const bookType = params.get("bookType") || null
    const language = params.get("language") || null
    const availability = params.get("availability") || null
    const price = params.get("filter") || null
    let rating = params.get("rating")
    if(rating) {
      rating = decodeURIComponent(rating)
    } else {
      rating = null
    }

    

    if(searchTerm) {
        booksList.innerHTML = ``
        const books = await searchBooksFromInput(searchTerm, bookType, language, price, availability, rating)

        if (books.length > 20) {


          $loadMoreBtn.style.display = "flex"

        const firstBatch = books.slice(0, 20)  

        firstBatch.forEach(book => {
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


        $loadMoreBtn.addEventListener("click", () => {
          const remainingBooks = books.slice(20)
          remainingBooks.forEach((book) => {
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

          $loadMoreBtn.innerHTML = "No more books"

        })
      } else {
        books.forEach((book) => {
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
}

getSearchTermFromUrl()





const $filterOptions = document.querySelector(".filter-chip")

const $bookTypeFilter = document.querySelectorAll("[book-type-filter]")

let bookTypeFilter = null

$bookTypeFilter.forEach(filter => {
  filter.addEventListener("click", function () {
    const isClicked = this.getAttribute("filter-clicked") === "true"

    $bookTypeFilter.forEach(otherFilter => {
      if (otherFilter !== this) {
        otherFilter.setAttribute("filter-clicked", false)
        localStorage.removeItem("bookTypeFilter", otherFilter.getAttribute("book-type-filter"))
      }
    })
      
    if(isClicked) {
      this.setAttribute("filter-clicked", false)
      
      bookTypeFilter = null
      localStorage.removeItem("bookTypeFilter", this.getAttribute("book-type-filter"))

      } else {
      this.setAttribute("filter-clicked", true)
      bookTypeFilter = this.getAttribute("book-type-filter")
      localStorage.setItem("bookTypeFilter", this.getAttribute("book-type-filter"))
    }
    
    console.log(bookTypeFilter)
    console.log(localStorage)
    

  
})
})



const $languageFilters = document.querySelectorAll("[lan-filter]")

let selectedLanguage = null

$languageFilters.forEach(filter => {
  filter.addEventListener("click", function () {
    const isClicked = this.getAttribute("filter-clicked") === "true"

    $languageFilters.forEach(otherFilter => {
      if(otherFilter !== this) {
        otherFilter.setAttribute("filter-clicked", false)
        localStorage.removeItem("selectedLanguage", otherFilter.getAttribute("lan-filter"))
        
      }
    })

    if (isClicked) {
      this.setAttribute("filter-clicked", false)
      selectedLanguage = null
      localStorage.removeItem("selectedLanguage", this.getAttribute("lan-filter"))
      
    } else {
      this.setAttribute("filter-clicked", true)
      selectedLanguage = this.getAttribute("lan-filter")
      localStorage.setItem("selectedLanguage", this.getAttribute("lan-filter"))

      
    }

    console.log(selectedLanguage)
    console.log(localStorage)
  })
})

const $availabilityFilter = document.querySelector("[avail-filter]")

let booksAvailability = null

$availabilityFilter.addEventListener("click", () => {
  const isClicked = $availabilityFilter.getAttribute("filter-clicked") === "true"

  if(isClicked) {
    $availabilityFilter.setAttribute("filter-clicked", false)
    
    booksAvailability = null

    localStorage.removeItem("booksAvailability", $availabilityFilter.getAttribute("avail-filter"))
  } else {
    $availabilityFilter.setAttribute("filter-clicked", true)

    booksAvailability = "available"

    localStorage.setItem("booksAvailability", $availabilityFilter.getAttribute("avail-filter"))

  }
  console.log(booksAvailability)
  console.log(localStorage)
})




const $paidOrFree = document.querySelectorAll("[price-filter]")

let booksPrice = null

$paidOrFree.forEach(type => {
  type.addEventListener("click", function () {

    const isClicked = this.getAttribute("filter-clicked") === "true"

    $paidOrFree.forEach(otherTypes => {
      if(otherTypes !== this) {
        otherTypes.setAttribute("filter-clicked", false)
        localStorage.setItem("booksPrice", otherTypes.getAttribute("price-filter"))
      }
    })

    if(isClicked) {
      this.setAttribute("filter-clicked", false)

      booksPrice = null
      localStorage.removeItem("booksPrice", this.getAttribute("price-filter"))
    } else {
      this.setAttribute("filter-clicked", true)

      booksPrice = this.getAttribute("price-filter")
      localStorage.setItem("booksPrice", this.getAttribute("price-filter"))

    }
    
    console.log(booksPrice)
    console.log(localStorage)
  } )
})




const $ratingFilters = document.querySelectorAll("[rating-filter]")

let chosenRating = null


$ratingFilters.forEach(rating => {
  rating.addEventListener("click", function () {

    const isClicked = this.getAttribute("filter-clicked") === "true"

    $ratingFilters.forEach(otherFilter => {
      if (otherFilter !== this) {
        otherFilter.setAttribute("filter-clicked", false)
        localStorage.setItem("chosenRating", otherFilter.getAttribute("rating-filter"))
      }
    })

    if(isClicked) {
      this.setAttribute("filter-clicked", false)

      chosenRating = null
      localStorage.removeItem("chosenRating", this.getAttribute("rating-filter"))
    } else {
      this.setAttribute("filter-clicked", true)

      chosenRating = this.getAttribute("rating-filter")
      localStorage.setItem("chosenRating", this.getAttribute("rating-filter"))

    }
    console.log(chosenRating)
    console.log(localStorage)

  })
})




const $clearFiltersBtn = document.querySelector("[clear-filters-btn]")


$clearFiltersBtn.addEventListener("click", function () {
  const $allFilters = document.querySelectorAll("[filter-clicked]")

  $allFilters.forEach(filter => {
    filter.setAttribute("filter-clicked", false)
  })

  chosenRating = null
  booksPrice = null
  booksAvailability = null
  selectedLanguage = null
  bookTypeFilter = null

  $applyFiltersBtn.click()
})




const $booksSearch = document.querySelector("[books-search]")
const $booksSearchValue = $booksSearch.value


$booksSearch.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    if ($booksSearch.value.trim('') === '') {
      alert("Please enter a valid value.")
    } else {

      booksList.innerHTML = ``
        const books = await searchBooksFromInput($booksSearch.value)

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


        })}
  }
})




async function plainBooksPage() {
  let searchTerm = new URLSearchParams(window.location.search).get("search")
  
  if(!searchTerm || searchTerm.trim() === "") {
    searchTerm = "comedy"
  }

  const books = await searchBooksFromInput(searchTerm)

  if (books.length > 20) {


    $loadMoreBtn.style.display = "flex"

  const firstBatch = books.slice(0, 20)  

  firstBatch.forEach(book => {
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


  $loadMoreBtn.addEventListener("click", () => {
    const remainingBooks = books.slice(20)
    remainingBooks.forEach((book) => {
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

    $loadMoreBtn.innerHTML = "No more books"

  })
} else {
  books.forEach((book) => {
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
  })}}


const $applyFiltersBtn = document.querySelector("[apply-filters-btn]")



$applyFiltersBtn.addEventListener("click", applyFilters)


async function applyFilters() {
  const urlParams = new URLSearchParams(window.location.search)

  const searchTerm = new URLSearchParams(window.location.search).get("search")


  if ($booksSearch.value.trim('') === '') {
    urlParams.set("search", searchTerm)
  } else {
    urlParams.set("search", $booksSearch.value)
  }



  if (bookTypeFilter) {
    urlParams.set("bookType", bookTypeFilter)
  } else {
    urlParams.delete("bookType")
  }
  if (selectedLanguage) {
    urlParams.set("language", selectedLanguage)
  } else {
    urlParams.delete("language")
  }
  if (booksAvailability) {
    urlParams.set("availability", booksAvailability)
  } else {
    urlParams.delete("availability")
  }
  if (chosenRating) {
    urlParams.set("rating", chosenRating)
  } else {
    urlParams.delete("rating")
  }
  if (booksPrice) {
    urlParams.set("filter", booksPrice)
  } else {
    urlParams.delete("filter")
  }
  

  const newUrl = `books.html?${urlParams.toString()}`


  window.location.href = newUrl
}


function loadFromLocalStorage() {

  const savedBookTypeFilter = localStorage.getItem("bookTypeFilter")

  if(savedBookTypeFilter) {
    const bookFilter = document.querySelector(`[book-type-filter="${savedBookTypeFilter}"]`)

    if(bookFilter) {
      bookFilter.setAttribute("filter-clicked", true)
    }
  }

  const savedLanguageFilter = localStorage.getItem("selectedLanguage")

  if(savedLanguageFilter) {
    const languageFilter = document.querySelector(`[lan-filter="${savedLanguageFilter}"]`)

    if(languageFilter) {
      languageFilter.setAttribute("filter-clicked", true)
    }
  }

  const savedBooksAvailability = localStorage.getItem("booksAvailability")

  if(savedBooksAvailability) {
    const availabilityFilter = document.querySelector("[avail-filter]")

    availabilityFilter.setAttribute("filter-clicked", true)
  }

  const savedPriceFilter = localStorage.getItem("booksPrice")

  if(savedPriceFilter) {
    const priceFilter = document.querySelector(`[price-filter=${savedPriceFilter}]`) 

    if(priceFilter) {
      priceFilter.setAttribute("filter-clicked", true)
    }
  }

  const savedBooksRating = localStorage.getItem("chosenRating")
  
  if(savedBooksRating) {
    const chosenBooksRating = document.querySelector(`[rating-filter="${savedBooksRating}"]`)

    if(chosenBooksRating) {
      chosenBooksRating.setAttribute("filter-clicked", true)
    }
  }
}
