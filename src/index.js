let addToy = false;
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch('http://localhost:3000/toys').then(r => r.json()).then(toys => toys.forEach(addToys))
}) 


document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const newToyName = e.target['name'].value
  const newToyimg = e.target['image'].value
  fetch('http://localhost:3000/toys',{method:'POST',headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${newToyName}`,
        "image": `${newToyimg}`,
        "likes": 0
      })
    }
  )
})
function addToys(toys){
  const toyPlace = document.querySelector('#toy-collection')
  const toy = document.createElement('div')
  setCard(toys,toy)
  toy.className = ' card'
  toyPlace.append(toy)
  setLikeBtn(toys,toy)
}
function setLikeBtn(toyData,toy)
{
  const likeBtn = toy.querySelector('.like-btn')
  const toyLikes = toy.querySelector('p')
  likeBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/toys/${toyData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        likes: ++toyData.likes,
      }),
    })
      .then((response) => response.json())
      .then((toy) => {
        toyLikes.innerText = toy.likes + " likes";
      })});
  // likeBtn.addEventListener('click', () => 
  // { 
  //   fetch("http://localhost:3000/toys/" + toyData.id, 
  //   {
  //       method:"PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //   },
  //   body: JSON.stringify({
  //     likes: ++toyLikes.textContent
  //   })
  // })
  // .then(r => r.json())
  // .then(toy => {
  //   toyLikes.innerText = toy.likes
  // })
  // })
}
function setCard(toyData,toy){
  const toyName = document.createElement('h2')
  toyName.textContent = toyData.name
  toy.appendChild(toyName)
  const toySrc = document.createElement('img')
  toySrc.src = toyData.image
  toySrc.className = 'toy-avatar'
  toy.appendChild(toySrc)
  const pushinP = document.createElement('p')
  pushinP.textContent = toyData.likes + " likes"
  toy.appendChild(pushinP)
  const toyBtn = document.createElement('button')
  toyBtn.className = 'like-btn'
  toyBtn.id = toyData.id
  toyBtn.textContent = 'Like <3'
  toy.appendChild(toyBtn)
}
