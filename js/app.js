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

function displayBooks() {

  if (myLibrary.length === 0) {
    console.log("=".repeat(28));
    console.log("|" + " ".repeat(5) + "Library is Empty" + " ".repeat(5) + "|");
    console.log("=".repeat(28));
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
    console.log("| " + book.title + " |");
  })
  console.log(inLayout);
  console.log(outLayout);
}

// addBookToLibrary("The Pragmatic Programmer", "Andrew Hunt", 352, true);
// addBookToLibrary("Clean Code", "Robert C. Martin", 464, false);
// addBookToLibrary("1984", "George Orwell", 328, true);
// addBookToLibrary("Dune", "Frank Herbert", 688, false);
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
// addBookToLibrary("Atomic Habits", "James Clear", 320, true);
// addBookToLibrary("Neuromancer", "William Gibson", 271, false);
// addBookToLibrary("Design Patterns", "Erich Gamma", 395, false);
// addBookToLibrary("The Art of War", "Sun Tzu", 273, true);
// addBookToLibrary("Deep Work", "Cal Newport", 304, false);

displayBooks();
