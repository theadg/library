let myLibrary = [];
let valid = false;

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
const addBook = document.querySelector('#add-book');
const bookModal = document.querySelector('#book-modal');
const submitBtn = document.querySelector('#book-submit');
const bookContainer = document.querySelector('.book__container');

// inputs
const bookForm = document.querySelector('#book-form');
const bookTitle = document.querySelector('#book-title');
const bookAuthor = document.querySelector('#book-author');
const bookPages = document.querySelector('#book-pages');
const bookRead = document.querySelector('#book-read');
const userInputs = Array.from(document.querySelectorAll('input'));

// validation on input
bookTitle.oninput = () => validateInput(bookTitle, 'Book Title');
bookAuthor.oninput = () => validateInput(bookPages, 'Book Author');
bookPages.oninput = () => validateInput(bookTitle, 'Book Pages');

// validation
const validateInput = (inputField, inputName) => {
  if (inputField.validity.typeMismatch) {
    // inputField.setCustomValidity(`Please Enter a valid ${inputName}`);
    inputField.setAttribute('title', `Please Enter a valid ${inputName}`);
    valid = false;
  } else if (inputField.validity.tooShort) {
    inputField.setCustomValidity(
      `Insufficient characters Characters should be at least ${inputField.minLength}`
    );
    valid = false;
  } else if (inputField.validity.valueMissing) {
    inputField.setCustomValidity(`Input should be not empty`);
    valid = false;
  } else {
    inputField.setCustomValidity('');
    valid = true;
  }

  inputField.reportValidity();
};

const validateOnSubmit = (title, author, pages) => {
  validateInput(title, 'Book Title');
  validateInput(author, 'Author Name');
  validateInput(pages, 'Page Number');
};
//functions
const toggleModal = () => {
  bookModal.classList.toggle('show-modal');
};

addBook.onclick = () => toggleModal();

window.onclick = (e) => {
  if (e.target === bookModal) {
  }
};

window.onload = () => {
  createBookElement();
};

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
  } 
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
    const bookCard = document.createElement('article');
    bookCard.classList.add('book');
    const bookTitleC = document.createElement('h2');
    bookTitleC.classList.add('book__title');
    const bookAuthorC = document.createElement('h3');
    bookAuthorC.classList.add('book__author');
    const bookPagesC = document.createElement('p');
    bookPagesC.classList.add('book__pages');

    // creating buttons
    const bookButtons = document.createElement('div');
    bookButtons.classList.add('book__buttons');
    const readBookBtn = document.createElement('button');
    readBookBtn.classList.add('book__btn');
    const removeBookBtn = document.createElement('button');
    removeBookBtn.classList.add('book__btn');

    const setReadBookButton = () => {
      if (book.read) {
        readBookBtn.style.backgroundColor = '#c5f9d7';
        readBookBtn.textContent = ' Read';
      } else {
        readBookBtn.style.backgroundColor = '#ffa69e';
        readBookBtn.textContent = 'Not Read';
      }
    };

    bookButtons.appendChild(readBookBtn);
    setReadBookButton();

    removeBookBtn.textContent = 'Remove Book';
    bookButtons.appendChild(removeBookBtn);

    // edit button
    const editBookBtn = document.createElement('span');
    editBookBtn.classList.add('material-symbols-outlined');
    editBookBtn.textContent = 'edit';

    // save button
    const saveBookBtn = document.createElement('button');
    saveBookBtn.classList.add('book__btn');
    saveBookBtn.style.backgroundColor = '#c5f9d7';
    saveBookBtn.textContent = 'Save Book';

    // save button
    const cancelEditBookBtn = document.createElement('button');
    cancelEditBookBtn.classList.add('book__btn');
    cancelEditBookBtn.textContent = 'Cancel';

    // adding new text elements:
    const bookTitleEdit = document.createElement('input');
    bookTitleEdit.setAttribute('type', 'text');
    bookTitleEdit.placeholder = 'Title';
    bookTitleEdit.value = book.author;

    const bookAuthorEdit = document.createElement('input');
    bookAuthorEdit.setAttribute('type', 'text');
    bookAuthorEdit.placeholder = 'Author';
    bookAuthorEdit.value = book.title;

    const bookPagesEdit = document.createElement('input');
    bookPagesEdit.setAttribute('type', 'number');
    bookPagesEdit.placeholder = 'Pages';
    bookPagesEdit.value = book.pages;

    editBookBtn.onclick = () => {
      removeElements(1, 2);

      //container of new elements:
      const editComponents = [
        bookTitleEdit,
        bookAuthorEdit,
        bookPagesEdit,
        saveBookBtn,
        cancelEditBookBtn,
      ];

      //adding new buttons
      editComponents.forEach((component) => {
        component.required = 'true';
        component.classList.add('book__input', 'text--center');
        bookCard.appendChild(component);
      });
    };

    const removeElements = (start, end) => {
      const bookCardChildren = Array.from(bookCard.children);
      for (let i = start; i <= bookCard.childElementCount + end; i++) {
        bookCard.removeChild(bookCardChildren[i]);
        console.log(bookCardChildren[i]);
      }
    };

    const addDefaultComponents = () => {
      bookTitleC.textContent = book.author;
      bookAuthorC.textContent = book.title;
      bookPagesC.textContent = book.pages;
      bookCard.appendChild(editBookBtn);
      bookCard.appendChild(bookTitleC);
      bookCard.appendChild(bookAuthorC);
      bookCard.appendChild(bookPagesC);
      bookCard.appendChild(bookButtons);
    };

    saveBookBtn.onclick = () => {
      book.title = bookAuthorEdit.value;
      book.author = bookTitleEdit.value;
      book.pages = bookPagesEdit.value;

      removeElements(1, 3);
      addDefaultComponents();
    };

    cancelEditBookBtn.onclick = () => {
      removeElements(1, 3);
      addDefaultComponents();
    };
    // adding to element
    addDefaultComponents();
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
};
