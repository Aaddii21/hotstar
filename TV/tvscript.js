let movies = [
    {
        name: "The Night Manager",
        des: "Spider-Man: No Way Home is a superhero film produced by Marvel Studios.",
        image: "./image1/thenight.webp",
      },
      {
        name: "Aarya",
        des: "Doctor Strange in the Multiverse of Madness is a Marvel superhero film.",
        image: "./image1/aarya3.webp",
      },
      {
        name: "Criminal Justice",
        des: "Thor: Love and Thunder is an upcoming Marvel superhero film.",
        image: "./image1/cr.webp",
      },
      {
        name: "Loki",
        des: "The Matrix Resurrections is a science fiction action film, the fourth installment in The Matrix series.",
        image: "../images/slider 1.PNG",
      },
      {
        name: "The FreeLancer",
        des: "Dune is a science fiction film directed by Denis Villeneuve, based on the 1965 novel of the same name.",
        image: "./image1/freelancer.webp",
      },
      {
        name: "The Legends Of Hanuman",
        des: "Cruella is a live-action crime comedy film that explores the backstory of the character Cruella de Vil.",
        image: "./image1/legendofhanuman.webp",
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
  