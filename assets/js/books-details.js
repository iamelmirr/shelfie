import { fetchBooksByUrlId } from "./api.js"

document.addEventListener("DOMContentLoaded", fetchBookDetails)


async function fetchBookDetails () {
    const params = new URLSearchParams(window.location.search)
    const bookId = params.get("id")

    const book = await fetchBooksByUrlId(bookId)

    

    if (book && book.volumeInfo) {
        const {
            title,
            authors,
            publisher,
            publishedDate,
            description,
            pageCount,
            categories,
            maturityRating,
            language,
            imageLinks,
        } = book.volumeInfo 

        const isEbook = book.accessInfo.epub?.isAvailable ? "Yes" : "No"


        function beautifyCategories(allCategories) {
            return allCategories
                .map(category => category.replace(/\s*\/\s*/g, ": "))
                .map(category => `<span id="catgrs-span">${category}</span>`)
                .join("");
        }

        function categoriesForTags(allCategories) {
            const newCategories = allCategories
                .map(category => category.replace(/\s*\/\s*/g, ": "))
                .map(category => {
                    const indexOfSplit = category.lastIndexOf(":")
                    return indexOfSplit !== -1 ? category.slice(indexOfSplit + 1).trim() : category
                })
                
                
            const limitCategories = newCategories.length > 4 ? newCategories.slice(0, 4) : newCategories

            const htmlTags = limitCategories
                .map(category => `<div class="tag">${category}</div>`)
                .join("")


            return htmlTags
            }
        



        document.querySelector(".detail-book-img").src = imageLinks?.thumbnail || "./assets/images/book-default.jpg"
        document.querySelector(".detail-book-img").alt = title || "No Image"
        document.querySelector(".detail-title-wrapper h2").textContent = title || "No Title"
        document.querySelector(".book-author").textContent =  authors ? authors.join(", ") : "Unknown Author"
        document.querySelector("#publisher").textContent = publisher || "Unknown Publisher"
        document.querySelector("#published-date").textContent = publishedDate || "Unknown Date"
        document.querySelector("#description-span").textContent = description || "No Descriptiopn Available"
        document.querySelector("[number-of-pages]").textContent = pageCount || "N/A"
        document.querySelector("[isebook]").textContent = isEbook
        document.querySelector("#lang-span").textContent = language || "Unknown"
        document.querySelector("#maturity-span").textContent = maturityRating || "N/A"
        document.querySelector("[reading-time]").textContent = `${Math.round(parseFloat(pageCount) / 40).toFixed(1)} hr`
        document.querySelector(".all-categories").innerHTML = beautifyCategories(categories) || "Unknown"
        document.querySelector(".tags-container").innerHTML = categoriesForTags(categories)

    }
}
