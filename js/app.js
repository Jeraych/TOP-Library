function Book (title, author, pages, read) {
  if (!new.target) {
    throw Error("use new keyword to construct object");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
