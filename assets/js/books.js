

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





const $filterOptions = document.querySelector(".filter-chip")

const $bookTypeFilter = document.querySelectorAll("[book-type-filter]")

let bookTypeFilter = null

$bookTypeFilter.forEach(filter => {
  filter.addEventListener("click", function () {
    const isClicked = this.getAttribute("filter-clicked") === "true"

    $bookTypeFilter.forEach(otherFilter => {
      if (otherFilter !== this) {
        otherFilter.setAttribute("filter-clicked", false)
      }
    })
      
    if(isClicked) {
      this.setAttribute("filter-clicked", false)
      
      bookTypeFilter = null

      } else {
      this.setAttribute("filter-clicked", true)
      bookTypeFilter = this.getAttribute("book-type-filter")
    }
    
    console.log(bookTypeFilter)

  
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
        
      }
    })

    if (isClicked) {
      this.setAttribute("filter-clicked", false)
      selectedLanguage = null
      
    } else {
      this.setAttribute("filter-clicked", true)
      selectedLanguage = this.getAttribute("lan-filter")

      console.log(selectedLanguage)
    }
  })
})

const $availabilityFilter = document.querySelector("[avail-filter]")

let booksAvailability = null

$availabilityFilter.addEventListener("click", () => {
  const isClicked = $availabilityFilter.getAttribute("filter-clicked") === "true"

  if(isClicked) {
    $availabilityFilter.setAttribute("filter-clicked", false)
    
    booksAvailability = null
  } else {
    $availabilityFilter.setAttribute("filter-clicked", true)

    booksAvailability = "available"

    console.log(booksAvailability)
  }
})




const $printTypes = document.querySelectorAll("[print-filter]")

let printType = null

$printTypes.forEach(type => {
  type.addEventListener("click", function () {

    const isClicked = this.getAttribute("filter-clicked") === "true"

    $printTypes.forEach(otherTypes => {
      if(otherTypes !== this) {
        otherTypes.setAttribute("filter-clicked", false)
      }
    })

    if(isClicked) {
      this.setAttribute("filter-clicked", false)

      printType = null
    } else {
      this.setAttribute("filter-clicked", true)

      printType = this.getAttribute("print-filter")

      console.log(printType)
    }

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
      }
    })

    if(isClicked) {
      this.setAttribute("filter-clicked", false)

      chosenRating = null
    } else {
      this.setAttribute("filter-clicked", true)

      chosenRating = this.getAttribute("rating-filter")

      console.log(chosenRating)
    }

  })
})




const $clearFiltersBtn = document.querySelector("[clear-filters-btn]")


$clearFiltersBtn.addEventListener("click", function () {
  const $allFilters = document.querySelectorAll("[filter-clicked]")

  $allFilters.forEach(filter => {
    filter.setAttribute("filter-clicked", false)
  })

  chosenRating = null
  printType = null
  booksAvailability = null
  selectedLanguage = null
  bookTypeFilter = null
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




const $applyFiltersBtn = document.querySelector("[apply-filters-btn]")