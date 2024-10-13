let movies = [
    {
        name: "The  Guardians Of Galaxy Volume 3",
        des: "The Guardians Teamup with Thor for saving the galxy one more Time.",
        image: "./images/gotg3.webp",
      },
      {
        name: "Doctor Strange in the Multiverse of Madness",
        des: "Doctor Strange in the Multiverse of Madness is a Marvel superhero film.",
        image: "./images/doctorstrange.webp",
      },
      {
        name: "Thor: Raganarok",
        des: "Thor and Loki try to save Asgard from their evil sister Hela and go through a crazy adventure.",
        image: "./images/thorr.webp",
      },
      {
        name: "AVATAR:The Way Of Water",
        des: "Epic sci-fi film directed by James Cameron, exploring new depths in Pandora's world. Spectacular visuals.",
        image: "./images/awow.webp",
      },
      {
        name: "The Quiz Lady",
        des: "A game show-obsessed young woman and her estranged, train-wreck of a sister must work together to help cover their mother’s gambling debts.",
        image: "./images/ql.webp",
      },
      {
        name: "Apurva",
        des: "When an ordinary girl is forced to survive in an extraordinarily dangerous situation, nothing is off-limits.",
        image: "./images/ap.webp",
      },
    ];
  
const carousel = document.querySelector(".carousel");
let sliders = [];

let slideIndex = 0; // track the current slide

const createSlide = () => {
  if (slideIndex >= movies.length) {
    slideIndex = 0;
  }

  // create DOM Elements
  let slide = document.createElement("div");
  let imgElement = document.createElement("img");
  let content = document.createElement("div");
  let h1 = document.createElement("h1");
  let p = document.createElement("p");

  // attaching all element
  imgElement.appendChild(document.createTextNode(""));
  h1.appendChild(document.createTextNode(movies[slideIndex].name));
  p.appendChild(document.createTextNode(movies[slideIndex].des));
  content.appendChild(h1);
  content.appendChild(p);
  slide.appendChild(content);
  slide.appendChild(imgElement);
  carousel.appendChild(slide);

  // setting up images
  imgElement.src = movies[slideIndex].image;
  slideIndex++;

  // setting elements classnames
  slide.className = "slider";
  content.className = "slide-content";
  h1.className = "movie-title";
  p.className = "movie-des";

  sliders.push(slide);

  if (sliders.length) {
    sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${
      30 * (sliders.length - 2)
    }px)`;
  }
};

for (let i = 0; i < 3; i++) {
  createSlide();
}

setInterval(() => {
  createSlide();
}, 3000);

// video cards

const videoCards = document.querySelectorAll(".video-card");

videoCards.forEach((item) => {
  item.addEventListener("mouseover", () => {
    let video = item.children[1];
    video.play();
  });
  item.addEventListener("mouseleave", () => {
    let video = item.children[1];
    video.pause();
  });
});

// cards sliders

let cardContainers = document.querySelectorAll(".card-container");
let preBtns = document.querySelectorAll(".pre-btn");
let nxtBtns = document.querySelectorAll(".nxt-btn");

// Function to scroll the card container to the left
function scrollLeft(container) {
  container.scrollLeft -= container.clientWidth;
}

// Function to scroll the card container to the right
function scrollRight(container) {
  container.scrollLeft += container.clientWidth;
}

// Attach click event listeners to previous and next buttons
preBtns.forEach((preBtn, index) => {
  preBtn.addEventListener("click", () => {
    scrollLeft(cardContainers[index]);
  });
});

nxtBtns.forEach((nxtBtn, index) => {
  nxtBtn.addEventListener("click", () => {
    scrollRight(cardContainers[index]);
  });
});
  