let currentIndex = 0;
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => moveSlide(1), 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function updateSlidePosition() {
  const slides = document.getElementById("slides");
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateActiveLine();
}

function moveSlide(n) {
  const totalSlides = document.querySelectorAll(".slide").length;
  currentIndex = (currentIndex + n + totalSlides) % totalSlides;
  updateSlidePosition();
}

function selectSlide(index) {
  currentIndex = index;
  updateSlidePosition();
  stopAutoSlide();
  startAutoSlide();
}

function updateActiveLine() {
  const lines = document.querySelectorAll(".line");
  lines.forEach((line, i) => {
    const progressBar = line.querySelector(".progress-bar");
    if (i === currentIndex) {
      line.classList.add("active");
      progressBar.style.animation = "none";
      void progressBar.offsetWidth;
      progressBar.style.animation =
        "progressAnimation 5s linear forwards";
    } else {
      line.classList.remove("active");
      progressBar.style.animation = "none";
    }
  });
}

function createNavigationLines() {
  const linesContainer = document.getElementById("navigation-lines");
  const totalSlides = document.querySelectorAll(".slide").length;
  for (let i = 0; i < totalSlides; i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    if (i === 0) line.classList.add("active");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    line.appendChild(progressBar);

    line.onclick = () => selectSlide(i);
    linesContainer.appendChild(line);
  }
}

// Detect clicks on left and right halves of the slider, only in mobile view
document
  .getElementById("slider-container")
  .addEventListener("click", (e) => {
    const isMobileView = window.matchMedia("(max-width: 768px)").matches; // Check for mobile view

    if (isMobileView) {
      const rect = e.target.getBoundingClientRect();
      const clickX = e.clientX - rect.left;

      if (clickX < rect.width / 2) {
        moveSlide(-1); // Click on left side, go to the previous slide
      } else {
        moveSlide(1); // Click on right side, go to the next slide
      }
    }
  });

// Pause and resume on hover
const sliderContainer = document.getElementById("slider-container");
sliderContainer.addEventListener("mouseenter", () => {
  stopAutoSlide();
  document.querySelectorAll(".progress-bar").forEach((bar) => {
    bar.style.animationPlayState = "paused";
  });
});

sliderContainer.addEventListener("mouseleave", () => {
  startAutoSlide();
  document.querySelectorAll(".progress-bar").forEach((bar) => {
    bar.style.animationPlayState = "running";
  });
});

createNavigationLines();
updateSlidePosition();
startAutoSlide();