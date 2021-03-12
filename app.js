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
  title: form.title.value,
  price : form.price.value,
  description : form.description.value,
  imgUrl : form.image.value
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
    const deleteBtn= document.createElement('button');
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
    
   // delete button 
    deleteBtn.className="edit";
    deleteBtn.textContent="DELETE";
    deleteBtn.value = 'delete';

    // edit.value = "edit";

    // appending to the DOM 
    const displayBox = document.getElementById('display-box');
    displayBox.appendChild(htitle) 
    displayBox.appendChild(checkQuestion)
    displayBox.appendChild(check);
    displayBox.appendChild(edit);
    displayBox.appendChild(deleteBtn);
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
      var titleInput = document.createElement('input');
      var priceInput = document.createElement('input');
      var desInput = document.createElement('input');

      if(edit.value === 'edit'){
        edit.type = "submit";
        edit.value = "save";
        edit.textContent = "SAVE"
        edit.style.background = "white";
        edit.style.color = "black";
        //title 
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('name', 'titleinput');
        titleInput.className = 'title-input';
        titleInput.value =  htitle.textContent;
        htitle.parentNode.replaceChild(titleInput , htitle);
        // price 
        priceInput.type = "text";
        priceInput.className = "price-input"
        priceInput.value = hprice.textContent;
        hprice.parentNode.replaceChild(priceInput, hprice)
        // description
        desInput.type = 'text';
        desInput.className = 'des-input';
        desInput.value = hdescription.textContent;
        hdescription.parentNode.replaceChild(desInput, hdescription);

      } else if (edit.value === 'save'){
        let titleInput = document.getElementsByClassName('title-input')[0]
        let titleInputValue = titleInput.value
       console.log(titleInputValue);
        let newTitle = document.createElement('h1')
        newTitle.textContent = titleInputValue
        newTitle.className = 'title'
        // titleInput.parentNode.replaceChild(newTitle, titleInput)
        let priceInput = document.getElementsByClassName('price-input')[0]
        let priceInputValue = priceInput.value
        let newPrice = document.createElement('h2')
        newPrice.textContent = priceInputValue
        newPrice.className = 'h2'
        // priceInput.parentNode.replaceChild(newPrice, priceInput)
        let desInput = document.getElementsByClassName('des-input')[0]
        let desInputValue = desInput.value
        let newDes = document.createElement('h2')
        newDes.textContent = desInputValue
        newDes.className = 'h2'
        const id = data[i]._id;
        const update = {
          title: titleInputValue,
          price: priceInputValue,
          description: desInputValue
        }
        const url = `https://api.vschool.io/Camila/todo/${id}`
        axios.put(url, update).then(response => console.log(response.data))
          .catch(error => console.log(error));
        titleInput.parentNode.replaceChild(newTitle, titleInput)
        priceInput.parentNode.replaceChild(newPrice, priceInput)
        desInput.parentNode.replaceChild(newDes, desInput)
      }
    }
      
      // error handle function that instructs user
      function alerting(){
        alert('ERROR: Please overwrite existing text before saving!');
        location.reload();
      }
    
    // delete button 
    deleteBtn.addEventListener('click', function(){
        console.log('delete button was clicked');
        const id = data[i]._id;
        const url = `https://api.vschool.io/Camila/todo/${id}`
        axios.delete(url)
          .then(response => console.log(response.data))
          .then(error => console.log(error));

        location.reload();
    })
  
  }

    
}

getData();




