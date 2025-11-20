document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loader Logic
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) loader.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 1500);

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 3. Smooth Scrolling with Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // 4. Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 100);
                
                // Stats Counter Animation logic
                if (entry.target.classList.contains('stat-item')) {
                    const counter = entry.target.querySelector('.stat-number');
                    if(counter && (counter.innerText === '0' || counter.innerText === '0+')) {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += step;
                            if (current < target) {
                                counter.textContent = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target + '+';
                            }
                        };
                        updateCounter();
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.animate-on-scroll, .slide-in-left, .slide-in-right, .scale-in, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // 5. Dynamic Navigation Background on Scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(0, 51, 102, 0.95)';
            nav.style.boxShadow = '0 5px 30px rgba(0,0,0,0.2)';
        } else {
            nav.style.background = 'linear-gradient(90deg, var(--primary-color) 0%, var(--accent-color) 100%)';
            nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        }
        
        // Hide/show nav on scroll
        if (currentScroll > lastScroll && currentScroll > 500) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // 6. Ripple Effect for Buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add Ripple Keyframes via JS if not in CSS
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});