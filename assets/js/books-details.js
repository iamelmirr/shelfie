"use strict"

import { fetchBooksByUrlId } from "./api.js"
import { isSaved, toggleSave } from "./module.js"

document.addEventListener("DOMContentLoaded", fetchBookDetails)


async function fetchBookDetails () {
    const params = new URLSearchParams(window.location.search)
    const bookId = params.get("id")

    const book = await fetchBooksByUrlId(bookId)

    console.log(book)

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
            averageRating,
            previewLink
        } = book.volumeInfo 

        const isEbook = book.accessInfo.epub?.isAvailable ? "Yes" : "No"


        const pdfDownload = book.accessInfo.pdf.acsTokenLink




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
        

        function displayStars(rating) {
            const starsContainer = document.querySelector(".stars-span")
            const fullStars = Math.floor(rating)
            const halfStar = rating % 1 >= 0.5 ? 1 : 0
            const emptyStars = 5 - fullStars - halfStar

            starsContainer.innerHTML = '<i class="fa-solid fa-star" style="color: gold;"></i>'.repeat(fullStars) +
            (halfStar ? '<i class="fa-solid fa-star-half-alt" style="color: gold;"></i>' : '') +
            '<i class="fa-solid fa-star" style="color: rgb(221, 221, 221);"></i>'.repeat(emptyStars);
        }
        
        displayStars(averageRating || 0)

        function mapMaturityRating(rating) {
            switch(rating) {
                case "NOT_MATURE":
                    return "Not Mature"

                case "MATURE":
                    return "Mature"
                    
                default:
                    return "Unknown"    
            }
        }

        const languageMap = {
            en: "English",
            es: "Spanish",
            fr: "French",
            de: "German",
            it: "Italian",
            ja: "Japanese",
            zh: "Chinese",
            ru: "Russian",
            ar: "Arabic",
            hi: "Hindi",
            pt: "Portuguese"
        };
        



        document.querySelector(".detail-book-img").src = imageLinks?.thumbnail || "./assets/images/book-default.jpg"
        document.querySelector(".detail-book-img").alt = title || "No Image"
        document.querySelector(".detail-title-wrapper h2").textContent = title || "No Title"
        document.querySelector(".book-author").textContent =  authors ? authors.join(", ") : "Unknown Author"
        document.querySelector("#publisher").textContent = publisher || "Unknown Publisher"
        document.querySelector("#published-date").textContent = publishedDate || "Unknown Date"
        document.querySelector("#description-span").textContent = description ? stripHtmlTags(description) : "No Description Available"
        document.querySelector("[number-of-pages]").textContent = pageCount || "N/A"
        document.querySelector("[isebook]").textContent = isEbook
        document.querySelector("#lang-span").textContent = languageMap[language] || "Unknown"
        document.querySelector("#maturity-span").textContent = mapMaturityRating(maturityRating)
        document.querySelector("[reading-time]").textContent = `${Math.round(parseFloat(pageCount) / 40).toFixed(1)} hr`
        document.querySelector("[gb-link]").href = previewLink ? previewLink : "/"
        document.querySelector("[pdf-link]").href = pdfDownload ? pdfDownload : "/"
        
        if (categories && Array.isArray(categories) && categories.length > 0) {
            document.querySelector(".all-categories").innerHTML = beautifyCategories(categories);
            document.querySelector(".tags-container").innerHTML = categoriesForTags(categories);
        } else {
            document.querySelector(".all-categories").innerHTML = "No categories available";
            document.querySelector(".tags-container").innerHTML = `<div class="tag">No tags</div>`;
        }


        averageRating ?  averageRatinFunc(averageRating)  :  noAverageRating()


        const saveBtn = document.querySelector(".save-btn")
        if(isSaved(bookId)) {
            saveBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> <p>Remove</p>`
        } else {
            saveBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i> <p>Save</p>`
        }

        saveBtn.addEventListener("click", () => {
            toggleSave(bookId, saveBtn)

            if(isSaved(bookId)) {
                saveBtn.innerHTML = `<i class="fa-solid fa-bookmark"></i> <p>Remove</p>`
            } else {
                saveBtn.innerHTML = `<i class="fa-regular fa-bookmark"></i> <p>Save</p>`
            }
        })
        
        function stripHtmlTags(input) {
            return input.replace(/<\/?[^>]+(>|$)/g, "")
        }

        

        document.querySelector(".detail-skeleton").style.display = "none"
        document.querySelector(".detail-article").style.display = "flex"

    }
}


function averageRatinFunc(averageRatingss) {
    document.querySelector("[average-rating]").textContent = averageRatingss
}

function noAverageRating() {
    document.querySelector("[average-rating]").textContent = "Ratings not available"
            document.querySelector("[rating-rest]").style.display = "none"
}