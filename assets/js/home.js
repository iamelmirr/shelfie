"use strict"

import { searchBooks } from "./api.js"

import { attachBookEventListener } from "./module.js"

import { isSaved } from "./module.js"

import { toggleSave } from "./module.js"

import { attachSaveButtonListener } from "./module.js"
 
const $tabBtns = document.querySelectorAll("[data-tab-btn]")
const $tabPanels = document.querySelectorAll("[data-panel]")
const $searchBtn = document.querySelector(".search-btn")
const $categoryBtns = document.querySelectorAll("[data-category]")

document.addEventListener("DOMContentLoaded", async () => {
  loadTabs()
  latestReleases()
  await topRatedBooks()
  attachSaveButtonListeners()
})


async function loadTabs (){

    $tabPanels.forEach(async (panel) => {
    const tabCategory = panel.getAttribute("category")

    

    const books = await searchBooks(tabCategory)

    panel.innerHTML = ''

    books.forEach(book => {
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

                        <button class="icon-btn has-state     removed" savebtn aria-label="Add to saved books">
                          ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                        </button>

                    </div>

                  </div>

                </div>
                  
        `
        panel.innerHTML += bookCard

        
          const bookElement = panel.lastElementChild;
          attachBookEventListener(bookElement, panel);


    })
    const skeletonCard = `
    <div category="${panel.getAttribute("category")}" class="skeleton-card">
              <p>Show More</p> <span class="fa-solid fa-chevron-right"></span>
            </div></div>
    `
    panel.innerHTML += skeletonCard

    const skeletonUrl = panel.querySelector(".skeleton-card")

    skeletonUrl.addEventListener("click", () => {
      window.location.href = `./books.html?category=${panel.getAttribute("category")}`
    })
})
}


function attachSaveButtonListeners() {
  const saveButtons = document.querySelectorAll("[savebtn]")

  saveButtons.forEach(saveBtn => {
    saveBtn.addEventListener("click", (event) => {
      const bookCard = event.target.closest(".card")
      const bookId = bookCard.dataset.id

      toggleSave(bookId, saveBtn)
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

  latestReleasesSlider.innerHTML = ``

  books.forEach(book => {
    const bookCard = 
    `
    <li class="slider-item">
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

                        <button class="icon-btn has-state     removed" savebtn aria-label="Add to saved books">
                          ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                        </button>

                    </div>

                  </div>

                </div>
                </li>
        `

        latestReleasesSlider.innerHTML += bookCard
        const bookElement = latestReleasesSlider.lastElementChild
        attachBookEventListener(bookElement, latestReleasesSlider)

  })

  const skeletonCard = `
  <li class="slider-item skeleton-item">
                <div class="skeleton-card">
                  <p>Show More</p> <span class="fa-solid fa-chevron-right"></span>
                </div>
              </li>
  `
  latestReleasesSlider.innerHTML += skeletonCard

  const skeletonUrl = latestReleasesSlider.querySelector(".skeleton-item")

  skeletonUrl.addEventListener("click", () => {
    window.location.href = `./books.html?search=comedy`
  })

}

const ratingsSlider = document.querySelector('.ratings-slider')


import { chooseTopBooks } from './api.js'

async function topRatedBooks() {
  const books = await chooseTopBooks()

  ratingsSlider.innerHTML = ``

  books.forEach(book => {
    const bookCard = `
      <li class="slider-item">
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

                        <button class="icon-btn has-state     removed" savebtn aria-label="Add to saved books">
                          ${isSaved(book.id) ? `<span class="fa-solid fa-bookmark"></span>` : `<span class="fa-regular fa-bookmark"></span>` }
                        </button>

                    </div>

                  </div>

                </div>
                </li>
    `
    ratingsSlider.innerHTML += bookCard
    const bookElement = ratingsSlider.lastElementChild
    attachBookEventListener(bookElement, ratingsSlider)

  })

  const skeletonCard = `
  <li class="slider-item skeleton-item">
                <div class="skeleton-card">
                  <p>Show More</p> <span class="fa-solid fa-chevron-right"></span>
                </div>
              </li>
  `
  ratingsSlider.innerHTML += skeletonCard

  const skeletonUrl = ratingsSlider.querySelector(".skeleton-item")

  skeletonUrl.addEventListener("click", () => {
    window.location.href = `./books.html?search=comedy&orderBy=newest`
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


$categoryBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    const category = this.innerHTML
    this.href = `./books.html?category=${encodeURIComponent(category)}`
  })
})

console.log(localStorage)