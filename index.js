// Portfolio JavaScript

// Project data
const projects = [
  {
    category: "web",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    link: "https://kumbisaleh.onrender.com",
  },
  {
    category: "web",
    title: "An Inventory, Content and Personnel Management System",
    description: "Full Stack React Application",
    tech: ["Next.js", "MongoDB", "React", "PostgreSQL"],
    link: "https://cmsmaestro.onrender.com"
  },
    {
    category: "web",
    title: "An Online Pastry Selling Service",
    description: "Full-stack e-commerce solution with delivery and payment terms integration",
    tech: ["Next.js", "TypeScript", "MongoDB", "PostgreSQL"],
    link: "https://eucabites.onrender.com"
  },
  {
    category: "web",
    title: "Professional Portfolio Website",
    description: "Complete portfolio website for a medical professional",
    tech: ["React", "JavaScript", "Brand Strategy", "Node.js"],
    link: "https://maggiegyamfi.site"
  },
  {
    category: "design",
    title: "Mobile App Design",
    description: "UI/UX design for an Inventory Management Mobile Application",
    tech: ["Figma", "Prototyping", "User Testing", "Design System"],
    link: "#"
  },
  {
    category: "writing",
    title: "API Documentation",
    description: "Comprehensive documentation for REST API with interactive examples",
    tech: ["Markdown", "OpenAPI", "Postman", "Technical Writing"],
    link: "#"
  },
  {
    category: "web",
    title: "Professional Website for Personally co-founded Organization",
    description: "Complete website for a Web Development/ Design and Graphic Design, Mobile Development and SaaS soltions company",
    tech: ["React", "JavaScript", "Brand Strategy", "Node.js"],
    link: "https://flyarcdevs.site"
  }
];

// Global variables
let mouseFollower;
let currentCategory = 'all';

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
  initializeLucideIcons();
  createMouseFollower();
  setupEventListeners();
  renderProjects();
  setupAnimations();
  setupNavigation();
});

// Initialize Lucide icons
function initializeLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Create mouse follower effect
function createMouseFollower() {
  mouseFollower = document.createElement('div');
  mouseFollower.className = 'mouse-follower';
  document.body.appendChild(mouseFollower);
  
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth following animation
  function animateFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;
    
    followerX += dx * 0.1;
    followerY += dy * 0.1;
    
    mouseFollower.style.transform = `translate(${followerX - 300}px, ${followerY - 300}px)`;
    
    requestAnimationFrame(animateFollower);
  }
  
  animateFollower();
}

// Setup event listeners
function setupEventListeners() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Button hover effects
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Card hover effects
  document.querySelectorAll('.hover-card, .service-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', handleNavbarScroll);
  
  // Intersection Observer for animations
  setupIntersectionObserver();
}

// Handle navbar scroll effect
function handleNavbarScroll() {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 100) {
    nav.style.background = 'rgba(255, 255, 255, 0.95)';
    nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.background = 'rgba(255, 255, 255, 0.9)';
    nav.style.boxShadow = 'none';
  }
}

// Setup intersection observer for scroll animations
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  document.querySelectorAll('.card, .service-card, .project-card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
}

// Setup navigation highlighting
function setupNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

// Scroll to section function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Show category function for work section
function showCategory(category) {
  currentCategory = category;
  
  // Update active tab
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  // Render filtered projects
  renderProjects();
}

// Render projects
function renderProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  const filteredProjects = currentCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === currentCategory);
  
  projectsGrid.innerHTML = '';
  
  filteredProjects.forEach((project, index) => {
    const projectCard = createProjectCard(project, index);
    projectsGrid.appendChild(projectCard);
  });
  
  // Reinitialize Lucide icons for new elements
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  
  // Add animation delay for stagger effect
  document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// Create project card
function createProjectCard(project, index) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.setAttribute('data-category', project.category);
  
  card.innerHTML = `
    <div class="project-image">
      ${project.title.charAt(0)}
    </div>
    <div class="project-content">
      <div class="project-header">
        <h3 class="project-title">${project.title}</h3>
        <i class="project-link" data-lucide="external-link"></i>
      </div>
      <p class="project-description">${project.description}</p>
      <div class="project-tech">
        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
    </div>
  `;
  
  // Add click handler
  card.addEventListener('click', () => {
    if (project.link && project.link !== '#') {
      window.open(project.link, '_blank');
    }
  });
  
  // Add hover effects
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
    this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '';
  });
  
  return card;
}

// Setup animations
function setupAnimations() {
  // Hero section animation
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }
  
  // Floating animation for badges
  document.querySelectorAll('.badge').forEach((badge, index) => {
    badge.style.animation = `float 6s ease-in-out infinite`;
    badge.style.animationDelay = `${index * 0.5}s`;
  });
  
  // Stagger animation for service cards
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    // Close any open modals or menus
    document.querySelectorAll('.modal, .dropdown').forEach(el => {
      el.style.display = 'none';
    });
  }
});

// Performance optimization
const debouncedResize = debounce(() => {
  // Handle resize events
  if (window.innerWidth < 768) {
    // Mobile optimizations
    document.querySelectorAll('.hover-card').forEach(card => {
      card.style.transform = 'none';
    });
  }
}, 250);

window.addEventListener('resize', debouncedResize);

// Accessibility improvements
function setupAccessibility() {
  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only';
  skipLink.style.position = 'absolute';
  skipLink.style.top = '-40px';
  skipLink.style.left = '6px';
  skipLink.style.background = 'var(--primary)';
  skipLink.style.color = 'white';
  skipLink.style.padding = '8px';
  skipLink.style.textDecoration = 'none';
  skipLink.style.zIndex = '1000';
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '6px';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Ensure all interactive elements are keyboard accessible
  document.querySelectorAll('.btn, .tab-btn, .project-card').forEach(el => {
    if (!el.getAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
    
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });
}

// Initialize accessibility features
setupAccessibility();

// Contact form handling (if needed in the future)
function handleContactForm(event) {
  event.preventDefault();
  // Add contact form logic here
  console.log('Contact form submitted');
}

// Smooth reveal animations
function addRevealAnimations() {
  const reveals = document.querySelectorAll('.section-header, .hero-content, .about-cards, .services-grid, .contact-content');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15
  });
  
  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });
}

// Initialize reveal animations
addRevealAnimations();

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showCategory = showCategory;

// Console message for developers
console.log(`
🎨 Creative Developer Portfolio
Built with vanilla HTML, CSS, and JavaScript
Features:
- Responsive design
- Smooth animations
- Interactive elements
- Accessibility features
- Performance optimized

Feel free to explore the code!
`);

// Service Worker registration (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
