"use strict"

import { searchBooks } from './api.js'
 
const $tabBtns = document.querySelectorAll("[data-tab-btn]")
const $tabPanels = document.querySelectorAll("[data-panel]")
const $searchBtn = document.querySelector(".search-btn")

// document.addEventListener("DOMContentLoaded", loadTabs)
// document.addEventListener("DOMContentLoaded", latestReleases)
document.addEventListener("DOMContentLoaded", topRatedBooks)

async function loadTabs (){

    $tabPanels.forEach(async (panel) => {
    const tabCategory = panel.getAttribute("category")

    panel.innerHTML = ''

    const books = await searchBooks(tabCategory)

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
        panel.innerHTML += bookCard
    })
})
}


$tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        $tabBtns.forEach((btn) => {
            btn.classList.remove("active")
        })

        btn.classList.add("active")

        $tabPanels.forEach((panel) => {
            panel.style.display = "none"

        })

        const panelId = btn.getAttribute("id")

        const activePanel = document.querySelector(`[data-panel="${panelId}"]`)

        activePanel.style.display = "grid"
    })
})


import { latestReleasesBooks } from './api.js'

const latestReleasesSlider = document.querySelector('.latest-slider')


async function latestReleases() {
  const books = await latestReleasesBooks()

  

  books.forEach(book => {
    const bookCard = 
    `
    <li class="slider-item">
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
                  </li>
        `

        latestReleasesSlider.innerHTML += bookCard

  })
}

const ratingsSlider = document.querySelector('.ratings-slider')


import { chooseTopBooks } from './api.js'

async function topRatedBooks() {
  const books = await chooseTopBooks()

  books.forEach(book => {
    const bookCard = `
      <li class="slider-item">
        <div class="card">

                    <figure class="card-media img-holder">
                      <img src="${book.image}" loading="lazy" alt="Book name"
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
                  </li>
    `
    ratingsSlider.innerHTML += bookCard

  })
}

$searchBtn.addEventListener("click", handleSearch)


function handleSearch () {
  const searchInput = document.getElementById("search-input")

  if (searchInput.value.trim('') === '') {
    alert("Please enter a valid value")
    searchInput.value = ""
  } else {
    
    const searchTerm = searchInput.value.trim()

    searchInput.value = ""


    window.location.href = `./books.html?search=${encodeURIComponent(searchTerm)}`
  }
}


console.log(localStorage)