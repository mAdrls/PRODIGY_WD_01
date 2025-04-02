document.addEventListener("DOMContentLoaded", () => {
    
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    
   
    createScrollTopButton();
    
    
    init();
    
    
    function init() {
        
        setupEventListeners();
        
       
        highlightNavOnScroll();
        
       
        setupScrollAnimations();
        
       
        setupContactForm();
    }
    
    
    function setupEventListeners() {
        
        menuToggle.addEventListener("click", toggleMobileMenu);
        
        
        navLinksItems.forEach(item => {
            item.addEventListener("click", closeMobileMenu);
        });
        
        
        window.addEventListener("scroll", handleScroll);
        
        
        window.addEventListener("resize", handleResize);
        
        
        const contactForm = document.querySelector(".contact-form");
        if (contactForm) {
            contactForm.addEventListener("submit", handleFormSubmit);
        }
    }
    

    function toggleMobileMenu() {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    }
    
   
    function closeMobileMenu() {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }
    
   
    function handleScroll() {
       
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
      
        highlightNavOnScroll();
        
      
        toggleScrollTopButton();
        
       
        animateOnScroll();
    }
    
   
    function handleResize() {
       
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    }
    
    
    function highlightNavOnScroll() {
       
        let scrollPosition = window.scrollY;
        
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
               
                navLinksItems.forEach(item => {
                    item.classList.remove("active");
                });
                
               
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }
    
    
    function createScrollTopButton() {
        const scrollTopButton = document.createElement("div");
        scrollTopButton.classList.add("scroll-top");
        scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(scrollTopButton);
        
     
        scrollTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    
   
    function toggleScrollTopButton() {
        const scrollTopButton = document.querySelector(".scroll-top");
        if (window.scrollY > 500) {
            scrollTopButton.classList.add("show");
        } else {
            scrollTopButton.classList.remove("show");
        }
    }
    
  
    function setupScrollAnimations() {
      
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate");
                }
            });
        }, { threshold: 0.1 });
        
       
        const animateElements = document.querySelectorAll(".service-card, .stat-item, .about-text p, .contact-item");
        
      
        animateElements.forEach(el => {
            observer.observe(el);
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        });
    }
    
   
    function animateOnScroll() {
        const animateElements = document.querySelectorAll(".animate");
        animateElements.forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    }
    
  
    function handleFormSubmit(e) {
        e.preventDefault();
        
       
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        
    
        if (!name || !email || !message) {
            showFormMessage("Please fill in all required fields", "error");
            return;
        }
        
       
        console.log("Form submitted:", { name, email, subject, message });
        
    
        showFormMessage("Message sent successfully! We'll get back to you soon.", "success");
        
       
        e.target.reset();
    }
    
   
    function showFormMessage(message, type) {
       
        const existingMessage = document.querySelector(".form-message");
        if (existingMessage) {
            existingMessage.remove();
        }
        
        
        const messageElement = document.createElement("div");
        messageElement.classList.add("form-message", type);
        messageElement.textContent = message;
        
       
        const form = document.querySelector(".contact-form");
        form.appendChild(messageElement);
        
        
        messageElement.style.padding = "1rem";
        messageElement.style.marginTop = "1rem";
        messageElement.style.borderRadius = "var(--border-radius)";
        messageElement.style.fontWeight = "500";
        
        if (type === "success") {
            messageElement.style.backgroundColor = "rgba(46, 204, 113, 0.2)";
            messageElement.style.color = "#2ecc71";
        } else {
            messageElement.style.backgroundColor = "rgba(231, 76, 60, 0.2)";
            messageElement.style.color = "#e74c3c";
        }
        
       
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
    
    
    function setupContactForm() {
       
        const inputs = document.querySelectorAll(".form-group input, .form-group textarea");
        
        inputs.forEach(input => {
         
            input.addEventListener("focus", () => {
                input.style.boxShadow = "0 0 0 2px rgba(244, 162, 97, 0.3)";
            });
            
            input.addEventListener("blur", () => {
                input.style.boxShadow = "none";
                
                
                if (input.value.trim() === "" && input.hasAttribute("required")) {
                    input.style.borderLeft = "3px solid #e74c3c";
                } else {
                    input.style.borderLeft = "3px solid #2ecc71";
                }
            });
        });
    }
});