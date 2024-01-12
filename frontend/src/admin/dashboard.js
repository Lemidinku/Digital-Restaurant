function changeContent(content) {
    added = document.getElementById("main_page").innerHTML += content;
  }


document.addEventListener('DOMContentLoaded',  function () {

const addedData = [
    {
    "id":1,
    "name" :"enkulal" ,
        "price": 350 ,
        "desription" : "lorem lorem lorem lorem ",
        "imageUrl":"190205174453-enkulal-firfir.webp",
        "types":["lunch" , "dinner" , "breakfast"] , 
        "fasting":true , 
        "allergies" : "soy" , 
        "origin":"Ethiopia" 
     }
     ,
    {
    "id":2,
    "name" :"sambusa" ,
    "price": 350 ,
    "desription" : "lorem lorem lorem lorem ",
    "imageUrl":"sambusa.webp",
    "types":["lunch" , "dinner" , "breakfast"] , 
    "fasting":true , 
    "allergies" : "soy" , 
    "origin":"Asian" 
    } 
]

const addedHTML = addedData.map(item =>{
    let types_list = ''
    for(let type in item.types){
       
            types_list += `<span>${item.types[type]} </span>`

            
        
    }

    let complete =` 
    <div class="w-1/4 mx-5 my-2 bg-white rounded overflow-hidden shadow-lg">
    <img class="w-full h-48 object-cover" src="../IMAGES/${item.imageUrl}" alt="Enkulal Firfir">
    <div class="px-6 py-4">
        <div class="flex items-center justify-between">
            <div class="mr-12">
                <p class="font-bold text-xl">${item.name}</p>
            </div>
            <div>
                <p class="font-bold">${item.price}<span id="price">ETB</span></p>
            </div>  
        </div>
        <div class="flex items-center justify-between">
            <div  class="mr-12">
                <p>type:${types_list}</p>
               
            </div>
            <div>
            <p>allergies: ${item.allergies}</p>
            </div>
             
        </div>
        <button id="edit_${item.id}" data-item='${JSON.stringify(item.id)}' onclick="editAdded(this)" class="edit_btn"><img src="../IMAGES/edit-solid.svg" alt="edit button"></button> 
            <button id="delete_${item.id}" data-item='${JSON.stringify(item.id)}' onclick="deleteAdded(this)" class="delete_btn"><img src="../IMAGES/trash-solid.svg" alt="delete button"></button>
    </div>    
</div>

`
return complete}).join('');


changeContent(addedHTML)


})


let foodId;
function editAdded(item){
    const itemJson = item.getAttribute('data-item');
    const id = JSON.parse(itemJson); 
    foodId = id
    
    let modal = document.getElementById("myModal");
    
    let span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
      }
      
 
    
    
}

document.getElementById('foodForm').addEventListener('submit',  function (event) {
    event.preventDefault();


    const pictureInput = document.getElementById('picture');
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const kindSelect = document.getElementById('kindSelect');
    const orginSelect = document.getElementById('orginSelect');
    const fastingSelect = document.getElementById('fastingSelect');
    const allergiesSelect = document.getElementById('allergiesSelect');
    const description = document.getElementById('description')
    const isFasting = fastingSelect.value ;
   let  newItem = {
        name: titleInput.value,
        price: parseFloat(priceInput.value),
        description: description.value, // You may add a description field in your form
        imageUrl: "../path/imgurl", // Replace with your image URL
        types: Array.from(kindSelect.selectedOptions, option => option.value),
        fasting: isFasting,
        allergies: allergiesSelect.value,
        origin: orginSelect.value,
    };
    const body = bodify(newItem)
    updateMeal(foodId,body)

   



    pictureInput.value = '';
    titleInput.value = '';
    priceInput.value = '';
    kindSelect.value = 'starter'; 
    orginSelect.value = 'ethiopia'; 
    fastingSelect.value = false; 
    allergiesSelect.value = 'milk'; 
    description.value = ''
    foodId=""
    newItem ={}
    
})


async function deleteAdded(item){
    const itemJson = item.getAttribute('data-item');
    const id = JSON.parse(itemJson); 
    console.log(id)

    try{
        const response = await fetch (`http://localhost:5000/meals/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
        })
        const data = await response.json()
        return data
    } catch(err){
        console.log(err)
    }






    
}





function bodify(item){
    let body = {}
    if (item.name){
        body.name = item.name
    }
    if (item.description){
        body.description = item.description
    }
    if (item.imageUrl){
        body.imageUrl = item.imageUrl
    }
    if (item.types){

        body.types = item.types
    }
    if (item.fasting){
        body.fasting = item.fasting
    }
    if (item.allergies){
        body.allergies = item.allergies
    }
    if (item.origin){
        body.origin = item.origin
    }
    return body
}



async function updateMeal(id,body){
    console.log("submit")

    
    try{
        const response = await fetch (`http://localhost:5000/meals/${id}`,{
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json',
                authorization: localStorage.getItem('token'),
            },
            body:JSON.stringify(body) 
        })
        const data = await response.json()
        return data
    } catch(err){
        console.log(err)
    }
}

