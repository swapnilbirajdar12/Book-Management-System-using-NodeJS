async function fetchBooks() {
    try {
      const response = await fetch('/books');
      const books = await response.json();
  
      const booksTableBody = document.querySelector('#booksTable tbody');
      booksTableBody.innerHTML = '';
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      books.forEach((book) => {
        const row = `<tr>
          <td>${book.id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
          <td>${book.publication_year}</td>
          <td>
            <button onclick="editBook(${book.id})" class="edit">Edit</button>
            <button onclick="deleteBook(${book.id})" class="delete">Delete</button>
          </td>
        </tr>`;
        booksTableBody.innerHTML += row;
      });
    } catch (error) {
      console.error(error);
      displayPopup('Error fetching books. Please try again.');
    }
  }
  
  async function addBook() {
    try {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const genre = document.getElementById('genre').value;
      const publicationYear = document.getElementById('publicationYear').value;
  
      const response = await fetch('/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, genre, publication_year: publicationYear }),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result);
  
      changeFormToAdd();
      fetchBooks();
    } catch (error) {
      console.error(error);
      displayPopup('Error adding book. Please try again.');
    }
  }
  
  async function searchBookById() {
    try {
      const searchId = document.getElementById('searchId').value;
  
      const response = await fetch(`/books/${searchId}`);
      const book = await response.json();
  
      const booksTableBody = document.querySelector('#booksTable tbody');
      booksTableBody.innerHTML = '';
  
      if (book.id) {
        const row = `<tr>
          <td>${book.id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
          <td>${book.publication_year}</td>
          <td>
          <button onclick="editBook(${book.id})" class="edit">Edit</button>
          <button onclick="deleteBook(${book.id})" class="delete">Delete</button>
          </td>
        </tr>`;
        booksTableBody.innerHTML = row;
      } else {
        booksTableBody.innerHTML = '<tr><td colspan="6">Book not found</td></tr>';
      }
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      displayPopup('Error searching for the book. Please try again.');
    }
  }
  
  async function editBook(bookId) {
    const book = await fetchBookById(bookId);
  
    const addBookHeading = document.getElementById('addBookHeading');
    addBookHeading.textContent = 'Update Book';
  
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('genre').value = book.genre;
    document.getElementById('publicationYear').value = book.publication_year;
  
    const addBookForm = document.getElementById('addBookForm');
    addBookForm.style.display = 'block';
  
    const addButton = document.querySelector('#addBookForm button');
    addButton.innerText = 'Update Book';
    addButton.onclick = () => updateBook(bookId);
  }
  
  async function updateBook(bookId) {
    try {
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const genre = document.getElementById('genre').value;
      const publicationYear = document.getElementById('publicationYear').value;
  
      const response = await fetch(`/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, genre, publication_year: publicationYear }),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result);
  
      fetchBooks();
      changeFormToAdd();
    } catch (error) {
      console.error(error);
      displayPopup('Error editing book. Please try again.');
    }
  }
  
  async function changeFormToAdd() {
    const addBookHeading = document.getElementById('addBookHeading');
    addBookHeading.textContent = 'Add New Book';
  
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('publicationYear').value = '';
  
    const addBookForm = document.getElementById('addBookForm');
    addBookForm.style.display = 'block';
  
    const addButton = document.querySelector('#addBookForm button');
    addButton.innerText = 'Add Book';
    addButton.onclick = () => addBook();
  }
  
  async function fetchBookById(bookId) {
    const response = await fetch(`/books/${bookId}`);
    const book = await response.json();
    return book;
  }
  
  async function deleteBook(bookId) {
    try {
      const response = await fetch(`/books/${bookId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result);
  
      fetchBooks();
    } catch (error) {
      console.error(error);
      displayPopup('Error deleting book. Please try again.');
    }
  }
  
  function displayPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;
    document.body.appendChild(popup);
  
    setTimeout(() => {
      popup.remove();
    }, 3000);
  }
  
  document.addEventListener('DOMContentLoaded', fetchBooks);
  