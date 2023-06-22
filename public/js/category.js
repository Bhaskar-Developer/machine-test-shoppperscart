const dataTable = document.getElementById('html-data-table');
const createCategoryForm = document.querySelector('#create-category');
const createCategoryInput = document.querySelector('#create-category-input');
const buttonSelector = document.querySelector('#create-category-button');
const updateCategoryForm = document.querySelector('#update-category-form');
const updateCategoryInput = document.querySelector('#update-category-input');
const updateCategoryButton = document.querySelector('#update-category-button');
const updateCancelButton = document.querySelector('#update-cancel-button');
let currentlySelectedCategoryId = '';

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
  console.log('create a new category');
  const newCategory = createCategoryInput.value;
  console.log(newCategory);

  const response = await fetch('/api/v1/category', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newCategory }),
  });

  const { status, code, message, error } = await response.json();
  if (status && code === 200 && message) {
    alert(message);
  }
  if (!status && code !== 200 && error) {
    alert(error);
  }

  dataTable.innerHTML = `
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Update</th>
        <th>Delete</th>
    </tr>
  `;
  createCategoryInput.value = '';
  const response2 = await fetch(`/api/v1/category`);
  const { categories } = await response2.json();
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

  const { status, code, message, error } = await response.json();
  if (status && code === 200 && message) {
    alert(message);
  }
  if (!status && code !== 200 && error) {
    alert(error);
  }

  dataTable.innerHTML = `
    <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Update</th>
        <th>Delete</th>
    </tr>
  `;

  updateCategoryForm.style.display = 'none';
  createCategoryForm.style.display = 'inline';
  currentlySelectedCategoryId = '';
  const response2 = await fetch(`/api/v1/category`);
  const { categories } = await response2.json();
  populateAndRenderCategoriesTable(categories);
});

window.addEventListener('DOMContentLoaded', async (event) => {
  const response = await fetch(`/api/v1/category`);
  const { categories } = await response.json();
  populateAndRenderCategoriesTable(categories);
});

dataTable.addEventListener('click', async (event) => {
  console.log(event.target.id);
  console.log(event.target.classList[0]);

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

    dataTable.innerHTML = `
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
            `;
    const response2 = await fetch(`/api/v1/category`);
    const { categories } = await response2.json();
    populateAndRenderCategoriesTable(categories);
  }
});
