// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger")
    const navLinks = document.querySelector(".nav-links")
  
    if (hamburger) {
      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active")
  
        // Toggle hamburger animation
        const spans = hamburger.querySelectorAll("span")
        spans.forEach((span) => span.classList.toggle("active"))
      })
    }
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (navLinks && navLinks.classList.contains("active") && !event.target.closest(".navbar")) {
        navLinks.classList.remove("active")
  
        // Reset hamburger animation
        const spans = hamburger.querySelectorAll("span")
        spans.forEach((span) => span.classList.remove("active"))
      }
    })
  
    // Testimonial Slider
    const dots = document.querySelectorAll(".dot")
    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          // Remove active class from all dots
          dots.forEach((d) => d.classList.remove("active"))
  
          // Add active class to clicked dot
          dot.classList.add("active")
  
          // Here you would normally change the testimonial displayed
          // For this simple version, we're just changing the active dot
        })
      })
    }
  })
  
  // Function to toggle exercise details
  function toggleExercise(element) {
    const details = element.nextElementSibling
    const toggle = element.querySelector(".exercise-toggle")
  
    if (details.style.display === "grid") {
      details.style.display = "none"
      toggle.textContent = "+"
    } else {
      details.style.display = "grid"
      toggle.textContent = "-"
    }
  }
