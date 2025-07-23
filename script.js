document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    window.addEventListener('scroll', function () {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.getElementById('skills');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    };

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

        setTimeout(() => {
            if (skillBars[0] && skillBars[0].style.width === '0%') {
                animateSkillBars();
            }
        }, 5000);
    }

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

            const webhookUrl = atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTM5NzI0Mjg0MDU1MDk5ODEwNy9XWmpYa1JrY2JLd3FSNUNWZkU1TXdQclhnQVpLanh4T3pnRGQwQVlmMXZmY05KRDdvelJwQnEzcjFLazhfaG5pMFZqaw==');

            const payload = {
                embeds: [{
                    title: 'New Contact Form Submission',
                    color: 0x00ff00,
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
