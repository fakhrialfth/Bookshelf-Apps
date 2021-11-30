window.addEventListener("load", function(){
    if (localStorage.getItem(localStorageKey) !== null) {    
        const booksData = getData()
        showData(booksData)
    }
})

btnSearch.addEventListener("click",function(e) {
    e.preventDefault()
    if (localStorage.getItem(localStorageKey) == null) {    
        return alert("Tidak ada data buku")
    }else{
        const getByTitle = getData().filter(a => a.title == searchValue.value.trim());
        if (getByTitle.length == 0) {
            const getByAuthor = getData().filter(a => a.author == searchValue.value.trim());
            if (getByAuthor.length == 0) {
                const getByYear = getData().filter(a => a.year == searchValue.value.trim());
                if (getByYear.length == 0) {
                    alert(`Tidak ditemukan data dengan kata kunci: ${searchValue.value}`)
                }else{
                    showSearchResult(getByYear);
                }
            }else{
                showSearchResult(getByAuthor);
            }
        }else{
            showSearchResult(getByTitle);
        }
    }

    searchValue.value = ''
})

btnSubmit.addEventListener("click", function() {
    if (btnSubmit.value == "") {
        checkInput = []

        title.classList.remove("error")
        author.classList.remove("error")
        year.classList.remove("error")

        errorTitle.classList.add("error-display")
        errorAuthor.classList.add("error-display")
        errorYear.classList.add("error-display")

        if (title.value == "") {
            checkTitle = false
        }else{
            checkTitle = true
        }

        if (author.value == "") {
            checkAuthor = false
        }else{
            checkAuthor = true
        }

        if (year.value == "") {
            checkYear = false
        }else{
            checkYear = true
        }

        checkInput.push(checkTitle,checkAuthor,checkYear)
        let resultCheck = validation(checkInput)

        if (resultCheck.includes(false)) {
            return false
        }else{
            const newBook = {
                id: +new Date(),
                title: title.value.trim(),
                author: author.value.trim(),
                year: year.value,
                isCompleted: readed.checked
            }
            insertData(newBook)

            title.value = ''
            author.value = ''
            year.value = ''
            readed.checked = false
        }    
    }else{
        const bookData = getData().filter(a => a.id != btnSubmit.value);
        localStorage.setItem(localStorageKey,JSON.stringify(bookData))

        const newBook = {
            id: btnSubmit.value,
            title: title.value.trim(),
            author: author.value.trim(),
            year: year.value,
            isCompleted: readed.checked
        }
        insertData(newBook)
        btnSubmit.innerHTML = "Masukkan Buku"
        btnSubmit.value = ''
        title.value = ''
        author.value = ''
        year.value = ''
        readed.checked = false
        alert("Buku berhasil diedit")
    }
})