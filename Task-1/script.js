// Main interactive button functionality
document.getElementById("interactive-btn").addEventListener("click", () => {
  alert(
    "🚀 Welcome to the Future of Technology! 🚀\n\nYou've just experienced basic JavaScript interactivity. This simple alert demonstrates how JavaScript can respond to user actions and create dynamic web experiences.\n\nExplore the page to discover more interactive features!",
  )
})

// Language information data
const languageData = {
  python: {
    name: "Python",
    description:
      "Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in data science, machine learning, web development, and automation.",
    features: [
      "Easy to learn and read",
      "Extensive library ecosystem",
      "Great for AI/ML",
      "Cross-platform compatibility",
    ],
    useCases: "Data Science, Machine Learning, Web Development, Automation, Scientific Computing",
  },
  javascript: {
    name: "JavaScript",
    description:
      "JavaScript is the programming language of the web. It enables interactive web pages and is an essential part of web applications, alongside HTML and CSS.",
    features: ["Runs in browsers and servers", "Event-driven programming", "Dynamic typing", "Huge ecosystem (npm)"],
    useCases: "Web Development, Mobile Apps, Desktop Apps, Server-side Development, Game Development",
  },
  rust: {
    name: "Rust",
    description:
      "Rust is a systems programming language that focuses on safety, speed, and concurrency. It prevents common programming errors like null pointer dereferences and buffer overflows.",
    features: [
      "Memory safety without garbage collection",
      "Zero-cost abstractions",
      "Excellent performance",
      "Growing ecosystem",
    ],
    useCases: "Systems Programming, Web Assembly, Blockchain, Game Engines, Operating Systems",
  },
  go: {
    name: "Go (Golang)",
    description:
      "Go is an open-source programming language developed by Google. It's designed for simplicity, efficiency, and excellent support for concurrent programming.",
    features: ["Fast compilation", "Built-in concurrency", "Simple syntax", "Strong standard library"],
    useCases: "Cloud Services, Microservices, DevOps Tools, Network Programming, Distributed Systems",
  },
}

// Technology trends data
const techTrends = [
  {
    title: "Edge AI Computing",
    description:
      "AI processing is moving closer to data sources, reducing latency and improving privacy. Edge AI enables real-time decision making in IoT devices, autonomous vehicles, and smart cameras without relying on cloud connectivity.",
  },
  {
    title: "Quantum-Safe Cryptography",
    description:
      "As quantum computers advance, current encryption methods become vulnerable. Organizations are developing quantum-resistant cryptographic algorithms to secure data against future quantum attacks.",
  },
  {
    title: "Digital Twins",
    description:
      "Digital twins create virtual replicas of physical systems, enabling simulation, monitoring, and optimization. They're revolutionizing manufacturing, healthcare, and smart city planning.",
  },
  {
    title: "Neuromorphic Computing",
    description:
      "Inspired by the human brain, neuromorphic chips process information more efficiently than traditional processors. They're particularly promising for AI applications and edge computing.",
  },
  {
    title: "Synthetic Biology",
    description:
      "Engineering biological systems for useful purposes, synthetic biology combines biology with engineering principles to create new biological parts, devices, and systems.",
  },
  {
    title: "Extended Reality (XR)",
    description:
      "XR encompasses AR, VR, and MR technologies, creating immersive experiences that blend physical and digital worlds for training, entertainment, and collaboration.",
  },
]

// Function to show language information
function showLanguageInfo(language) {
  const infoDisplay = document.getElementById("language-info")
  const data = languageData[language]

  if (data) {
    infoDisplay.innerHTML = `
            <div style="text-align: left;">
                <h4 style="color: #667eea; margin-bottom: 10px;">${data.name}</h4>
                <p style="margin-bottom: 10px;"><strong>Description:</strong> ${data.description}</p>
                <p style="margin-bottom: 10px;"><strong>Key Features:</strong></p>
                <ul style="margin-left: 20px; margin-bottom: 10px;">
                    ${data.features.map((feature) => `<li>${feature}</li>`).join("")}
                </ul>
                <p><strong>Common Use Cases:</strong> ${data.useCases}</p>
            </div>
        `
  }
}

// Function to show random tech trend
function showTechTrend() {
  const trendDisplay = document.getElementById("trend-info")
  const randomTrend = techTrends[Math.floor(Math.random() * techTrends.length)]

  trendDisplay.innerHTML = `
        <div style="text-align: left;">
            <h4 style="color: #667eea; margin-bottom: 10px;">${randomTrend.title}</h4>
            <p>${randomTrend.description}</p>
        </div>
    `
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(45, 55, 72, 0.95)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.1)"
  }
})

// Add animation on scroll for content cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all content cards for animation
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(
    ".content-card, .tech-article, .engineering-card, .future-item, .learning-card",
  )
  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
})

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }
  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  const originalText = heroTitle.textContent
  typeWriter(heroTitle, originalText, 80)
})

// Add interactive hover effects
document.querySelectorAll(".content-card, .tech-article, .engineering-card, .future-item").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Console welcome message
console.log(`
🚀 Welcome to TechVerse! 🚀

This webpage demonstrates the three core web technologies:

📝 HTML: Provides the structure and content
🎨 CSS: Handles styling, layout, and visual design  
⚡ JavaScript: Adds interactivity and dynamic behavior

Built with modern web development best practices:
- Responsive design for all devices
- Smooth animations and transitions
- Interactive elements and user feedback
- Clean, semantic HTML structure
- Efficient CSS with modern layout techniques
- Vanilla JavaScript for optimal performance

Explore the page and check out the interactive features!
`)
