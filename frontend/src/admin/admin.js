document.getElementById('foodForm').addEventListener('submit', async function (event) {
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
    const newItem = {
        name: titleInput.value,
        price: parseFloat(priceInput.value),
        description: description.value, // You may add a description field in your form
        imageUrl: "../path/imgurl", // Replace with your image URL
        types: Array.from(kindSelect.selectedOptions, option => option.value),
        fasting: isFasting,
        allergies: allergiesSelect.value,
        origin: orginSelect.value,
    };
    console.log(newItem)




    pictureInput.value = '';
    titleInput.value = '';
    priceInput.value = '';
    kindSelect.value = 'starter'; 
    orginSelect.value = 'ethiopia'; 
    fastingSelect.value = false; 
    allergiesSelect.value = 'milk'; 
    description.value = ''
})