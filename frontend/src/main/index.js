let SELECTED_FILTER = {};

let token = localStorage.getItem('token');
if (!token) {
  window.location.href = '../login.html';
}

document.addEventListener('DOMContentLoaded', function () {
  const orderHistoryBtn = document.getElementById('order_history');
  const sidebar = document.getElementById('sidebar');

  orderHistoryBtn.addEventListener('click', function () {
    sidebar.classList.toggle('hidden');
  });
  document.addEventListener('click', function (event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickOnOrderHistoryBtn = orderHistoryBtn.contains(event.target);

    if (!isClickInsideSidebar && !isClickOnOrderHistoryBtn) {
      sidebar.classList.add('hidden');
    }
  });
});

// order btn  --> selected

function add(itemId) {
  const inputElement = document.getElementById(`input_${itemId}`);
  let currentValue = parseInt(inputElement.value, 10);
  currentValue += 1;
  inputElement.value = currentValue;
}

function subtract(itemId) {
  const inputElement = document.getElementById(`input_${itemId}`);
  let currentValue = parseInt(inputElement.value, 10);
  if (currentValue > 0) {
    currentValue -= 1;
    inputElement.value = currentValue;
  }
}

let isSelected = false;
function handleOrderButtonClick(item) {
  console.log('yes');
  // Toggle the selected state
  // isSelected = !isSelected;
  // let chart = JSON.parse(localStorage.getItem("chart")) || {}
  const itemJson = item.getAttribute('data-item');
  const items = JSON.parse(itemJson);
  const amountInput = document.getElementById(`input_${items.id}`);
  items.amount = amountInput.value;

  // Parse the JSON string to get the item object
  // console.log(chart)
  let local = localStorage.getItem('selectedMeal');
  if (!local) {
    local = {};
  } else {
    local = JSON.parse(local);
  }

  const chart = {
    id: items.id,
    name: items.name,
    price: items.price,
    amount: items.amount,
  };

  const orderButton = document.getElementById(`${items.id}`);
  if (local[`${items.id}`]) {
    isSelected = false;
    delete local[`${items.id}`];
    orderButton.textContent = isSelected ? 'Selected' : 'Order';
    orderButton.classList.add('order_btn');
    orderButton.classList.remove('selected');
  } else {
    local[`${items.id}`] = chart;
    isSelected = true;
    orderButton.textContent = isSelected ? 'Selected' : 'Order';
    orderButton.classList.remove('order_btn');
    orderButton.classList.toggle('selected', isSelected);
  }

  // console.log(arr)
  // let  local  = localStorage.getItem("selectedMeal")
  // if (!local){
  //   local = []
  // } else{
  //   local = JSON.parse(local)
  // }
  console.log(local);

  localStorage.setItem('selectedMeal', JSON.stringify(local));
  document.getElementById('selected_items').innerHTML = '';

  for (let key in local) {
    if (local.hasOwnProperty(key)) {
      value = local[key];

      const { id, amount, name, price } = value;
      document.getElementById('selected_items').innerHTML +=
        `<li id="selected_item_${id}"><a href="#" class="block px-4 py-2 text-gray-800"> ${amount} ${name} Price: ${price}  </a></li>`;
    }
  }

  console.log('Updated Chart:', chart);
}

// content change
function changeContent(content) {
  document.getElementById('content').innerHTML = content;
}

async function getMeals(filter) {
  const queryParams = new URLSearchParams(filter);
  console.log(queryParams.toString());

  try {
    const response = await fetch(
      `http://localhost:5000/meals?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {}
}

createDOMforMeals = (arr) => {
  const starterHTML = arr
    .map(
      (item) => `
    <div  class="w-80 mx-5 my-2 bg-white rounded overflow-hidden shadow-lg">
    <img class="w-full h-48 object-cover" src="../IMAGES/chechebsa.jpg">
    <div class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="mr-12">
          <p class="font-bold text-xl">${item.name}</p>
          <div class="text-gray-700">★★★★★</div>
        </div>
        <div>
          <div class="flex items-center" id="order_plus_minus">
            <button class="bg-white-300 id="minus_${
              item.id
            }" onclick="subtract('${
              item.id
            }')" text-gray-700 px-2 py-1 rounded-l focus:outline-none focus:shadow-outline"> - </button>
            <input type="text" value="1" id="input_${
              item.id
            }" class="w-10 text-center bg-white-200 border-none focus:outline-none" readonly>
            <button class="bg-white-300 id="minus_${item.id}"  onclick="add('${
              item.id
            }')" text-gray-700 px-2 py-1 rounded-r focus:outline-none focus:shadow-outline"> + </button>
          </div>
          <p class="font-bold">${item.price}<span id="price">ETB</span></p>
        </div>  
      </div>
      <button class=" order_btn font-bold text-white px-5" id="${
        item.id
      }" data-item='${JSON.stringify(
        item,
      )}' onclick="handleOrderButtonClick(this)" >Order</button>
    </div>    
  </div>
`,
    )
    .join('');

  // Update
  changeContent(starterHTML);
};
//by default fetch the starter
document.addEventListener('DOMContentLoaded', async function () {
  let starterData = await getMeals(SELECTED_FILTER);
  console.log(starterData[0]);
  // Map

  createDOMforMeals(starterData);
});

document
  .getElementById('all-link')
  .addEventListener('click', async function (event) {
    event.preventDefault();
    delete SELECTED_FILTER.types;
    filterMeals = await getMeals(SELECTED_FILTER);
    createDOMforMeals(filterMeals);
  });
document
  .getElementById('starter-link')
  .addEventListener('click', async function (event) {
    event.preventDefault();
    SELECTED_FILTER.types = 'Starter';
    filterMeals = await getMeals(SELECTED_FILTER);
    createDOMforMeals(filterMeals);
  });
document
  .getElementById('breakfast-link')
  .addEventListener('click', async function (event) {
    event.preventDefault();
    SELECTED_FILTER.types = 'Breakfast';
    filterMeals = await getMeals(SELECTED_FILTER);
    createDOMforMeals(filterMeals);
  });

document
  .getElementById('lunch-link')
  .addEventListener('click', async function (event) {
    event.preventDefault();
    SELECTED_FILTER.types = 'Lunch';
    filterMeals = await getMeals(SELECTED_FILTER);
    createDOMforMeals(filterMeals);
  });

document
  .getElementById('dinner-link')
  .addEventListener('click', async function (event) {
    event.preventDefault();
    SELECTED_FILTER.types = 'Dinner';
    filterMeals = await getMeals(SELECTED_FILTER);
    createDOMforMeals(filterMeals);
  });

document
  .getElementById('dessert-link')
  .addEventListener('click', async function (event) {
    event.preventDefault();
    SELECTED_FILTER.types = 'Dessert';
    filterMeals = await getMeals(SELECTED_FILTER);
    createDOMforMeals(filterMeals);
  });

// filter

//   fasting filter

document
  .getElementById('fastingSelect')
  .addEventListener('change', async function (event) {
    event.preventDefault();
    const selectedOption = document.getElementById('fastingSelect').value;
    console.log(selectedOption);
    if (selectedOption == 'fasting') SELECTED_FILTER.fasting = true;
    else delete SELECTED_FILTER.fasting;
    filterMeals = await getMeals(SELECTED_FILTER);
    createDOMforMeals(filterMeals);
  });

// Orgin

document
  .getElementById('orginSelect')
  .addEventListener('change', async function (event) {
    event.preventDefault();
    const selectedOption = document.getElementById('orginSelect').value;
    SELECTED_FILTER.origin = selectedOption;
    if (!selectedOption) delete SELECTED_FILTER.origin;
    filterMeals = await getMeals(SELECTED_FILTER);
    createDOMforMeals(filterMeals);
  });

// allargies

document
  .getElementById('allergiesSelect')
  .addEventListener('change', async function (event) {
    event.preventDefault();
    const selectedOption = document.getElementById('allergiesSelect').value;
    SELECTED_FILTER.allergy = selectedOption;
    filterMeals = await getMeals(SELECTED_FILTER);
    createDOMforMeals(filterMeals);
  });
