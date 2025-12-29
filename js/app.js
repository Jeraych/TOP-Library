function Book (title, author, pages, read) {
  if (!new.target) {
    throw Error("use new keyword to construct object");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  let word = "";
  if (this.read) {
    word = "read";
  } else {
    word = "not read yet"
  }

  return this.title + " by " + this.author + ", " + this.pages + " pages, " + word;
}

const myLibrary = [];

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function deleteBookFromLibrary(id) {
  let book = myLibrary.find((book) => book.id === id);
  myLibrary.splice(myLibrary.indexOf(book), 1);
}

function readBook(id) {
  let book = myLibrary.find((book) => book.id === id);
  book.read = !book.read;
}

function displayBooks() {

  const bookList = document.getElementById("bookList");

  // Console logs
  if (myLibrary.length === 0) {
    console.log("=".repeat(28));
    console.log("|" + " ".repeat(5) + "Library is Empty" + " ".repeat(5) + "|");
    console.log("=".repeat(28));
    bookList.innerHTML = "";
    return;
  }

  const maxTitleLength = Math.max(
    ...myLibrary.map(book => book.title.length)
  );

  const outLayout = "=".repeat(maxTitleLength + 4);

  const inLayout = "|" + " ".repeat(maxTitleLength + 2) + "|"

  console.log(outLayout);
  console.log(inLayout);
  myLibrary.forEach(book => {
    const space = maxTitleLength - book.title.length;
    console.log("| " + " ".repeat(space/2) + book.title + " ".repeat(Math.round(space/2)) + " |");
    console.log(book.info());
  })
  console.log(inLayout);
  console.log(outLayout);


  // HTML

  bookList.innerHTML = "";

  myLibrary.forEach(book => {
    bookList.innerHTML += `
    <div class="book ${book.read ? "read" : "unread"}">
      <h3>${book.title}</h3>
      <p>${book.author}</p>
      <span>${book.pages} pages</span>
      <label>
        <input class="read-box" type="checkbox" data-id="${book.id}" ${book.read ? "checked" : ""}/>
        Read
      </label>
      <button class="delete-btn" data-id="${book.id}">Delete</button>
    </div>
  `;
  });
}

function showForm() {
  const form = document.getElementById("bookForm");
  form.hidden = false;
}

function hideForm() {
  const form = document.getElementById("bookForm");
  form.hidden = true;
}

function addBook(event) {
  event.preventDefault();
  const title = document.getElementById("titleInput").value;
  const author = document.getElementById("authorInput").value;
  const pages = document.getElementById("pagesInput").value;
  const read = document.getElementById("readInput").checked;
  addBookToLibrary(title, author, pages, read);
  hideForm();
  displayBooks();
}

const addBookBtn = document.getElementById("addBookBtn");
addBookBtn.addEventListener("click", showForm);

const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", addBook);

const bookList = document.getElementById("bookList");
bookList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("delete-btn")) return;

  const bookId = e.target.dataset.id;

  deleteBookFromLibrary(bookId);
  displayBooks();
})
bookList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("read-box")) return;

  const bookId = e.target.dataset.id;

  readBook(bookId);
  displayBooks();
})

addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt", 352, true);
addBookToLibrary("Clean Code", "Robert C. Martin", 464, false);
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("Dune", "Frank Herbert", 688, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Atomic Habits", "James Clear", 320, true);
addBookToLibrary("Neuromancer", "William Gibson", 271, false);
addBookToLibrary("Design Patterns", "Erich Gamma", 395, false);
addBookToLibrary("The Art of War", "Sun Tzu", 273, true);
addBookToLibrary("Deep Work", "Cal Newport", 304, false);

displayBooks();
