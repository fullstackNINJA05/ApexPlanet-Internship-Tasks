let currentQuestion = 0;
let score = 0;
let quizCompleted = false;

function setupQuiz() {
  const options = document.querySelectorAll(".option");
  options.forEach((option) => {
    option.addEventListener("click", function () {
      if (quizCompleted) return;

      const isCorrect = this.dataset.answer === "correct";
      const currentQuestionEl = document.querySelector(
        `[data-question="${currentQuestion}"]`
      );
      const allOptions = currentQuestionEl?.querySelectorAll(".option");

      // Disable all options and show correct answers
      allOptions?.forEach((opt) => {
        opt.style.pointerEvents = "none";
        if (opt.dataset.answer === "correct") {
          opt.classList.add("correct");
        } else if (opt === this && !isCorrect) {
          opt.classList.add("incorrect");
        }
      });

      if (isCorrect) score++;

      // Move to next question after delay
      setTimeout(() => {
        if (currentQuestionEl) currentQuestionEl.style.display = "none";
        currentQuestion++;

        if (currentQuestion < 3) {
          const nextQuestion = document.querySelector(
            `[data-question="${currentQuestion}"]`
          );
          if (nextQuestion) nextQuestion.style.display = "block";
        } else {
          showQuizResults();
        }
      }, 1500);
    });
  });
}

function showQuizResults() {
  quizCompleted = true;
  const scoreEl = document.querySelector(".quiz-score");
  if (scoreEl) {
    scoreEl.style.display = "block";
    scoreEl.textContent = `Quiz Complete! Your Score: ${score}/3`;
  }

  // Reset quiz after 3 seconds
  setTimeout(resetQuiz, 3000);
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  quizCompleted = false;

  // Reset all questions and options
  document.querySelectorAll(".question").forEach((q, index) => {
    q.style.display = index === 0 ? "block" : "none";
    q.querySelectorAll(".option").forEach((opt) => {
      opt.style.pointerEvents = "auto";
      opt.classList.remove("correct", "incorrect");
    });
  });

  const scoreEl = document.querySelector(".quiz-score");
  if (scoreEl) scoreEl.style.display = "none";
}

let currentSlide = 0;
const totalSlides = 4;
let autoplayInterval;

function changeSlide(direction) {
  currentSlide += direction;
  if (currentSlide >= totalSlides) currentSlide = 0;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

function updateCarousel() {
  const carousel = document.getElementById("carousel");
  const indicators = document.querySelectorAll(".indicator");

  if (carousel) {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

function startCarouselAutoplay() {
  autoplayInterval = setInterval(() => {
    changeSlide(1);
  }, 4000);
}

async function fetchJoke() {
  const button = document.querySelectorAll(".api-button")[0];
  const content = document.getElementById("joke-content");

  button.disabled = true;
  content.textContent = "Loading joke...";
  content.className = "api-content loading";

  try {
    const response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );
    const data = await response.json();
    content.textContent = `${data.setup} - ${data.punchline}`;
    content.className = "api-content";
  } catch (error) {
    content.textContent = "Oops! Could not fetch a joke right now.";
    content.className = "api-content";
  }

  button.disabled = false;
}

async function fetchQuote() {
  const button = document.querySelectorAll(".api-button")[1];
  const content = document.getElementById("quote-content");

  button.disabled = true;
  content.textContent = "Loading inspiration...";
  content.className = "api-content loading";

  try {
    const response = await fetch(
      "https://api.quotable.io/random?minLength=50&maxLength=150"
    );
    const data = await response.json();
    content.textContent = `"${data.content}" - ${data.author}`;
    content.className = "api-content";
  } catch (error) {
    content.textContent = "Could not fetch an inspiring quote right now.";
    content.className = "api-content";
  }

  button.disabled = false;
}

async function fetchFact() {
  const button = document.querySelectorAll(".api-button")[2];
  const content = document.getElementById("fact-content");

  button.disabled = true;
  content.textContent = "Loading fact...";
  content.className = "api-content loading";

  try {
    const response = await fetch(
      "https://uselessfacts.jsph.pl/random.json?language=en"
    );
    const data = await response.json();
    content.textContent = data.text;
    content.className = "api-content";
  } catch (error) {
    content.textContent = "Could not fetch a fun fact right now.";
    content.className = "api-content";
  }

  button.disabled = false;
}

document.addEventListener("DOMContentLoaded", function () {
  setupQuiz();
  startCarouselAutoplay();

  // Event listeners for carousel
  const prevButton = document.querySelector(".carousel-nav.prev");
  const nextButton = document.querySelector(".carousel-nav.next");

  if (prevButton) prevButton.addEventListener("click", () => changeSlide(-1));
  if (nextButton) nextButton.addEventListener("click", () => changeSlide(1));

  document.querySelectorAll(".indicator").forEach((indicator, index) => {
    indicator.addEventListener("click", () => goToSlide(index));
  });

  // Event listeners for API buttons
  document.querySelectorAll(".api-button").forEach((button, index) => {
    const handlers = [fetchJoke, fetchQuote, fetchFact];
    button.addEventListener("click", handlers[index]);
  });

  // Pause autoplay on hover
  const carouselContainer = document.querySelector(".carousel-container");
  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", () => {
      clearInterval(autoplayInterval);
    });

    carouselContainer.addEventListener("mouseleave", () => {
      startCarouselAutoplay();
    });
  }

  // Keyboard navigation for carousel
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "ArrowRight") changeSlide(1);
  });
});
