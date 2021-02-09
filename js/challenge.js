$counter = document.getElementById("counter")
$pageButtons = document.querySelectorAll("button")
$likeList = document.querySelector("ul")
$commentForm = document.getElementById("comment-form")

$pageButtons.forEach( button => {
    button.addEventListener( "click" , handleButton )
})

function handleButton(button) {
    const buttonType = button.target.id

    if ( buttonType === "minus" ) {
        decrementCounter()
    } else if ( buttonType === "plus" ) {
        incrementCounter()
    } else if ( buttonType === "pause" ) {
        pauseCounter(button)
    } else if ( buttonType === "resume" ) {
        resumeCounter(button)
    } else if ( buttonType === "heart" ) {
        updateLikeCounter()
    }

}

const decrementCounter = () => $counter.innerText = +$counter.innerText - 1
const incrementCounter = () => $counter.innerText = +$counter.innerText + 1
let incrementer = setInterval( incrementCounter, 1000 )

function pauseCounter(button){
    clearInterval(incrementer)
    button.target.innerText = "resume"
    button.target.id = "resume"

    $pageButtons.forEach( pageButton => {
        if ( pageButton.id !== button.target.id ){
            pageButton.disabled = true
        }
    })
}

function resumeCounter(button){
    setInterval( incrementCounter, 1000 )
    button.target.innerText = "pause"
    button.target.id = "pause"

    $pageButtons.forEach( pageButton => pageButton.disabled = false )
}

function updateLikeCounter(){
    const allLikes = [...document.querySelectorAll("li")]
    const $likeComment = allLikes.find( like => like.value == counter.innerText )

    if ( $likeComment ) {
        incrementLikeCounter($likeComment)
    } else { 
        createLikeComment()
    }
}

function createLikeComment() {
    $li = document.createElement("li")
    $li.value = counter.innerText

    $span = document.createElement("span")
    $span.innerText = "1 time"

    $li.textContent = `${$counter.innerText} has been liked `
    $li.appendChild($span)
    $likeList.appendChild($li)
}

function incrementLikeCounter(likeComment){
    const $likeCounter = likeComment.querySelector("span")
    let currentLikes = $likeCounter.innerText.split(" ")[0]
    
    updatedLikes = parseInt(currentLikes) + 1
    $likeCounter.innerText = `${updatedLikes} times`
}

$commentForm = document.getElementById("comment-form")
$commentForm.addEventListener( "submit" , handleComment )

function handleComment(event){
    event.preventDefault()

    commentFormData = new FormData(event.target)
    comment = commentFormData.get("comment")
    addComment(comment)
}

function addComment(comment){
    $commentList = document.getElementById("list")
    $p = document.createElement("p")

    $p.textContent = comment
    $commentList.appendChild($p)
}