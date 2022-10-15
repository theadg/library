let myLibrary = [];

// constructor
const Book = {
  init: function (author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    return this;
  },
  showInfo: function () {
    console.log(this);
  },
};

function addBookToLibrary() {}

const book1 = Object.create(Book).init(
  "Smarter Faster Better",
  "Charles Duhigg",
  "190 pages",
  "True"
);

myLibrary.push(book1);
console.log(myLibrary);
// book1.showInfo();
