const dataTable = document.getElementById('html-data-table');
const createCategoryForm = document.querySelector('#create-category');
const createCategoryInput = document.querySelector('#create-category-input');
const buttonSelector = document.querySelector('#create-category-button');
const updateCategoryForm = document.querySelector('#update-category-form');
const updateCategoryInput = document.querySelector('#update-category-input');
const updateCategoryButton = document.querySelector('#update-category-button');
const updateCancelButton = document.querySelector('#update-cancel-button');
let currentlySelectedCategoryId = '';

const fetchCategories = async () => {
  const response = await fetch(`/api/v1/category`);
  const { categories } = await response.json();
  return categories;
};

const resetTable = () => {
  dataTable.innerHTML = `
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Update</th>
        <th>Delete</th>
    </tr>
  `;
};

const showAlert = (response) => {
  const { status, code, message, error } = response;
  if (status && code === 200 && message) {
    alert(message);
  }
  if (!status && code !== 200 && error) {
    alert(error);
  }
};

const populateAndRenderCategoriesTable = async (categories) => {
  categories.forEach((category) => {
    let newRow = document.createElement('tr');
    newRow.className = 'category-tr';
    newRow.innerHTML = `
    <td>${category.id}</td>
    <td>${category.name}</td>
    <td><button class=update id=${category.id}>Update</button></td>
    <td><button class=delete id=${category.id}>Delete</button></td>
    `;
    dataTable.appendChild(newRow);
  });
};

createCategoryForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newCategory = createCategoryInput.value;

  const response = await fetch('/api/v1/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newCategory }),
  });
  showAlert(await response.json());
  resetTable();
  createCategoryInput.value = '';
  const categories = await fetchCategories();
  populateAndRenderCategoriesTable(categories);
});

updateCancelButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('Cancel Update Button Clicked');
  updateCategoryForm.style.display = 'none';
  createCategoryForm.style.display = 'inline';
  currentlySelectedCategoryId = '';
});

updateCategoryForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const response = await fetch('/api/v1/category', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: updateCategoryInput.value,
      id: currentlySelectedCategoryId,
    }),
  });
  showAlert(await response.json());
  resetTable();

  updateCategoryForm.style.display = 'none';
  createCategoryForm.style.display = 'inline';
  currentlySelectedCategoryId = '';
  const categories = await fetchCategories();
  populateAndRenderCategoriesTable(categories);
});

window.addEventListener('DOMContentLoaded', async (event) => {
  const categories = await fetchCategories();
  populateAndRenderCategoriesTable(categories);
});

dataTable.addEventListener('click', async (event) => {
  if (event.target.classList[0] === 'update') {
    updateCategoryForm.style.display = 'inline';
    createCategoryForm.style.display = 'none';

    const response = await fetch(`/api/v1/category/${event.target.id}`);
    const { category } = await response.json();
    if (category) {
      updateCategoryInput.value = category.name;
      currentlySelectedCategoryId = event.target.id;
    } else {
      console.log('Could not fetch category');
    }
  }
  if (event.target.classList[0] === 'delete') {
    if (confirm('Are you sure to Delete this Category?')) {
      await fetch(`/api/v1/category?id=${event.target.id}`, {
        method: 'DELETE',
      });
    }
    resetTable();
    const categories = await fetchCategories();
    populateAndRenderCategoriesTable(categories);
  }
});
