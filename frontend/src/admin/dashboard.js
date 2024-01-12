let token = localStorage.getItem('token');
if (!token) {
  window.location.href = '../login.html';
}
function changeContent(content) {
  added = document.getElementById('main_page').innerHTML += content;
}

async function getMeals() {
  try {
    const response = await fetch(`http://localhost:5000/meals?`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {}
}

document.addEventListener('DOMContentLoaded', async function () {
  const addedData = await getMeals();
  const addedHTML = addedData
    .map((item) => {
      let types_list = '';
      for (let type in item.types) {
        types_list += `<span>${item.types[type]} </span>`;
      }
      console.log(item.allegry);
      allergy = '';
      if (item.allergy) {
        allergy = item.allergy;
      }

      let complete = ` 
    <div class="w-1/4 mx-5 my-2 bg-white rounded overflow-hidden shadow-lg">
    <img class="w-full h-48 object-cover" src="../IMAGES/doro_wot.jpg" alt="Food Image: We used static image">
    <div class="px-6 py-4">
        <div class="flex items-center justify-between">
            <div class="mr-12">
                <p class="font-bold text-xl">${item.name}</p>
            </div>
            <div>
                <p class="font-bold">${item.price}<span >ETB</span></p>
            </div>  
        </div>
        <div class="flex items-center justify-between">
            <div  class="mr-12">
                <p>type:${types_list}</p>
               
            </div>
            <div>
            <p>allergies: ${allergy}</p>
            </div>
             
        </div>
        <button id="edit_${item.id}" data-item='${JSON.stringify(
          item.id,
        )}' onclick="editAdded(this)" class="edit_btn"><img src="../IMAGES/edit-solid.svg" alt="edit button"></button> 
            <button id="delete_${item.id}" data-item='${JSON.stringify(
              item.id,
            )}' onclick="deleteAdded(this)" class="delete_btn"><img src="../IMAGES/trash-solid.svg" alt="delete button"></button>
    </div>    
</div>

`;
      return complete;
    })
    .join('');

  changeContent(addedHTML);
});

let foodId;
function editAdded(item) {
  const itemJson = item.getAttribute('data-item');
  const id = JSON.parse(itemJson);
  foodId = id;

  let modal = document.getElementById('myModal');

  let span = document.getElementsByClassName('close')[0];
  modal.style.display = 'block';

  span.onclick = function () {
    modal.style.display = 'none';
  };
}

document
  .getElementById('foodForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const pictureInput = document.getElementById('picture');
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const orginSelect = document.getElementById('orginSelect');
    const description = document.getElementById('description');
    console.log(priceInput);
    let newItem = {
      name: titleInput.value,
      price: parseFloat(priceInput.value),
      description: description.value,
      imageUrl: '../path/imgurl',
      origin: orginSelect.value,
    };
    const body = bodify(newItem);
    updateMeal(foodId, body);

    pictureInput.value = '';
    titleInput.value = '';
    priceInput.value = '';
    orginSelect.value = 'ethiopia';
    description.value = '';
    foodId = '';
    newItem = {};
  });

async function deleteAdded(item) {
  const itemJson = item.getAttribute('data-item');
  const id = JSON.parse(itemJson);
  console.log(id);

  try {
    const response = await fetch(`http://localhost:5000/meals/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    });
    const data = await response.json();
    location.reload();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function bodify(item) {
  let body = {};
  if (item.name) {
    body.name = item.name;
  }
  if (item.description) {
    body.description = item.description;
  }
  if (item.imageUrl) {
    body.imageUrl = item.imageUrl;
  }
  if (item.price) {
    body.price = item.price;
  }

  return body;
}

async function updateMeal(id, body) {
  console.log(id, body);

  try {
    const response = await fetch(`http://localhost:5000/meals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
