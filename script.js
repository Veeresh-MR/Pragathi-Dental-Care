// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        
        // Toggle body scroll when menu is open
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    // Set home as active by default
    document.querySelector('#home').classList.add('active');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                document.body.style.overflow = '';
            }
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show clicked section
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).classList.add('active');
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.luxury-header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });

    // Results Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Scroll Animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .service-card, .pricing-card, .result-card, .location-info, .contact-info, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    document.querySelectorAll('.feature-card, .service-card, .pricing-card, .result-card, .location-info, .contact-info, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.service-image').style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.service-image').style.transform = 'scale(1)';
        });
    });

    // Hover effects for before/after images
    const beforeAfterImages = document.querySelectorAll('.before img, .after img');
    beforeAfterImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn') && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

 // =========================
        // CURSOR & PARTICLE TRAIL
        // =========================
        const glow = document.getElementById('cursorGlow');
        const ring = document.getElementById('cursorRing');
        const trail = document.getElementById('trail');
        const tctx = trail.getContext('2d');
        
        function resizeCanvas() { 
            trail.width = window.innerWidth; 
            trail.height = window.innerHeight; 
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        let particles = [];
        let tx = window.innerWidth / 2, 
            ty = window.innerHeight / 2, 
            gx = tx, 
            gy = ty;
        
        const addParticle = (x, y) => {
            const hue = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--accent')) || 200) + Math.random() * 40 % 360;
            particles.push({
                x, y, 
                vx: (Math.random() - 0.5) * 1.6, 
                vy: (Math.random() - 0.5) * 1.6, 
                life: 1, 
                size: Math.random() * 3 + 1, 
                hue: hue
            });
        };
        
        document.addEventListener('pointermove', (e) => { 
            tx = e.clientX; 
            ty = e.clientY; 
            for(let i = 0; i < 3; i++) addParticle(tx, ty); 
        }, { passive: true });
        
        document.addEventListener('click', () => { 
            for(let i = 0; i < 20; i++) addParticle(tx, ty); 
            ring.style.transition = 'transform .2s ease';
            ring.style.transform = 'translate(-50%,-50%) scale(1.3)';
            setTimeout(() => ring.style.transform = 'translate(-50%,-50%) scale(1)', 150);
        });
        
        function drawTrail(dt) {
            tctx.clearRect(0, 0, trail.width, trail.height);
            gx += (tx - gx) * 0.18;
            gy += (ty - gy) * 0.18;
            
            glow.style.left = gx + 'px';
            glow.style.top = gy + 'px';
            ring.style.left = tx + 'px';
            ring.style.top = ty + 'px';
            
            // Update and draw particles
            for(let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96;
                p.vy *= 0.96;
                p.life -= 0.008;
                
                if(p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }
                
                const g = tctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6);
                g.addColorStop(0, `hsla(${p.hue},100%,70%,${p.life})`);
                g.addColorStop(1, `hsla(${(p.hue + 40) % 360},100%,60%,0)`);
                
                tctx.fillStyle = g;
                tctx.beginPath();
                tctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                tctx.fill();
            }
        }
        
        // =========================
        // 3D CARD TILT EFFECT
        // =========================
        function init3DCards() {
            const cards = document.querySelectorAll('.service-card-3d');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateY = (x - centerX) / 25;
                    const rotateX = (centerY - y) / 25;
                    
                    card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.05, 1.05, 1.05)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale3d(1, 1, 1)';
                });
            });
        }
        
        // =========================
        // ANIMATION LOOP
        // =========================
        let lastTime = performance.now();
        function animate(currentTime) {
            const dt = currentTime - lastTime;
            lastTime = currentTime;
            
            drawTrail(dt);
            requestAnimationFrame(animate);
        }
        
        // Initialize everything when page loads
        window.addEventListener('load', () => {
            requestAnimationFrame(animate);
            init3DCards();
            
            // Add 3D class to service cards
            document.querySelectorAll('.service-card').forEach(card => {
                card.classList.add('service-card-3d');
            });
            
            // Add 3D class to feature cards
            document.querySelectorAll('.feature-card').forEach(card => {
                card.classList.add('service-card-3d');
            });
        });



         document.addEventListener('DOMContentLoaded', function() {
            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            const themeIcon = themeToggle.querySelector('i');
            const body = document.body;
            
            // Check for saved theme preference or respect OS preference
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                body.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            
            themeToggle.addEventListener('click', () => {
                if (body.getAttribute('data-theme') === 'light') {
                    body.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    themeIcon.classList.remove('fa-moon');
                    themeIcon.classList.add('fa-sun');
                } else {
                    body.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                    themeIcon.classList.remove('fa-sun');
                    themeIcon.classList.add('fa-moon');
                }
            });
            
            // Custom Cursor
            const cursor = document.getElementById('cursor');
            const cursorFollower = document.getElementById('cursorFollower');
            const links = document.querySelectorAll('a, button, .btn');
            
            // Hide default cursor
            document.body.style.cursor = 'none';
            
            // Move cursor
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            });
            
            // Cursor effects on links
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    cursor.classList.add('active');
                    cursorFollower.classList.add('active');
                });
                
                link.addEventListener('mouseleave', () => {
                    cursor.classList.remove('active');
                    cursorFollower.classList.remove('active');
                });
            });
            
            // Cursor click effect
            document.addEventListener('mousedown', () => {
                cursor.classList.add('click');
                cursorFollower.classList.add('click');
            });
            
            document.addEventListener('mouseup', () => {
                cursor.classList.remove('click');
                cursorFollower.classList.remove('click');
            });
            
            // Particle Effect
            const canvas = document.getElementById('particles');
            const ctx = canvas.getContext('2d');
            let particlesArray = [];
            
            // Set canvas size
            function setCanvasSize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
            
            setCanvasSize();
            window.addEventListener('resize', setCanvasSize);
            
            // Particle class
            class Particle {
                constructor() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.size = Math.random() * 2 + 1;
                    this.speedX = Math.random() * 3 - 1.5;
                    this.speedY = Math.random() * 3 - 1.5;
                    this.color = body.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#1a1a1a';
                }
                
                update() {
                    this.x += this.speedX;
                    this.y += this.speedY;
                    
                    if (this.x > canvas.width || this.x < 0) {
                        this.speedX = -this.speedX;
                    }
                    
                    if (this.y > canvas.height || this.y < 0) {
                        this.speedY = -this.speedY;
                    }
                }
                
                draw() {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            // Create particles
            function initParticles() {
                particlesArray = [];
                const numberOfParticles = (canvas.width * canvas.height) / 9000;
                
                for (let i = 0; i < numberOfParticles; i++) {
                    particlesArray.push(new Particle());
                }
            }
            
            // Animation loop
            function animateParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                    particlesArray[i].draw();
                }
                
                // Connect particles with lines
                connectParticles();
                
                requestAnimationFrame(animateParticles);
            }
            
            // Connect particles with lines
            function connectParticles() {
                const maxDistance = 100;
                
                for (let a = 0; a < particlesArray.length; a++) {
                    for (let b = a; b < particlesArray.length; b++) {
                        const dx = particlesArray[a].x - particlesArray[b].x;
                        const dy = particlesArray[a].y - particlesArray[b].y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < maxDistance) {
                            const opacity = 1 - distance / maxDistance;
                            ctx.strokeStyle = body.getAttribute('data-theme') === 'dark' ? 
                                `rgba(255, 255, 255, ${opacity * 0.2})` : 
                                `rgba(26, 26, 26, ${opacity * 0.2})`;
                            ctx.lineWidth = 1;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                            ctx.stroke();
                        }
                    }
                }
            }
            
            // Initialize and start animation
            initParticles();
            animateParticles();
            
            // Update particle colors when theme changes
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'data-theme') {
                        particlesArray.forEach(particle => {
                            particle.color = body.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#1a1a1a';
                        });
                    }
                });
            });
            
            observer.observe(body, {
                attributes: true
            });
            
            // Mobile menu toggle
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const mainNav = document.querySelector('.main-nav');
            
            mobileMenuBtn.addEventListener('click', function() {
                mainNav.classList.toggle('active');
                this.querySelector('i').classList.toggle('fa-bars');
                this.querySelector('i').classList.toggle('fa-times');
            });
        });














        // Show More Reviews Button (Batch Reveal)
const showMoreBtn = document.getElementById('show-more-reviews');
const hiddenReviews = document.querySelectorAll('.hidden-review');
let reviewsToShow = 6; // how many reviews to show per click
let currentIndex = 0;

if (showMoreBtn) {
  showMoreBtn.addEventListener('click', () => {
    for (let i = currentIndex; i < currentIndex + reviewsToShow && i < hiddenReviews.length; i++) {
      hiddenReviews[i].style.display = 'block';
    }
    currentIndex += reviewsToShow;

    // Hide button if all reviews are shown
    if (currentIndex >= hiddenReviews.length) {
      showMoreBtn.style.display = 'none';
    }
  });
}




// Auto-increment Doctor Experience by Year
const experienceElement = document.getElementById('doctor-experience');

// Suppose doctor started practice in 2012
const startYear = 2011  ;  
const currentYear = new Date().getFullYear();
const experience = currentYear - startYear;

if (experienceElement) {
  experienceElement.textContent = experience;
}





