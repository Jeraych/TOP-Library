function Book (title, author, pages, read) {
  if (!new.target) {
    throw Error("use new keyword to construct object");
  }
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
  this.info = function() {
    return this.title + " by " + this.author + ", " + this.pages + " pages, " + word;
  }
}
