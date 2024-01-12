let token = localStorage.getItem('token');
if (!token) {
  window.location.href = '../login.html';
}
document.getElementById('foodForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const pictureInput = document.getElementById('picture');
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const kindSelect = document.querySelectorAll('#kindSelect input[type="checkbox"]:checked');
    // const checkboxes = document.querySelectorAll('#kindSelect input[type="checkbox"]:checked');
    const orginSelect = document.getElementById('orginSelect');
    const fastingSelect = document.getElementById('fastingSelect');
    const allergiesSelect = document.getElementById('allergiesSelect');
    const description = document.getElementById('description')
    let isFasting = fastingSelect.value;
    // const submitBtn = document.getElementById("add_meal_btn")
    
    isFasting = isFasting=== 'true'? true:false
    const newItem = {
        name: titleInput.value,
        price: parseFloat(priceInput.value),
        description: description.value, 
        imageUrl: "../path/imgurl", 
        types:  Array.from(kindSelect).map(checkbox => checkbox.value),
        
        fasting: isFasting,
        allergies: allergiesSelect.value,
        origin: orginSelect.value,
    };
    console.log(newItem)

    fetch('http://localhost:5000/meals/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'authorization': `${token}`
        } , 
        body: JSON.stringify(newItem)
    }).then(res => res.json())
        .then((res) => res).catch((err)=>console.log(err))


    pictureInput.value = '';
    titleInput.value = '';
    priceInput.value = '';
    kindSelect.value = 'starter'; 
    orginSelect.value = 'ethiopia'; 
    fastingSelect.value = false; 
    allergiesSelect.value = 'milk'; 
    description.value = ''
})

// submitBtn.addEventListener("click", (event) => {
//     event.preventDefault()
    

// })
