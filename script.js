// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById("mobile-menu-btn")
const nav = document.getElementById("nav")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active")
  nav.classList.toggle("active")
  document.body.style.overflow = nav.classList.contains("active") ? "hidden" : ""
})

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuBtn.classList.remove("active")
    nav.classList.remove("active")
    document.body.style.overflow = ""
  })
})

// ===== Header Scroll Effect =====
const header = document.getElementById("header")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition = target.offsetTop - headerHeight
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ===== Form Submission Handler =====
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const data = Object.fromEntries(formData)

  // Basic validation
  if (!data.name || !data.email || !data.type || !data.message) {
    alert("Please fill in all required fields.")
    return
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.")
    return
  }

  // Simulate form submission (replace with actual backend integration)
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    alert("Thank you for your enquiry! We will get back to you within 24 hours.")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 1500)
})

// ===== Intersection Observer for Animations =====
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe animated elements
document.querySelectorAll(".service-card, .industry-card, .process-step, .feature").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  observer.observe(el)
})

// ===== Counter Animation for Stats =====
const stats = document.querySelectorAll(".stat-number")
let statsAnimated = false

const animateStats = () => {
  if (statsAnimated) return

  stats.forEach((stat) => {
    const text = stat.textContent
    const number = Number.parseInt(text.replace(/\D/g, ""))
    const suffix = text.replace(/[0-9]/g, "")

    if (isNaN(number)) return

    let current = 0
    const increment = number / 50
    const timer = setInterval(() => {
      current += increment
      if (current >= number) {
        stat.textContent = text
        clearInterval(timer)
      } else {
        stat.textContent = Math.floor(current) + suffix
      }
    }, 30)
  })

  statsAnimated = true
}

// Trigger stats animation when hero section is visible
const heroSection = document.querySelector(".hero")
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(animateStats, 500)
      }
    })
  },
  { threshold: 0.3 },
)

heroObserver.observe(heroSection)

// ===== Click outside to close mobile menu =====
document.addEventListener("click", (e) => {
  if (nav.classList.contains("active") && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenuBtn.classList.remove("active")
    nav.classList.remove("active")
    document.body.style.overflow = ""
  }
})
