document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle")
    const themeIcon = document.querySelector(".theme-icon")
  
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem("theme")
  
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.body.classList.add("dark-mode")
      themeIcon.textContent = "☀️"
    } else {
      document.body.classList.remove("dark-mode")
      themeIcon.textContent = "🌙"
    }
  
    // Toggle theme when button is clicked
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode")
  
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark")
        themeIcon.textContent = "☀️"
      } else {
        localStorage.setItem("theme", "light")
        themeIcon.textContent = "🌙"
      }
    })
  })