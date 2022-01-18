
// Your Code Here
// Retrieve a list of books from the server
async function main () {
    let result = await fetch("http://127.0.0.1:3001/listBooks")
    let books = await result.json()

    // render the list of books with an input field and a submit button
    function renderBook (book) {
        // Create elements and attach them to dom
        let textInput = document.createElement("input")
        textInput.type = "text"
        textInput.value = book.quantity
        
        let inputButton = document.createElement("button")
        inputButton.innerText = "Save"
        // adds eventlistener to button to call sendData when clicked
        inputButton.addEventListener("click", (_) => {sendData(textInput, book)})

        let bookElement = document.createElement("span")
        bookElement.innerText = book.title

        let br = document.createElement("br")
        document.querySelector("#root").append(bookElement, textInput, inputButton, br)
    }

    // applies changes and sends patch request to server
    async function sendData (textInput, book) {
        let bookQuantity = parseInt(textInput.value)
        if (bookQuantity == book.quantity || isNaN(bookQuantity)) return
        let newData = {...book, ...{"quantity": bookQuantity}}
        let result = await fetch("http://127.0.0.1:3001/updateBook", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        }) 
    }

    books.map(renderBook)
}


main()
