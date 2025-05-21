// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle between hamburger and X icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Project tabs functionality
    const projectTabs = document.querySelectorAll('.project-tab');
    
    projectTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            projectTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all project categories
            const projectCategories = document.querySelectorAll('.projects-category');
            projectCategories.forEach(category => {
                category.classList.remove('active');
            });
            
            // Show the selected category
            const targetCategory = this.getAttribute('data-target');
            document.getElementById(targetCategory).classList.add('active');
        });
    });
    
    // Experience tabs functionality
    const experienceTabs = document.querySelectorAll('.experience-tab');

    experienceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            experienceTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all experience details
            const experienceDetails = document.querySelectorAll('.experience-detail');
            experienceDetails.forEach(detail => {
                detail.classList.remove('active');
            });
            
            // Show the selected experience detail
            const targetDetail = this.getAttribute('data-target');
            document.getElementById(targetDetail).classList.add('active');
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide any previous messages
            formSuccess.style.display = 'none';
            formError.style.display = 'none';
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just show a success message
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                formSuccess.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 1000);
        });
    }
    
    // Animate skills bars when they come into view
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage;
        });
    };
    
    // Trigger animations when scrolling
    const handleScroll = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate');
                
                // If this is the skills section, animate the skill bars
                if (section.id === 'skills') {
                    animateSkillBars();
                }
            }
        });
    };
    
    // Initial check on page load
    handleScroll();
    
    // Check on scroll
    window.addEventListener('scroll', handleScroll);
});

// Certificates carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.certificate-card'));
  const dotsContainer = document.querySelector('.carousel-dots');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  
  if (!track || slides.length === 0 || !dotsContainer || !prevButton || !nextButton) return;
  
  // Group certificates into sets of 3
  const slidesPerView = 3;
  const slideGroups = [];
  
  // Create slide groups with 3 certificates each
  for (let i = 0; i < slides.length; i += slidesPerView) {
    slideGroups.push(slides.slice(i, i + slidesPerView));
  }
  
  // Clear the track and rebuild it with grouped slides
  track.innerHTML = '';
  
  slideGroups.forEach(group => {
    const slideElement = document.createElement('div');
    slideElement.className = 'certificate-slide';
    
    const gridElement = document.createElement('div');
    gridElement.className = 'certificates-grid';
    
    group.forEach(certificate => {
      gridElement.appendChild(certificate.cloneNode(true));
    });
    
    slideElement.appendChild(gridElement);
    track.appendChild(slideElement);
  });
  
  // Get the new slides after rebuilding
  const newSlides = document.querySelectorAll('.certificate-slide');
  let currentIndex = 0;
  const slideWidth = 100; // 100%
  
  // Create dots
  dotsContainer.innerHTML = '';
  Array.from(newSlides).forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.carousel-dot');
  
  // Set initial position
  updateCarousel();
  
  // Event listeners
  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + newSlides.length) % newSlides.length;
    updateCarousel();
  });
  
  nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % newSlides.length;
    updateCarousel();
  });
  
  // Auto slide every 5 seconds
  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % newSlides.length;
    updateCarousel();
  }, 5000);
  
  // Pause auto slide on hover
  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  carouselContainer.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % newSlides.length;
      updateCarousel();
    }, 5000);
  });
  
  // Touch events for mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;
  
  carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left, go to next slide
      currentIndex = (currentIndex + 1) % newSlides.length;
      updateCarousel();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right, go to previous slide
      currentIndex = (currentIndex - 1 + newSlides.length) % newSlides.length;
      updateCarousel();
    }
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }
  
  function updateCarousel() {
    // Update track position
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
});

// Debug image loading issues
document.addEventListener('DOMContentLoaded', function() {
  const certificateImages = document.querySelectorAll('.certificate-image img');
  
  certificateImages.forEach(img => {
    img.addEventListener('error', function() {
      console.error(`Failed to load image: ${this.src}`);
      
      // Add a placeholder background
      this.style.display = 'none';
      this.parentElement.style.backgroundColor = '#1E293B';
      
      // Add a placeholder icon
      const placeholder = document.createElement('div');
      placeholder.innerHTML = '<i class="fas fa-certificate" style="font-size: 3rem; color: var(--primary-color);"></i>';
      placeholder.style.display = 'flex';
      placeholder.style.alignItems = 'center';
      placeholder.style.justifyContent = 'center';
      placeholder.style.height = '100%';
      this.parentElement.appendChild(placeholder);
    });
  });
});

// AI Projects enhancement
document.addEventListener('DOMContentLoaded', function() {
  const aiProjects = document.querySelectorAll('#ai-projects .project-card');
  
  aiProjects.forEach((project, index) => {
    // Add staggered animation delay
    project.style.animationDelay = `${index * 0.2}s`;
    
    // Add detailed descriptions on hover
    const projectInfo = project.querySelector('.project-info p');
    let originalText = projectInfo.textContent;
    let detailedText = '';
    
    // Set detailed text based on project title
    if (project.querySelector('h3').textContent.includes('Phishing')) {
      detailedText = `
        🔍 Uses NLP to analyze email content and headers
        🧠 Trained on 10,000+ labeled phishing examples
        🛡️ 95% detection accuracy on test dataset
        ⚡ Real-time analysis with low false positives
      `;
    } else if (project.querySelector('h3').textContent.includes('Insurance')) {
      detailedText = `
        📊 Analyzes historical claims data
        🏠 Evaluates building risk factors
        💡 Uses ensemble algorithms (XGBoost)
        📈 Optimizes insurance premiums based on risk
        🔄 Developed for an internal insurance competition
      `;
    }
    
    // Add hover effects
    project.addEventListener('mouseenter', function() {
      if (detailedText) {
        projectInfo.innerHTML = detailedText;
        projectInfo.style.whiteSpace = 'pre-line';
      }
      
      // Add pulsing effect to tech tags
      const techTags = this.querySelectorAll('.project-tech span');
      techTags.forEach((tag, i) => {
        setTimeout(() => {
          tag.classList.add('pulse-animation');
        }, i * 100);
      });
    });
    
    project.addEventListener('mouseleave', function() {
      projectInfo.textContent = originalText;
      projectInfo.style.whiteSpace = 'normal';
      
      // Remove pulsing effect
      const techTags = this.querySelectorAll('.project-tech span');
      techTags.forEach(tag => {
        tag.classList.remove('pulse-animation');
      });
    });
  });
  
  // Add CSS for pulse animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse-tag {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .pulse-animation {
      animation: pulse-tag 1s infinite;
    }
  `;
  document.head.appendChild(style);
  
  // Add interactive background effect for AI projects section
  const aiProjectsSection = document.getElementById('ai-projects');
  if (aiProjectsSection) {
    // Create neural network background effect
    const networkBackground = document.createElement('div');
    networkBackground.classList.add('network-background');
    networkBackground.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 0.1;
      pointer-events: none;
    `;
    
    aiProjectsSection.style.position = 'relative';
    aiProjectsSection.insertBefore(networkBackground, aiProjectsSection.firstChild);
    
    // Add neural network nodes and connections
    for (let i = 0; i < 20; i++) {
      const node = document.createElement('div');
      node.classList.add('network-node');
      node.style.cssText = `
        position: absolute;
        width: 5px;
        height: 5px;
        background-color: var(--accent-color);
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
      `;
      networkBackground.appendChild(node);
    }
  }
});

// Preloader functionality
document.addEventListener('DOMContentLoaded', function() {
  // Show preloader
  const preloader = document.getElementById('preloader');
  const progressBar = document.querySelector('.loading-progress');
  
  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(function() {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    progressBar.style.width = progress + '%';
  }, 200);
  
  // Hide preloader when page is fully loaded
  window.addEventListener('load', function() {
    // Ensure progress bar reaches 100%
    progressBar.style.width = '100%';
    
    // Add a slight delay for better visual effect
    setTimeout(function() {
      preloader.classList.add('preloader-hidden');
      
      // Enable scrolling on body
      document.body.style.overflow = 'auto';
      
      // Remove preloader from DOM after animation completes
      setTimeout(function() {
        preloader.style.display = 'none';
      }, 800);
    }, 1000); // 1 second delay after loading completes
  });
  
  // Disable scrolling while preloader is active
  document.body.style.overflow = 'hidden';
  
  // Add animated text effect to the loading text
  const loadingText = document.querySelector('.loading-text');
  const text = loadingText.textContent;
  loadingText.textContent = '';
  
  // Animate each letter with a delay
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.style.animationDelay = `${i * 0.1}s`;
    span.style.opacity = '0';
    span.style.animation = 'fadeInLetter 0.5s forwards';
    span.style.display = 'inline-block';
    loadingText.appendChild(span);
  }
  
  // Add CSS for letter animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInLetter {
      0% { opacity: 0; transform: translateY(10px); }
      100% { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  
  // Add particles to the preloader background
  createPreloaderParticles();
});

// Create animated particles in the preloader
function createPreloaderParticles() {
  const preloader = document.getElementById('preloader');
  
  // Create container for particles
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.overflow = 'hidden';
  particlesContainer.style.zIndex = '-1';
  
  preloader.appendChild(particlesContainer);
  
  // Create particles
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = Math.random() * 5 + 2;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;
    
    // Random animation duration
    const duration = Math.random() * 10 + 5;
    
    // Set styles
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background-color: var(--primary-color);
      border-radius: 50%;
      top: ${posY}%;
      left: ${posX}%;
      opacity: ${opacity};
      animation: float ${duration}s infinite ease-in-out;
    `;
    
    particlesContainer.appendChild(particle);
  }
}




