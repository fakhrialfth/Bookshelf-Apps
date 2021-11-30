const title = document.querySelector("#inputBookTitle")
const errorTitle = document.querySelector("#errorTitle")
const sectionTitle = document.querySelector("#sectionTitle")

const author = document.querySelector("#inputBookAuthor")
const errorAuthor = document.querySelector("#errorAuthor")
const sectionAuthor = document.querySelector("#sectionAuthor")

const year = document.querySelector("#inputBookYear")
const errorYear = document.querySelector("#errorYear")
const sectionYear = document.querySelector("#sectionYear")

const readed = document.querySelector("#inputBookIsComplete")

const btnSubmit = document.querySelector("#bookSubmit")

const searchValue = document.querySelector("#searchBookTitle")
const btnSearch = document.querySelector("#searchSubmit")

function showSearchResult(books) {
    const searchResult = document.querySelector("#searchResult")

    searchResult.innerHTML = ''

    books.forEach(book => {
        let el = `
        <article class="book_item">
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <p>${book.isCompleted ? 'Selesai dibaca' : 'Belum selesai dibaca'}</p>
        </article>
        `

        searchResult.innerHTML += el
    });
}

function readedBook(id) {
    let confirmation = confirm("Pindahkan ke selesai dibaca?")

    if (confirmation == true) {
        const bookDataDetail = getData().filter(a => a.id == id);
        const newBook = {
            id: bookDataDetail[0].id,
            title: bookDataDetail[0].title,
            author: bookDataDetail[0].author,
            year: bookDataDetail[0].year,
            isCompleted: true
        }

        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey,JSON.stringify(bookData))

        insertData(newBook)
    }else{
        return 0
    }
}

function unreadedBook(id) {
    let confirmation = confirm("Pindahkan ke belum selesai dibaca?")

    if (confirmation == true) {
        const bookDataDetail = getData().filter(a => a.id == id);
        const newBook = {
            id: bookDataDetail[0].id,
            title: bookDataDetail[0].title,
            author: bookDataDetail[0].author,
            year: bookDataDetail[0].year,
            isCompleted: false
        }

        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey,JSON.stringify(bookData))

        insertData(newBook)
    }else{
        return 0
    }
}

function editBook(id) {
    const bookDataDetail = getData().filter(a => a.id == id);
    title.value = bookDataDetail[0].title
    author.value = bookDataDetail[0].author
    year.value = bookDataDetail[0].year
    bookDataDetail[0].isCompleted ? readed.checked = true:readed.checked = false

    btnSubmit.innerHTML = "Edit buku"
    btnSubmit.value = bookDataDetail[0].id
}

function deleteBook(id) {
    let confirmation = confirm("Yakin akan menghapusnya?")

    if (confirmation == true) {
        const bookDataDetail = getData().filter(a => a.id == id);
        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey,JSON.stringify(bookData))
        showData(getData())
        alert(`Buku ${bookDataDetail[0].title} telah terhapus`)
    }else{
        return 0
    }
}