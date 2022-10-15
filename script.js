let myLibrary = [];

// constructor
const Book = {
  init: function (author, title, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    return this;
  },
  setRead: function () {
    this.read = !this.read;
  },
  setRemove: function () {
    this.remove();
  },
};

// containers
const addBook = document.querySelector("#add-book");
const bookModal = document.querySelector("#book-modal");
const submitBtn = document.querySelector("#book-submit");
const bookContainer = document.querySelector(".book__container");
// inputs
const bookForm = document.querySelector("#book-form");
const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const bookPages = document.querySelector("#book-pages");
const bookRead = document.querySelector("#book-read");
const userInputs = Array.from(document.querySelectorAll("input"));

//functions
const toggleModal = () => {
  bookModal.classList.toggle("show-modal");
};

addBook.onclick = () => toggleModal();

window.onclick = (e) => {
  if (e.target === bookModal) {
    // toggleModal();
  }
};
window.onload = () => {
  createBookElement();
};
myLibrary.push(Object.create(Book).init("1", "De Guzman", 79, false));
myLibrary.push(Object.create(Book).init("2", "De Guzman", 79, false));
myLibrary.push(Object.create(Book).init("3", "De Guzman", 79, false));
myLibrary.push(Object.create(Book).init("4", "De Guzman", 79, false));

bookForm.onsubmit = (e) => {
  myLibrary.push(
    Object.create(Book).init(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      bookRead.checked
    )
  );
  toggleModal();
  clearForm();
  createBookElement();
  e.preventDefault();
};

const clearForm = () => {
  userInputs.forEach((input) => {
    input.value = null;
    input.checked = false;
  });
};

function createBookElement() {
  if (myLibrary) {
  }
  myLibrary.forEach((book, index) => {
    // creating elements
    if (book.set) {
      return;
    }
    const bookCard = document.createElement("article");
    bookCard.classList.add("book");
    const bookTitleC = document.createElement("h2");
    bookTitleC.classList.add("book__title");
    const bookAuthorC = document.createElement("h3");
    bookAuthorC.classList.add("book__author");
    const bookPagesC = document.createElement("p");
    bookPagesC.classList.add("book__pages");

    // creating buttons
    const bookButtons = document.createElement("div");
    bookButtons.classList.add("book__buttons");
    const readBookBtn = document.createElement("button");
    readBookBtn.classList.add("book__btn");
    const removeBookBtn = document.createElement("button");
    removeBookBtn.classList.add("book__btn");

    const setReadBookButton = () => {
      if (book.read) {
        readBookBtn.style.backgroundColor = "#c5f9d7";
        readBookBtn.textContent = " Read";
      } else {
        readBookBtn.style.backgroundColor = "#ffa69e";
        readBookBtn.textContent = "Not Read";
      }
    };

    bookButtons.appendChild(readBookBtn);
    setReadBookButton();

    removeBookBtn.textContent = "Remove Book";
    bookButtons.appendChild(removeBookBtn);

    //adding text
    bookTitleC.textContent = book.author;
    bookAuthorC.textContent = book.title;
    bookPagesC.textContent = book.pages;

    // adding to element
    bookCard.appendChild(bookTitleC);
    bookCard.appendChild(bookAuthorC);
    bookCard.appendChild(bookPagesC);
    bookCard.appendChild(bookButtons);

    bookContainer.appendChild(bookCard);
    book.set = true;

    readBookBtn.onclick = () => {
      book.setRead();
      setReadBookButton();
    };

    removeBookBtn.onclick = () => {
      bookCard.remove();
      removeBook(index);
    };
  });
}

const removeBook = (index) => {
  myLibrary.splice(index, 1);
  console.log(`REMOVED AT INDEX: ${index}`);

  // bookContainer.remove(bookContainer.children[index]);
};
