// Constants

const mainSection = document.getElementById("main-section");
const formSection = document.getElementById("form-section");
const addBookmarkBtn = document.getElementById("add-bookmark-button");
const addBookmarkBtnForm = document.getElementById("add-bookmark-button-form");

const categoryDropdown = document.getElementById("category-dropdown");
const closeFormBtn = document.getElementById("close-form-button");
const bookmarkListSection = document.getElementById("bookmark-list-section");
const viewCategoryBtn = document.getElementById("view-category-button");
const closeListBtn = document.getElementById("close-list-button");
const deleteBookmarkBtn = document.getElementById("delete-bookmark-button");

// Functions
function getBookmarks() {
  try {
    const storedBookmarks = localStorage.getItem("bookmarks");
    const bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
    if (
      Array.isArray(bookmarks) &&
      bookmarks.every((item) => item.name && item.category && item.url)
    ) {
      return bookmarks;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

function displayOrCloseForm() {
  mainSection.classList.toggle("hidden");
  formSection.classList.toggle("hidden");
}

function displayOrHideCategory() {
  mainSection.classList.toggle("hidden");
  bookmarkListSection.classList.toggle("hidden");
}

function displayBookmarks(bookmarks) {
  let htmlStr = ``;
  bookmarks.forEach((bookmark) => {
    const {name, category, url} = bookmark;
    if (category == categoryDropdown.value) {
      htmlStr += `
        <input type="radio" id="${name}" value="${name}" name="${category}" />
        <label for="${name}"><a href="${url}" target="_blank">${name}</a></label>
      `;
    }
  });

  document.getElementById("category-list").innerHTML = htmlStr !== `` ? htmlStr : `<p>No Bookmarks Found</p>`;
}

// Event Listeners

addBookmarkBtn.addEventListener("click", () => {
  document.querySelector('#form-section .category-name').innerText = categoryDropdown.value;
  displayOrCloseForm();
});

addBookmarkBtnForm.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const category = categoryDropdown.value;
  const url = document.getElementById("url").value;
  const bookmarks = getBookmarks();
  
  bookmarks.push({name, category, url});
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  document.getElementById("name").value = '';
  document.getElementById("url").value = '';
  displayOrCloseForm();
});

closeFormBtn.addEventListener("click", () => {
  displayOrCloseForm();
});

viewCategoryBtn.addEventListener("click", () => {
  document.querySelector("#bookmark-list-section .category-name").innerText = categoryDropdown.value;
  displayOrHideCategory();
  displayBookmarks(getBookmarks());
  
});

closeListBtn.addEventListener("click", () => {
  displayOrHideCategory();
});

deleteBookmarkBtn.addEventListener("click", () => {
  const checkedRadioBtnId = document.querySelector("#category-list input:checked");
  if (checkedRadioBtnId) {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks = bookmarks.filter(bookmark => bookmark.name != checkedRadioBtnId.id || bookmark.category != checkedRadioBtnId.name);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks(getBookmarks());
  }
});
