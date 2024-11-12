"use strict"

import { tabBooks } from './api.js'
 
const $tabBtns = document.querySelectorAll("[data-tab-btn]")
const $tabPanels = document.querySelectorAll("[data-panel]")

document.addEventListener("DOMContentLoaded", loadTabs)

async function loadTabs (){

    $tabPanels.forEach(async (panel) => {
    const tabCategory = panel.getAttribute("category")

    panel.innerHTML = ''

    const books = await tabBooks(tabCategory)

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

        activePanel.style.display = "block"
    })
})


