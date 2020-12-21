

const form = document.form;
const button = document.getElementById('button');




//gets data 

function getData(){
  axios.get('https://api.vschool.io/Camila/todo/')
    .then(response => addingToList(response.data))
    .catch(err => console.log(err))
}

// posts the data 


function addingToList(data){
  document.getElementById('display-box').innerHTML = ""
  for(let i = 0; i < data.length; i++){
    const h1 = document.createElement('h1')
    h1.innerHTML = data[i].title;
    h1.className = 'listed-items'
    document.getElementById('display-box').appendChild(h1) 
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
  image : document.form.image.value
  }

 axios.post('https://api.vschool.io/Camila/todo/', newToDo)
  .then(response => getData())
  .catch(error => console.log(error))
 
})


//if item is completed it will have a strikethrough

