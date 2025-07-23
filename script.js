document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Sticky navbar effect
    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Skill bar animation (trigger when visible)
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    };

    // IntersectionObserver for skill bars
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(skillsSection);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillsSection);

        // Fallback: Trigger animation after 5 seconds if not already triggered
        setTimeout(() => {
            if (skillBars[0] && skillBars[0].style.width === '0%') {
                animateSkillBars();
            }
        }, 5000);
    }

    // Fade-in animation for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Contact form submission to Discord webhook
    const contactForm = document.getElementById('contact-form');
    const contactBtn = document.getElementById('contact-btn');
    if (contactForm && contactBtn) {
        contactBtn.addEventListener('click', async function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all fields.');
                return;
            }

            const webhookUrl = 'https://discord.com/api/webhooks/1397242840550998107/WZjXkRkcbKwqR5CVfE5MwPrXgAZKjxxOzgDd0AYf1vfcNJD7ozRpBq3r1Kk8_hni0Vjk'; // Replace with your Discord webhook URL

            const payload = {
                embeds: [{
                    title: 'New Contact Form Submission',
                    color: 0x00ff00, // Neon green color to match theme
                    fields: [
                        { name: 'Name', value: name, inline: true },
                        { name: 'Email', value: email, inline: true },
                        { name: 'Message', value: message, inline: false }
                    ],
                    timestamp: new Date().toISOString()
                }]
            };

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('Failed to send message. Please try again later.');
                }
            } catch (error) {
                console.error('Error sending webhook:', error);
                alert('An error occurred. Please try again later.');
            }
        });
    }
});