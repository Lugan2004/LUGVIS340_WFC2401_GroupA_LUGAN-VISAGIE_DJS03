// bookList.js
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

export const bookList = {
  page: 1,
  matches: books,

  renderBookPreview({ author, id, image, title }) {
    const element = document.createElement('button');
    element.classList.add('preview');
    element.setAttribute('data-preview', id);
    element.innerHTML = `
      <img class="preview__image" src="${image}" />
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;
    return element;
  },

  renderBooks() {
    const start = (this.page - 1) * BOOKS_PER_PAGE;
    const end = start + BOOKS_PER_PAGE;
    const fragment = document.createDocumentFragment();

    this.matches.slice(start, end).forEach((book) => {
      const preview = this.renderBookPreview(book);
      fragment.appendChild(preview);
    });

    document.querySelector('[data-list-items]').appendChild(fragment);
  },

  renderDropdown(data, selector, defaultOption) {
    const fragment = document.createDocumentFragment();

    if (defaultOption) {
      const element = document.createElement('option');
      element.value = 'any';
      element.textContent = defaultOption;
      fragment.appendChild(element);
    }

    Object.entries(data).forEach(([id, name]) => {
      const element = document.createElement('option');
      element.value = id;
      element.textContent = name;
      fragment.appendChild(element);
    });

    document.querySelector(selector).appendChild(fragment);
  },

  filterBooks(filters) {
    this.matches = books.filter((book) => {
      const genreMatch =
        filters.genre === 'any' || book.genres.includes(filters.genre);
      const titleMatch =
        filters.title.trim() === '' ||
        book.title.toLowerCase().includes(filters.title.toLowerCase());
      const authorMatch =
        filters.author === 'any' || book.author === filters.author;
      return genreMatch && titleMatch && authorMatch;
    });
    this.page = 1;
    this.renderBooks();
    this.updateListButton();
  },

  updateListButton() {
    const remainingBooks = this.matches.length - this.page * BOOKS_PER_PAGE;
    const buttonElement = document.querySelector('[data-list-button]');
    buttonElement.disabled = remainingBooks < 1;
    buttonElement.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
  },

  showMoreBooks() {
    this.page += 1;
    this.renderBooks();
    this.updateListButton();
  },

  init() {
    this.renderBooks();
    this.renderDropdown(genres, '[data-search-genres]', 'All Genres');
    this.renderDropdown(authors, '[data-search-authors]', 'All Authors');
    this.updateListButton();
  },
};
