document.getElementById('submit_form').addEventListener('click',  function (event) {
    event.preventDefault()
 
    const phoneNumber = document.getElementById('phone_number').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('checkout_textarea').value;

    const selectedMeals = JSON.parse(localStorage.getItem("selectedMeal")) || {};

    console.log(6965)
    token = localStorage.getItem('token')

    let totalPrice = 0;
    const mealsArray = {};
    for (const mealId in selectedMeals) {
        const meal = selectedMeals[mealId];
        totalPrice += Number(meal.price);
        mealsArray[meal.name] = meal.amount };


    const formData = {
        phone: phoneNumber,
        total_price: totalPrice,
        meals: mealsArray,
        location: location,
        remark: description,
    };
    fetch('http://localhost:5000/orders/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'authorization': `${token}`
        } , 
        body: JSON.stringify(formData)
    }).then((res)=>{
        localStorage.removeItem('selectedMeal')
    }).catch((err)=>{
        console.log(err)

    })
   
    

   console.log(formData)

    
});
