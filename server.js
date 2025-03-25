const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/assets/data/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/books', (req, res) => {
  const books = router.db.get('books').value();
  console.log(books);
  let filteredBooks = books;

  if (req.query.title) {
    const title = req.query.title.toLowerCase();
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(title)
    );
  }

  if (req.query.author) {
    const authors = Array.isArray(req.query.author) ? req.query.author : [req.query.author];
    filteredBooks = filteredBooks.filter(book =>
      authors.includes(book.author)
    );
  }

  if (req.query.language) {
    const languages = Array.isArray(req.query.language) ? req.query.language : [req.query.language];
    filteredBooks = filteredBooks.filter(book =>
      languages.includes(book.language)
    );
  }

  if (req.query.genre) {
    filteredBooks = filteredBooks.filter(book =>
      book.genre === req.query.genre
    );
  }

  if (req.query.minPages) {
    filteredBooks = filteredBooks.filter(book =>
      book.pages >= parseInt(req.query.minPages, 10)
    );
  }
  if (req.query.maxPages) {
    filteredBooks = filteredBooks.filter(book =>
      book.pages <= parseInt(req.query.maxPages, 10)
    );
  }

  if (req.query._sort && req.query._order) {
    filteredBooks = filteredBooks.sort((a, b) => {
      if (req.query._order === 'asc') {
        return a[req.query._sort] > b[req.query._sort] ? 1 : -1;
      } else {
        return a[req.query._sort] < b[req.query._sort] ? 1 : -1;
      }
    });
  }

  res.json(filteredBooks);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server запущен на http://localhost:3000');
});
