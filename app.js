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

    const htitle = document.createElement('h1')
    const hprice = document.createElement('h2');
    const hdescription = document.createElement('h2');
    const image = document.createElement('img');
    //title
    htitle.textContent = `Title: ${data[i].title}`;
    htitle.className = 'title'
    //price
    hprice.textContent = `Price: ${data[i].price}`;
    hprice.className = 'h2';
    // description
    hdescription.textContent = `Description: ${data[i].description}`
    hdescription.className = 'h2';
    // image 
    image.src = data[i].imgUrl;
    image.class= "image";
    // image.className = 'h2';
    
    // appending to the DOM 
    document.getElementById('display-box').appendChild(htitle) 
    document.getElementById('display-box').appendChild(hprice);
    document.getElementById('display-box').appendChild(hdescription);
    document.getElementById('display-box').appendChild(image);

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


//if item is completed it will have a strikethrough

