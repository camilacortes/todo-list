const form = document.form;
const button = document.getElementById('button');




//gets data 

function getData(){
  axios.get('https://api.vschool.io/Camila/todo/')
    .then(response => renderTodo(response.data))
    .catch(err => console.log(err))
}

// posts the data 


function renderTodo(data){
  document.getElementById('display-box').innerHTML = ""

  for(let i = 0; i < data.length; i++){
    const htitle = document.createElement('h1')
    const hprice = document.createElement('h2');
    const hdescription = document.createElement('h2');
    const image = document.createElement('img');
    const divider = document.createElement('hr');
    const check = document.createElement('INPUT');
    check.className="check";
    check.name = 'check'
    check.setAttribute('type', 'checkbox');
    const checkQuestion = document.createElement('h2');
    //title
    htitle.textContent = `Title: ${data[i].title}`;
    htitle.className = 'title'

    // checkbox 
    checkQuestion.textContent = `Completed :  ` ;
    checkQuestion.className = "check-question"
  
    //price
    hprice.textContent = `Price: ${data[i].price}`;
    hprice.className = 'h2';
    
    // description
    hdescription.textContent = `Description: ${data[i].description}`
    hdescription.className = 'h2';
    
    // image 
    image.src = data[i].imgUrl;
    image.className= "image";
    
   
    // appending to the DOM 
    const displayBox = document.getElementById('display-box');
    displayBox.appendChild(htitle) 
    displayBox.appendChild(checkQuestion)
    displayBox.appendChild(check);
    displayBox.appendChild(hprice);
    displayBox.appendChild(hdescription);
    displayBox.appendChild(image);
    displayBox.appendChild(divider);
  }

}

getData();

// form submit event to post an item 

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newToDo = {
  title: document.form.title.value,
  price : document.form.price.value,
  description : document.form.description.value,
  imgUrl : document.form.image.value
  }

 axios.post('https://api.vschool.io/Camila/todo/', newToDo)
  .then(response => getData())
  .catch(error => console.log(error))
 
})







  // let allChecked = document.getElementsByClassName('check')
  // let newArr = Array.from(allChecked);
  // console.log(newArr)
  // console.log(allChecked)
  // for(check of allChecked){
  //   console.log(check)
  // }
