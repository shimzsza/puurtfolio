document.addEventListener('DOMContentLoaded', () => {
    // === ELEMENTS ===
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = themeToggle.querySelector('i');
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const heroH1 = document.getElementById('hero-h1');
    
    // === THEME TOGGLE ===
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            toggleIcon.classList.replace('ri-sun-line', 'ri-moon-line');
        } else {
            toggleIcon.classList.replace('ri-moon-line', 'ri-sun-line');
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });

    // === MOBILE NAV LOGIC ===
    const openMobileNav = () => {
        mobileNav.classList.add('show');
        navToggle.setAttribute('aria-expanded', 'true');
    };

    const closeMobileNav = () => {
        mobileNav.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    // Open via Hamburger
    navToggle.addEventListener('click', openMobileNav);

    // Close via 'X' button inside nav
    if(mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }

    // Close when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // Close on resize if switching to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 901) {
            closeMobileNav();
        }
    });

    // === TYPING ANIMATION ===
    const textToType = "Hi, I'm Caniedo Ace";
    let typeIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentText = heroH1.textContent;
        
        if (!isDeleting && typeIndex < textToType.length) {
            // Typing
            heroH1.textContent = textToType.substring(0, typeIndex + 1);
            typeIndex++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && typeIndex > 0) {
            // Deleting
            heroH1.textContent = textToType.substring(0, typeIndex - 1);
            typeIndex--;
            setTimeout(typeWriter, 50);
        } else {
            // Switch modes
            isDeleting = !isDeleting;
            if (!isDeleting) {
                setTimeout(typeWriter, 500); // Pause before re-typing
            } else {
                setTimeout(typeWriter, 2000); // Pause before deleting
            }
        }
    }
    // Start typing loop
    typeWriter();


    // === CONTACT FORM MODAL ===
    const contactForm = document.getElementById('contact-form');
    const modal = document.getElementById('thankyou-modal');
    const modalClose = document.getElementById('modal-close');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value || "Friend";
        const modalText = modal.querySelector('p');
        modalText.textContent = `Thank you for sending your message, ${name}! I'll get back to you soon.`;
        
        modal.classList.remove('hidden');
        contactForm.reset();
        
        // Auto close after 5 seconds
        setTimeout(() => modal.classList.add('hidden'), 5000);
    });

    modalClose.addEventListener('click', () => modal.classList.add('hidden'));
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // === SCROLL ANIMATIONS ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

});

// ==========================================
// === AUTOMATIC SLIDESHOW LOGIC ===
// ==========================================

let slideIndex = 1;
let slideTimer; // Variable to hold the timer

// Initialize
showSlides(slideIndex);
startAutoSlide(); // Start the automatic timer

// Next/Previous controls (Called by HTML onclick)
function plusSlides(n) {
  // Reset the timer so it doesn't jump immediately after a user clicks
  clearInterval(slideTimer); 
  showSlides(slideIndex += n);
  startAutoSlide(); // Restart the timer
}

// Thumbnail controls (Called by HTML onclick)
function currentSlide(n) {
  clearInterval(slideTimer);
  showSlides(slideIndex = n);
  startAutoSlide();
}

// Main Logic
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (slides.length === 0) return; 

  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

// Function to Start Automatic Sliding
function startAutoSlide() {
  slideTimer = setInterval(() => {
    plusSlides(1); // Simulate clicking "Next" every 3 seconds
  }, 3000); // 3000ms = 3 seconds
}