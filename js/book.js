// Toggole Spinner For clicking on button
const spinner = (style, isHide) => {
   const spin = document.getElementById('spinner');
   if (isHide) {
      spin.classList.remove(style)
   }
   else if (!isHide) {
      spin.classList.add(style)
   }
}

// Toggole display for search
const displayContainer = isHide => {
   const container = document.getElementById('book-container');
   if (isHide) {
      container.innerHTML = '';
   }
}

// Search Book when click on the search btn with API
const searchBook = () => {
   const searchText = document.getElementById('search-field').value;
   const url = `https://openlibrary.org/search.json?q=${searchText}`;
   if (searchText === '') {
      document.getElementById('messege').innerText = 'Please Insert a Book Name';
      displayContainer(true);
      spinner('visually-hidden', false)
   }
   else {
      fetch(url)
         .then(res => res.json())
         .then(data => displayBook(data.docs));
      document.getElementById('search-field').value = '';
      spinner('visually-hidden', true);
      displayContainer(true);
   }
}

// Display search Result
const displayBook = data => {
   console.log(data)
   if (data.length === 0) {
      document.getElementById('messege').innerText = 'No Result Found';
      spinner('visually-hidden', false)
   }
   else {
      const bookContainer = document.getElementById('book-container');
      const messege = document.getElementById('messege');
      messege.innerHTML = `Found <span id="found-book" class="text-success">0</span> books after
      search.`
      const foundBook = document.getElementById('found-book');
      foundBook.innerText = data.length;
      data.forEach(book => {
         const div = document.createElement('div');
         div.classList.add('col');
         div.innerHTML = `
            <div class="card h-100">
               <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
               <div class="card-body">
                  <h4 class="card-title">Book Name: ${book.title}</h4>
                  <h6 class="card-title">Author Name: ${book.author_name}</h6>
                  <p class="card-text">First Published in ${book.first_publish_year}</p>
               </div>
            </div>
    `;
         bookContainer.appendChild(div);
      });
      spinner('visually-hidden', false)
   }
}