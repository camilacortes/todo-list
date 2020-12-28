const form = document.form;
const button = document.getElementById('button');
const edit = document.getElementsByClassName('edit');




//gets data 

function getData(){
  axios.get('https://api.vschool.io/Camila/todo/')
    .then(response => renderTodo(response.data))
    .catch(err => console.log(err))

    
}


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


// posts the data 


function renderTodo(data){
  document.getElementById('display-box').innerHTML = ""

  for(let i = 0; i < data.length; i++){
    const htitle = document.createElement('h1')
    const hprice = document.createElement('h2');
    const hdescription = document.createElement('h2');
    const image = document.createElement('img');
    const divider = document.createElement('hr');
    const edit = document.createElement('button');
    const check = document.createElement('INPUT');
    const checkQuestion = document.createElement('h2');
    
    //title
    htitle.textContent = `Title: ${data[i].title}`;
    htitle.className = 'title'

    //check 
    check.className="check";
    check.name = 'check'
    check.setAttribute('type', 'checkbox');

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
    
    // edit button
    edit.className ="edit";
    edit.textContent="EDIT";
    edit.value = 'edit';
   

    // edit.value = "edit";

    // appending to the DOM 
    const displayBox = document.getElementById('display-box');
    displayBox.appendChild(htitle) 
    displayBox.appendChild(checkQuestion)
    displayBox.appendChild(check);
    displayBox.appendChild(edit);
    displayBox.appendChild(hprice);
    displayBox.appendChild(hdescription);
    displayBox.appendChild(image);
    displayBox.appendChild(divider);
   

    //PUT REQUEST with checkboxes 
    check.addEventListener('change', (e)=>{
      // e.preventDefault();
      htitle.style.textDecoration = "line-through";
      const id = data[i]._id;
      const update = {
        completed: true
      }
      const url = `https://api.vschool.io/Camila/todo/${id}`
      axios.put(url, update).then(response => response.data)
        .catch(error => console.log(error));
    })
    
    // makes sure the item stays crossed out after refresh. 
    if(data[i].completed === true){
      htitle.style.textDecoration = "line-through";
    }

    // edit button changing to input boxes and sending another post request

    edit.addEventListener('click' , buttonEvents)

    function buttonEvents(){
      if(edit.value === 'edit'){
        edit.value = "save";
        edit.textContent = "SAVE"
        edit.style.background = "white";
        edit.style.color = "black";
        console.log('this is edit')
        //title 
        var titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.className = 'title-input';
        titleInput.value =  htitle.textContent;
        htitle.parentNode.replaceChild(titleInput , htitle);
        // price 
        var priceInput = document.createElement('input');
        priceInput.type = "text";
        priceInput.className = "price-input"
        priceInput.value = hprice.textContent;
        hprice.parentNode.replaceChild(priceInput, hprice)
        // description
        var desInput = document.createElement('input');
        desInput.type = 'text';
        desInput.className = 'des-input';
        desInput.value = hdescription.textContent;
        hdescription.parentNode.replaceChild(desInput, hdescription);

      } else if (edit.value === 'save'){
        console.log('you saved')
        const newTitle = document.getElementsByClassName('title-input');
        console.log(newTitle.value);
        

      //   const id = data[i]._id;
      //   const update = {
      //   title: 'placeholder text',
      //   price: 'placeholder text',
      //   description: 'placeholder text'

      // }
      // const url = `https://api.vschool.io/Camila/todo/${id}`
      // axios.put(url, update).then(response => console.log(response.data))
      //   .catch(error => console.log(error));
       
      }
    }
   
  
  }

    
}

getData();




