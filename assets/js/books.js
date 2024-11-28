

import { searchBooksFromInput } from "./api.js"
import { attachBookEventListener } from "./module.js";
import { searchCategoryFromUrl } from "./api.js";
import { isSaved } from "./module.js";
import { toggleSave } from "./module.js";


document.addEventListener("DOMContentLoaded", async () => {
  await getSearchTermFromUrl()
  loadFromLocalStorage()
  attachSaveButtonListeners()
})

const $noMoreBtn = document.querySelector("[no-more-btn]")
$noMoreBtn.style.display = "none"


let booksList = document.querySelector(".books-list")

const $loadMoreBtn = document.querySelector("[load-more-btn]")

const renderedBooks = new Set()

async function getSearchTermFromUrl () {
  const params = new URLSearchParams(window.location.search)

  const category = params.get("category")
  let searchTerm = params.get("search")
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

  if((!searchTerm || searchTerm.trim() === "") && (!category || category.trim() === "")) {
    searchTerm = "comedy"
  }

  console.log(category)
  console.log(searchTerm)
  
  if(category) {
      booksList.innerHTML = ``
      const books = await searchCategoryFromUrl(category)

      if (books.length > 20) {

        console.log(books.length)

        $loadMoreBtn.style.display = "flex"

      const firstBatch = books.slice(0, 20)  

      firstBatch.forEach((book) => {
        if(!renderedBooks.has(book.id)) {
          renderedBooks.add(book.id)
          const bookCard = `
          <div class="card" data-id="${book.id}">

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

                      <button class="icon-btn has-state removed" savebtn aria-label="Add to saved recipes">
                        ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                      </button>

                    </div>

                  </div>

                </div>
                    
          `
          
          booksList.innerHTML += bookCard
          const bookElement = booksList.lastElementChild
         attachBookEventListener(bookElement, booksList)
      }})

    
      $loadMoreBtn.onclick = () => {
 

        const remainingBooks = books.slice(20)
        remainingBooks.forEach((book) => {
          if(!renderedBooks.has(book.id)) {
            renderedBooks.add(book.id)
          const bookCard = `
          <div class="card" data-id="${book.id}">

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

                      <button class="icon-btn has-state removed" savebtn aria-label="Add to saved recipes">
                        ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                      </button>

                    </div>

                  </div>

                </div>
                    
          `
          
          booksList.innerHTML += bookCard
          const bookElement = booksList.lastElementChild
          attachBookEventListener(bookElement, booksList)
          
        }})
        $loadMoreBtn.style.display = "none"
          $noMoreBtn.style.display = "block"
          $loadMoreBtn.onclick = null
        }
    } else {
      books.forEach((book) => {
        if(!renderedBooks.has(book.id)) {
        renderedBooks.add(book.id)
        const bookCard = `
          <div class="card" data-id="${book.id}">

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

                      <button class="icon-btn has-state removed" savebtn aria-label="Add to saved recipes">
                        ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                      </button>

                    </div>

                  </div>

                </div>
                    
          `
          booksList.innerHTML += bookCard
          const bookElement = booksList.lastElementChild
          attachBookEventListener(bookElement, booksList)
        }})
    }
  
  } else if(searchTerm) {
      booksList.innerHTML = ``
      const books = await searchBooksFromInput(searchTerm, bookType, language, price, availability, rating)

      if (books.length > 20) {

        console.log(books.length)

        $loadMoreBtn.style.display = "flex"

      const firstBatch = books.slice(0, 20)  

      firstBatch.forEach((book) => {
        if(!renderedBooks.has(book.id)) {
          renderedBooks.add(book.id)
          const bookCard = `
          <div class="card" data-id="${book.id}">

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

                      <button class="icon-btn has-state removed" savebtn aria-label="Add to saved recipes">
                        ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                      </button>

                    </div>

                  </div>

                </div>
                    
          `
          
          booksList.innerHTML += bookCard
          const bookElement = booksList.lastElementChild
         attachBookEventListener(bookElement, booksList)
      }})

    
      $loadMoreBtn.onclick = () => {
 

        const remainingBooks = books.slice(20)
        remainingBooks.forEach((book) => {
          if(!renderedBooks.has(book.id)) {
            renderedBooks.add(book.id)
          const bookCard = `
          <div class="card" data-id="${book.id}">

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

                      <button class="icon-btn has-state removed" savebtn aria-label="Add to saved recipes">
                        ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                      </button>

                    </div>

                  </div>

                </div>
                    
          `
          
          booksList.innerHTML += bookCard
          const bookElement = booksList.lastElementChild
          attachBookEventListener(bookElement, booksList)
          
        }})
        $loadMoreBtn.style.display = "none"
          $noMoreBtn.style.display = "block"
          $loadMoreBtn.onclick = null
        }
    } else {
      books.forEach((book) => {
        if(!renderedBooks.has(book.id)) {
        renderedBooks.add(book.id)
        const bookCard = `
          <div class="card" data-id="${book.id}">

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

                      <button class="icon-btn has-state removed" savebtn aria-label="Add to saved recipes">
                        ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                      </button>

                    </div>

                  </div>

                </div>
                    
          `
          booksList.innerHTML += bookCard
          const bookElement = booksList.lastElementChild
          attachBookEventListener(bookElement, booksList)
        }})
    }
  }
}






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
      localStorage.removeItem("bookTypeFilter")

      } else {
      this.setAttribute("filter-clicked", true)
      bookTypeFilter = this.getAttribute("book-type-filter")
      
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
        
      }
    })

    if (isClicked) {
      this.setAttribute("filter-clicked", false)
      selectedLanguage = null
      localStorage.removeItem("selectedLanguage")
      
    } else {
      this.setAttribute("filter-clicked", true)
      selectedLanguage = this.getAttribute("lan-filter")
  
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

    localStorage.removeItem("booksAvailability")
  } else {
    $availabilityFilter.setAttribute("filter-clicked", true)

    booksAvailability = "available"

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
      }
    })

    if(isClicked) {
      this.setAttribute("filter-clicked", false)

      booksPrice = null
      localStorage.removeItem("booksPrice")
    } else {
      this.setAttribute("filter-clicked", true)

      booksPrice = this.getAttribute("price-filter")

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
      }
    })

    if(isClicked) {
      this.setAttribute("filter-clicked", false)

      chosenRating = null
      localStorage.removeItem("chosenRating")
    } else {
      this.setAttribute("filter-clicked", true)

      chosenRating = this.getAttribute("rating-filter")

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

  $booksSearch.value = ""
  chosenRating = null
  booksPrice = null
  booksAvailability = null
  selectedLanguage = null
  bookTypeFilter = null

  localStorage.removeItem("chosenRating")
  localStorage.removeItem("booksPrice")
  localStorage.removeItem("booksAvailability")
  localStorage.removeItem("selectedLanguage")
  localStorage.removeItem("bookTypeFilter")

  $applyFiltersBtn.click()
})




const $booksSearch = document.querySelector("[books-search]")
const $booksSearchValue = $booksSearch.value


$booksSearch.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    if ($booksSearch.value.trim('') === '') {
      alert("Please enter a valid value.")
    } else {

      $applyFiltersBtn.click()
     }}}
        )







const $applyFiltersBtn = document.querySelector("[apply-filters-btn]")



$applyFiltersBtn.addEventListener("click", applyFilters)


async function applyFilters() {
  const urlParams = new URLSearchParams(window.location.search)

  const searchTerm = new URLSearchParams(window.location.search).get("search")

  const categoryTerm = new URLSearchParams(window.location.search).get("category")

  


  if ($booksSearch.value.trim('') === '') {
    if(categoryTerm) {
      urlParams.set("category", categoryTerm)
    } else if (searchTerm) {
      urlParams.set("search", searchTerm) }
    } else {
    urlParams.delete("category")
    urlParams.set("search", $booksSearch.value)
  }

  if(localStorage.getItem("bookTypeFilter")) {
    const $bookFilterType = localStorage.getItem("bookTypeFilter")
    urlParams.set("bookType", $bookFilterType)

  } else if (bookTypeFilter) {
    urlParams.set("bookType", bookTypeFilter)
    localStorage.setItem("bookTypeFilter", bookTypeFilter)
  } else {
    urlParams.delete("bookType")
  }

  
  if(localStorage.getItem("selectedLanguage")) {
    const $selectedLanguage = localStorage.getItem("selectedLanguage")
    urlParams.set("language", $selectedLanguage)
  } else if (selectedLanguage) {
    urlParams.set("language", selectedLanguage)
    localStorage.setItem("selectedLanguage", selectedLanguage)
  } else {
    urlParams.delete("language")
  }


  if(localStorage.getItem("booksAvailability")) {
    const $booksAvailability = localStorage.getItem("booksAvailability")
    urlParams.set("availability", $booksAvailability)
  } else if(booksAvailability) {
    urlParams.set("availability", booksAvailability)
    localStorage.setItem("booksAvailability", "yes")
  }  else {
    urlParams.delete("availability")
  }
  
  
  if (localStorage.getItem("chosenRating")) {
    const $chosenRating = localStorage.getItem("chosenRating")
    urlParams.set("rating", $chosenRating)
  } else if (chosenRating) {
    urlParams.set("rating", chosenRating)
    localStorage.setItem("chosenRating", chosenRating)
  } else {
    urlParams.delete("rating")
  }


  if (localStorage.getItem("booksPrice")) {
    const $booksPrice = localStorage.getItem("booksPrice")
    urlParams.set("filter", $booksPrice)
  } else if (booksPrice) {
    urlParams.set("filter", booksPrice)
    localStorage.setItem("booksPrice", booksPrice)
  } else {
    urlParams.delete("filter")
  }

  const newUrl = `books.html?${urlParams.toString()}`


  window.location.href = newUrl
  
}


function loadFromLocalStorage() {

  const params = new URLSearchParams(window.location.search)

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

  if(!bookType) {
    localStorage.removeItem("bookTypeFilter")
  }

  if(!language) {
    localStorage.removeItem("selectedLanguage")
  }

  if(!availability) {
    localStorage.removeItem("booksAvailability")
  }

  if(!price) {
    localStorage.removeItem("booksPrice")
  }

  if(!rating) {
    localStorage.removeItem("chosenRating")
  }
  
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

function attachSaveButtonListeners() {
  const saveButtons = document.querySelectorAll("[savebtn]")

  saveButtons.forEach(saveBtn => {
    saveBtn.addEventListener("click", (event) => {
      console.log("clicked")
      const bookCard = event.target.closest(".card")
      const bookId = bookCard.dataset.id

      toggleSave(bookId, saveBtn)
    })
  })
}


console.log(localStorage)



  
