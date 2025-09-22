// alert('index connecteds')

function loadCategories(){
//    fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    
    // convert the promise to json
    .then(res=>res.json())
    
    // then send to display
    .then(data=>displayCategories(data.categories))
}


const loadCategoryVideos = (id) =>{
      console.log(id)

      const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

    //  console.log(url)

      fetch(url).then(res=>res.json()).then(data=>{

        removeActiveClass();
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add('active');
       // console.log(clickedButton);
        displayVideos(data.category);
      })
} 


const removeActiveClass = () =>{
  const activeButtons = document.getElementsByClassName('active');

  for(const activebtn of activeButtons){
    activebtn.classList.remove('active');
  }


}

function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos").then(res=>res.json()).then(data=>{
       removeActiveClass();
        const clickedAllButton = document.getElementById('btn-all');
        clickedAllButton.classList.add('active');
      displayVideos(data.videos)
    })
}

function loadVideoDetails(videoId){
   console.log(videoId)

  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`

  fetch(url).then(res=>res.json()).then(data=>displayVideoDetails(data.video))
}

const displayVideoDetails = (vdodetails) =>{
console.log(vdodetails)

document.getElementById("show_details").showModal();

const detailsContainer = document.getElementById('details-container');

detailsContainer.innerHTML = `
<div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="${vdodetails.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${vdodetails.title}</h2>
    <p>${vdodetails.description}</p>
    <div class="card-actions justify-end">
    
    </div>
  </div>
</div>
`
}



function displayCategories(category){
    // get the container
    const categoryContainer = document.getElementById('category-container');

    // loop operation on array of object

    for(const cat of category){
      //  console.log(cat)

        const div = document.createElement('div');

        div.innerHTML = `
         <button
         id='btn-${cat.category_id}'
         onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm bg-[#25252570] p-4 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `

        categoryContainer.append(div)
    }

}


const displayVideos = (videos) => {
 const videoContainer = document.getElementById('videoContainer');

 videoContainer.innerHTML = "";

 if(videos.length === 0){
  videoContainer.innerHTML = `<div class="col-span-full flex flex-col items-center mt-8">
  <img src="Icon.png" alt="">
  <h2 class="text-3xl font-bold">Oops!!! sorryyy....there is no videos :( </h2>
</div>`
 }

 videos.forEach(video=>{
    console.log(video)

    const videoCard = document.createElement('div');

    videoCard.innerHTML = `
            <div class="card bg-base-100 w-96 ">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />

      <span class="absolute top-52 left-60 text-white bg-slate-950 rounded px-2 text-sm">3hr 56 min ago</span>
  </figure>
  <div class="flex justify-between gap-2 px-0">
   <div class="profile-pic">
    <div class="avatar">
  <div class="w-8 rounded-full">
    <img src="${video.authors[0].profile_picture}" />
  </div>
</div>
   </div>
   <div class="text-part">
    <h2 class="font-bold">${video.description}</h2>

    <p class="text-gray-400 flex gap-1">${video.authors[0].profile_name}
      <img class="w-7 h-7" src="https://img.icons8.com/?size=100&id=111407&format=png&color=000000" alt="">
    </p>

    <p class="text-gray-400">${video.others.views} views</p>
   </div>
    
  </div>

  <button onclick = loadVideoDetails('${video.video_id}') class="btn btn-block">show details</button>
</div>
    
    `

    videoContainer.append(videoCard)
 })
}

loadCategories()
