// alert('index connecteds')

function loadCategories(){
//    fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    
    // convert the promise to json
    .then(res=>res.json())
    
    // then send to display
    .then(data=>displayCategories(data.categories))
}


function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos").then(res=>res.json()).then(data=>displayVideos(data.videos))
}

function displayCategories(category){
    // get the container
    const categoryContainer = document.getElementById('category-container');

    // loop operation on array of object

    for(const cat of category){
      //  console.log(cat)

        const div = document.createElement('div');

        div.innerHTML = `
         <button class="btn btn-sm bg-[#25252570] p-4 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `

        categoryContainer.append(div)
    }

}


const displayVideos = (videos) => {
 const videoContainer = document.getElementById('videoContainer');

 videos.forEach(video=>{
    console.log(video)

    const videoCard = document.createElement('div');

    videoCard.innerHTML = `
    <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    
    `

    videoContainer.append(videoCard)
 })
}

loadCategories()
loadVideos()