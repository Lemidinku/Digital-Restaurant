let token = localStorage.getItem('token');
if (!token) {
  window.location.href = '../login.html';
}

function changeContent(content) {
  document.getElementById('table_content').innerHTML = content;
}

async function getOrders() {
  try {
    const response = await fetch(`http://localhost:5000/orders`, {
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

//by default fetch the starter
document.addEventListener('DOMContentLoaded', async function () {
  //   const orderData = [
  //     {
  //       id: 1,
  //       phone: '0938903153',
  //       total_price: 5000,
  //       meals: [{ burger: 4 }, { gomen: 1 }],
  //       location: 'bole',
  //       remark: 'lorem lorem lorem lorem ',
  //     },
  //     {
  //       id: 2,
  //       phone: '0940903153',
  //       total_price: 4000,
  //       meals: [{ gomen: 5 }, { frfr: 3 }],
  //       location: 'bole',
  //       remark: 'lorem lorem lorem lorem ',
  //     },
  //     {
  //       id: 3,
  //       phone: '0958903153',
  //       total_price: 7000,
  //       meals: [{ shro: 4 }, { burger: 7 }],
  //       location: 'bole',
  //       remark: 'lorem lorem lorem lorem ',
  //     },
  //     {
  //       id: 4,
  //       phone: '0968903153',
  //       total_price: 9000,
  //       meals: [{ ktfo: 7 }, { shro: 4 }],
  //       location: 'bole',
  //       remark: 'lorem lorem lorem lorem ',
  //     },
  //   ];
  const orderData = await getOrders();
  const orderHTML = orderData
    .map((item) => {
      let meal_list = '';
      for (let meal in item.meals) {
        if (item.meals.hasOwnProperty(meal)) {
          let value = item.meals[meal];
          meal_list += `<option value="${meal},"> ${meal}: ${value} </option>`;
        }
      }

      let complete = `
    <tr>
    <td class="border border-slate-600 border-gray">${item.phone}</td>
    <td class="border border-slate-600 border-gray"><select>
        
        ${meal_list}
        
        
    </select></td>
    <td class="border border-slate-600 border-gray">${item.total_price}</td>
    <td class="border border-slate-600 border-gray">${item.location}</td>
    <td class="border border-slate-600 border-gray">${item.remark}</td>
    <td class="border border-slate-600 border-gray "><button id="done_${
      item.id
    }" data-item='${JSON.stringify(
      item.id,
    )}' onclick="handlerequast(this)" class="text-green-500" >${
      item.completed ? 'Done' : 'Pending'
    }</button></td>
</tr>
    
    
    `;
      return complete;
    })
    .join('');

  changeContent(orderHTML);
});

async function handlerequast(item) {
  console.log('yes');
  const itemJson = item.getAttribute('data-item');
  const id = JSON.parse(itemJson);
  console.log(id);

  const doneButton = document.getElementById(`done_${id}`);
  doneButton.textContent = 'Done';

  try {
    const response = await fetch(`http://localhost:5000/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ completed: true }),
    });

    const data = await response.json();
    return data;
  } catch (error) {}
}
// Parse the JSON data
