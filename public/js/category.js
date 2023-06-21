const dataTable = document.getElementById('html-data-table');
const createCategoryForm = document.querySelector('#create-category');
const createCategoryInput = document.querySelector('#create-category-input');
const buttonSelector = document.querySelector('button');

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

window.addEventListener('DOMContentLoaded', async (event) => {
  const response = await fetch(`/api/v1/category`);
  const { categories } = await response.json();
  populateAndRenderCategoriesTable(categories);
});

document
  .querySelector('#html-data-table')
  .addEventListener('click', (event) => {
    console.log(event.target.id);
    console.log(event.target.classList[0]);

    if (event.target.classList[0] === 'update') {
    }
    if (event.target.classList[0] === 'delete') {
      if (confirm('Are you sure to Delete this Category?')) {
        // API call to delete category
      }
    }
  });
