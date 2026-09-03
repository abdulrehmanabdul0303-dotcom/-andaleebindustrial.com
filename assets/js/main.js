// Preloader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('preloader').classList.add('hidden');
            }, 600);
        });

        // Mobile Menu
        function toggleMobileMenu() {
            document.getElementById('mainNav').classList.toggle('active');
        }

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Counter Animation
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const text = counter.textContent;
                const hasPlus = text.includes('+');
                const hasPercent = text.includes('%');
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        let display = Math.floor(current);
                        if (hasPlus) display += '+';
                        if (hasPercent) display += '%';
                        counter.textContent = display;
                        requestAnimationFrame(updateCounter);
                    } else {
                        let display = target;
                        if (hasPlus) display += '+';
                        if (hasPercent) display += '%';
                        counter.textContent = display;
                    }
                };
                updateCounter();
            });
        }

        // Scroll Reveal
        const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.closest('.stats')) {
                        animateCounters();
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
            revealObserver.observe(el);
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    document.getElementById('mainNav').classList.remove('active');
                }
            });
        });

        // Active Nav Link
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                if (window.scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });

        // Form Handler
        function handleFormSubmit(event) {
            event.preventDefault();
            const form = event.target;
            const lang = document.documentElement.lang || 'en';
            const dict = (typeof translations !== 'undefined' && translations[lang]) || {};
            alert(dict['formAlert'] || 'Thank you for contacting Andaleeb Industrial Company! We have received your service request and will get back to you shortly.');
            form.reset();
        }

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            const nav = document.getElementById('mainNav');
            const toggle = document.querySelector('.mobile-toggle');
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
