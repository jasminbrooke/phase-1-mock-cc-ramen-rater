document.addEventListener("DOMContentLoaded", () => {
    getRamen()
    showDetail(1)
    const form = document.getElementById("new-ramen")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        newRamen()
        form.reset()
    })
})

const getRamen = () => {
    fetch(`http://localhost:3000/ramens`)
    .then(res => res.json())
    .then(data => {
        data.forEach(ramen => {
            const menu = document.getElementById("ramen-menu")
            const ramenImage = document.createElement("img")
            ramenImage.setAttribute("src", ramen.image)
            ramenImage.setAttribute("id", ramen.id)
            menu.appendChild(ramenImage)
            ramenImage.addEventListener("click",() => {
                showDetail(ramen.id)
            })
        })
    })
}

const showDetail = (id) => {
    const imageDisplay = document.getElementsByClassName("detail-image")[0]
    const nameDisplay = document.getElementsByClassName("name")[0]
    const restaurantDisplay = document.getElementsByClassName("restaurant")[0]
    const ratingDisplay = document.getElementById("rating-display")
    const commentDisplay = document.getElementById("comment-display")

    fetch(`http://localhost:3000/ramens/${id}`)
    .then(res => res.json())
    .then(data => {
        imageDisplay.setAttribute("src", data.image)
        nameDisplay.innerText = data.name
        restaurantDisplay.innerText = data.restaurant
        ratingDisplay.innerText = data.rating
        commentDisplay.innerText = data.comment
    })
}

const newRamen = () => {
    const name = document.getElementById("new-name").value
    const restaurant = document.getElementById("new-restaurant").value
    const image = document.getElementById("new-image").value
    const rating = document.getElementById("new-rating").value
    const comment = document.getElementById("new-comment").value
    const newRamenObj = { name, restaurant, image, rating, comment }

    fetch(`http://localhost:3000/ramens/`, {
        headers: { "content-type": "application/json"},
        method: "POST",
        body: JSON.stringify(newRamenObj)
    })
    .then(() => clearRamen())
    .then(() => getRamen())
}

const clearRamen = () => {
    const menu = document.getElementById("ramen-menu")
    while(menu.firstChild) {
        menu.removeChild(menu.firstChild)
    }
}
