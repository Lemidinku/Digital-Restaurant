// let chart = JSON.parse(localStorage.getItem("chart")) || {}

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


let isSelected = false
function handleOrderButtonClick(item) {
  console.log("yes")
  // Toggle the selected state
  // isSelected = !isSelected;
  // let chart = JSON.parse(localStorage.getItem("chart")) || {}
  const itemJson = item.getAttribute('data-item');
  const items = JSON.parse(itemJson);
  const amountInput = document.getElementById(`input_${items.id}`)
  items.amount = amountInput.value
  

  // Parse the JSON string to get the item object
  // console.log(chart)
  let  local  = localStorage.getItem("selectedMeal")
    if (!local){
      local = {}
    } else{
      local = JSON.parse(local)
    }

    


  

  const chart = {
      id: items.id,
      name: items.Name,
      price: items.Price,
      amount:items.amount}
      

const orderButton = document.getElementById(`${items.id}`);
  if (local[`${items.id}`]){
    isSelected = false
    delete local[`${items.id}`]
    orderButton.textContent = isSelected ? 'Selected' : 'Order';
    orderButton.classList.add('order_btn');
    orderButton.classList.remove('selected');
  }else{
    local[`${items.id}`] = chart
    isSelected = true
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
console.log(local)

localStorage.setItem("selectedMeal", JSON.stringify(local));
document.getElementById('selected_items').innerHTML = ''

for (let key in local){
if (local.hasOwnProperty(key)){
  value = local[key]

  const {id, amount, name, price} = value
  document.getElementById('selected_items').innerHTML += `<li id="selected_item_${id}"><a href="#" class="block px-4 py-2 text-gray-800"> ${amount} ${name} Price: ${price}  </a></li>`;
} 
}
  
  
  console.log('Updated Chart:', chart);


}


// content change 
function changeContent(content) {
document.getElementById('content').innerHTML = content;
}

//by default fetch the starter 
document.addEventListener('DOMContentLoaded',  function () {
  
  
      // Parse the JSON data
      const starterData =  [
          {
            "id": 1,
            "ImageUrl": "beef-wellington-tart-173822-1.webp",
            "Name": "Beef Wellington Tart",
            "Price": 350,
            "Type": "starter",
            "Fasting":"fasting",
            "Oirgin":"ethiopia",
            "allergies" :"milk"
    
    
          },
          {
            "id": 2,
            "ImageUrl": "tuna.jpg",
            "Name": "Tuna Empanadillas",
            "Price": 250,
            "Type": "starter",
            "Fasting":"non-fasting",
            "Oirgin":"french",
            "allergies" :"eggs"
          },
          {
            "id": 3,
            "ImageUrl": "sweet-saganaki_digi_1980x1320-172761-1.jpg",
            "Name": "Beef Wellington Tart",
            "Price": 150,
            "Type": "starter",
            "Fasting":"non-fasting",
            "Oirgin":"asian",
            "allergies" :"peanut"
            
    
          },
          {
            "id": 4,
            "ImageUrl": "beef-wellington-tart-173822-1.webp",
            "Name": "Beef Wellington Tart",
            "Price": 350,
            "Type": "starter",
            "Fasting":"fasting",
            "Oirgin":"ethiopia",
            "allergies" :"soy"
          },
          {
            "id": 5,
            "ImageUrl": "sweet-saganaki_digi_1980x1320-172761-1.jpg",
            "Name": "Beef Wellington Tart",
            "Price": 150,
            "Type": "starter",
            "Fasting":"fasting",
            "Origin":"ethiopia",
            "allergies" :"wheat"
          },
          {
            "id": 6,
            "ImageUrl": "tuna.jpg",
            "Name": "Tuna Empanadillas",
            "Price": 250,
            "Type": "breakfast",
            "Fasting":"non-fasting",
            "Origin":"french",
            "allergies" :"Tree nuts"
          },
          {
            "id": 7,
            "ImageUrl": "beef-wellington-tart-173822-1.webp",
            "Name": "Beef Wellington Tart",
            "Price": 350,
            "Type": "breakfast",
            "Fasting":"fasting",
            "Origin":"ethiopia",
            "allergies" :"soy"
          },
          {
            "id": 8,
            "ImageUrl": "190205182304-fitira.webp",
            "Name": "Fatira",
            "Price": 250,
            "Type": "breakfast",
            "Fasting":"non-fasting",
            "Origin":"french",
            "allergies" :"Tree nuts"
          },
          {
            "id": 9,
            "ImageUrl": "chechebsa.jpg",
            "Name": "Chechebesa",
            "Price": 350,
            "Type": "breakfast",
            "Fasting":"fasting",
            "Origin":"ethiopia",
            "allergies" :"soy"
          },
          {
            "id": 10,
            "ImageUrl": "chechebsa.jpg",
            "Name": "Chechebesa",
            "Price": 350,
            "Type": "breakfast",
            "Fasting":"fasting",
            "Origin":"ethiopia",
            "allergies" :"soy"
          },
          {
            "id": 11,
            "ImageUrl": "kurt.jpg",
            "Name": "Kurt",
            "Price": 1350,
            "Type": "lunch",
            "Fasting":"fasting",
            "Origin":"ethiopia",
            "allergies" :"soy"
          },
          {
            "id": 12,
            "ImageUrl": "tibs.jpg",
            "Name": "Tibs",
            "Price": 850,
            "Type": "lunch",
            "Fasting":"fasting",
            "Origin":"french",
            "allergies" :"eggs"
          },
          {
            "id": 13,
            "ImageUrl": "kitfo.jpg",
            "Name": "Kitfo",
            "Price": 850,
            "Type": "lunch",
            "Fasting":"fasting",
            "Origin":"asian",
            "allergies" :"peanut"
          },
          {
            "id": 14,
            "ImageUrl": "shiro.jpg",
            "Name": "Shiro",
            "Price": 850,
            "Type": "lunch",
            "Fasting":"non-fasting",
            "Origin":"asian",
            "allergies" :"peanut"
          },
          {
            "id": 15,
            "ImageUrl": "kurt.jpg",
            "Name": "Shiro",
            "Price": 850,
            "Type": "lunch",
            "Fasting":"non-fasting",
            "Origin":"asian",
            "allergies" :"peanut"
          },
    
          {
            "id": 16,
            "ImageUrl": "kurt.jpg",
            "Name": "Kurt",
            "Price": 1350,
            "Type": "dinner",
            "Fasting":"fasting",
            "Origin":"ethiopia",
            "allergies" :"soy"
          },
          {
            "id": 17,
            "ImageUrl": "tibs.jpg",
            "Name": "Tibs",
            "Price": 850,
            "Type": "dinner",
            "Fasting":"fasting",
            "Origin":"french",
            "allergies" :"eggs"
          },
          {
            "id": 18,
            "ImageUrl": "kitfo.jpg",
            "Name": "Kitfo",
            "Price": 850,
            "Type": "dinner",
            "Fasting":"fasting",
            "Origin":"asian",
            "allergies" :"peanut"
          },
          {
            "id": 19,
            "ImageUrl": "shiro.jpg",
            "Name": "Shiro",
            "Price": 850,
            "Type": "dinner",
            "Fasting":"non-fasting",
            "Origin":"asian",
            "allergies" :"peanut"
          },
          {
            "id": 20,
            "ImageUrl": "kurt.jpg",
            "Name": "Shiro",
            "Price": 850,
            "Type": "dinner",
            "Fasting":"non-fasting",
            "Origin":"asian",
            "allergies" :"peanut"
          },
          {
            "id": 21,
            "ImageUrl": "Amaretto Brulee.jpeg",
            "Name": "Amaretto Brulee",
            "Price": 1350,
            "Type": "dessert",
            "Fasting":"fasting",
            "Origin":"ethiopia",
            "allergies" :"soy"
          },
          {
            "id": 22,
            "ImageUrl": "Banana Split.jpeg",
            "Name": "Banana Split",
            "Price": 850,
            "Type": "dessert",
            "Fasting":"fasting",
            "Origin":"french",
            "allergies" :"eggs"
          },
          {
            "id": 23,
            "ImageUrl": "Banoffe Pies.jpeg",
            "Name": "Banoffe Pies",
            "Price": 850,
            "Type": "dessert",
            "Fasting":"fasting",
            "Origin":"asian",
            "allergies" :"peanut"
          },
          {
            "id": 24,
            "ImageUrl": "Napoleon.jpeg",
            "Name": "Napoleon",
            "Price": 850,
            "Type": "dessert",
            "Fasting":"non-fasting",
            "Origin":"asian",
            "allergies" :"peanut"
          },
          {
            "id": 25,
            "ImageUrl": "chocolate-bullets-4280-1.jpeg",
            "Name": "Chocolate Bullet",
            "Price": 850,
            "Type": "dessert",
            "Fasting":"non-fasting",
            "Origin":"french",
            "allergies" :"eggs"
          }
       ];
      
      
      
      // Map 
      const starterHTML = starterData.map(item => `
      <div  class="w-80 mx-5 my-2 bg-white rounded overflow-hidden shadow-lg">
      <img class="w-full h-48 object-cover" src="../IMAGES/${item.ImageUrl}">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="mr-12">
            <p class="font-bold text-xl">${item.Name}</p>
            <div class="text-gray-700">★★★★★</div>
          </div>
          <div>
            <div class="flex items-center" id="order_plus_minus">
              <button class="bg-white-300 id="minus_${item.id}" onclick="subtract('${item.id}')" text-gray-700 px-2 py-1 rounded-l focus:outline-none focus:shadow-outline"> - </button>
              <input type="text" value="1" id="input_${item.id}" class="w-10 text-center bg-white-200 border-none focus:outline-none" readonly>
              <button class="bg-white-300 id="minus_${item.id}"  onclick="add('${item.id}')" text-gray-700 px-2 py-1 rounded-r focus:outline-none focus:shadow-outline"> + </button>
            </div>
            <p class="font-bold">${item.Price}<span id="price">ETB</span></p>
          </div>  
        </div>
        <button class=" order_btn font-bold text-white px-5" id="${item.id}" data-item='${JSON.stringify(item)}' onclick="handleOrderButtonClick(this)" >Order</button>
      </div>    
    </div>
  `).join('');

  // Update 
  changeContent(starterHTML);
  
  




});







document.getElementById('starter-link').addEventListener('click', async function (event) {
  event.preventDefault();
  
  

});
document.getElementById('breakfast-link').addEventListener('click', async function (event) {
  event.preventDefault();
  


});


document.getElementById('lunch-link').addEventListener('click', async function (event) {
  event.preventDefault();
  

});

document.getElementById('dinner-link').addEventListener('click', async function (event) {
  event.preventDefault();
  
 
});

document.getElementById('dessert-link').addEventListener('click', async function (event) {
  event.preventDefault();
  
 
});




// filter 

//   fasting 

document.getElementById('fastingSelect').addEventListener('change', async function (event) {
  event.preventDefault();
  const selectedOption = document.getElementById('fastingSelect').value;
  


});


// Orgin

document.getElementById('orginSelect').addEventListener('change', async function (event) {
  event.preventDefault();
  const selectedOption = document.getElementById('orginSelect').value;
  

});

// allargies

document.getElementById('allergiesSelect').addEventListener('change', async function (event) {
  event.preventDefault();
  const selectedOption = document.getElementById('allergiesSelect').value;
  

});

