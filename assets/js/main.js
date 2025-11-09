const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

const navLinks = document.querySelectorAll('.nav__link')
const dropdownLinks = document.querySelectorAll('.dropdown-menu a')

function closeNav(){
    const navMenu = document.getElementById('nav-menu')
    if (navMenu) {
        navMenu.classList.remove('show')
    }
    document.querySelectorAll('.nav__item.dropdown.open').forEach(item => item.classList.remove('open'))
}

navLinks.forEach(link => {
    if (link.parentElement?.classList?.contains('dropdown')) {
        return
    }
    link.addEventListener('click', closeNav)
})

dropdownLinks.forEach(link => link.addEventListener('click', closeNav))

const dropdownToggles = document.querySelectorAll('.nav__item.dropdown > a')

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', event => {
        event.preventDefault()
        const parent = toggle.parentElement
        const isOpen = parent.classList.contains('open')
        document.querySelectorAll('.nav__item.dropdown.open').forEach(item => {
            if (item !== parent) {
                item.classList.remove('open')
            }
        })
        parent.classList.toggle('open', !isOpen)
    })
})

window.addEventListener('resize', () => {
    // Le dropdown reste ouvert après redimensionnement
})

const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')
        
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        if (navLink) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                navLink.classList.add('active')
            } else {
                navLink.classList.remove('active')
            }
        }
    })
}

let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            scrollActive();
            ticking = false;
        });
        ticking = true;
    }
});

if (document.querySelector('.home__data')) {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 1000,
        delay: 0,
        mobile: true,
    });

    sr.reveal('.home__title',{delay: 0, duration: 1000, reset: false, origin: 'top'}); 
    sr.reveal('.home__button',{delay: 200, duration: 800, reset: false, distance: '50px', origin: 'top', interval: 50});
    sr.reveal('.home__social-icon',{delay: 150, interval: 100, duration: 800, origin: 'top'});
    sr.reveal('.home__img',{delay: 100, duration: 1000, reset: false, origin: 'top'}); 
    sr.reveal('.section-title',{duration: 1000, reset: false, origin: 'top'});
    sr.reveal('.terminal-box',{delay: 200, duration: 1000, reset: false, origin: 'top', distance: '60px'});
    sr.reveal('.about__subtitle',{delay: 100, duration: 1000, reset: false, origin: 'top'}); 
    sr.reveal('.about__text',{delay: 100, duration: 1000, reset: false, origin: 'top'}); 
    sr.reveal('.skills__subtitle',{duration: 1000, reset: false, origin: 'top'}); 
    sr.reveal('.skills__text',{duration: 1000, reset: false, origin: 'top'});
    sr.reveal('.skills__img-container',{delay: 100, duration: 1000, reset: false, origin: 'top'}); 
    sr.reveal('.skills__data',{interval: 100, duration: 1000, origin: 'top'});
    sr.reveal('.work__img',{interval: 100, duration: 1000, origin: 'top'}); 
    sr.reveal('.contact__input',{interval: 100, duration: 1000, origin: 'top'});
    sr.reveal('.work__item',{delay: 100, interval: 100, duration: 1000, origin: 'top'});
    sr.reveal('.contact__button',{delay: 200, duration: 1000, origin: 'top'});
    sr.reveal('.footer__contact, .footer__copy',{delay: 200, duration: 1000, origin: 'top'});
}

if (typeof emailjs !== 'undefined') {
    emailjs.init({
        publicKey: "V30xUu9gPcMqyKdiA"
    });

    window.addEventListener('load', function() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const button = this.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.disabled = true;
                button.textContent = 'Sending...';
                
                emailjs.sendForm('service_wfaijdo', 'template_dre7qre', this)
                    .then(() => {
                        alert('Message sent successfully!');
                        this.reset();
                        button.textContent = originalText;
                    }, (error) => {
                        console.error('EmailJS error:', error);
                        alert('Failed to send message. Please try again.');
                        button.textContent = originalText;
                    })
                    .finally(() => {
                        button.disabled = false;
                    });
            });
        }
    });
}

const commands = [
    'mkdir new-project',
    'cd new-project && git clone https://github.com/RomeoCavazza/setup-os',
    'nix flake update',
    'docker-compose up -d',
    'ssh romeo@server "git pull origin main"',
    'ls -la',
    'echo "Hello from terminal"',
    'npm run deploy'
];

let currentCommand = 0;
let isTyping = false;

function typeCommand() {
    const commandEl = document.getElementById('terminal-command');
    if (!commandEl) return;

    if (isTyping) return;
    isTyping = true;
    const cmd = commands[currentCommand];
    let i = 0;
    
    commandEl.textContent = '';
    
    const typingInterval = setInterval(() => {
        if (i < cmd.length) {
            commandEl.textContent = commandEl.textContent + cmd[i];
            i++;
        } else {
            clearInterval(typingInterval);
            setTimeout(() => {
                const deletingInterval = setInterval(() => {
                    if (commandEl.textContent.length > 0) {
                        commandEl.textContent = commandEl.textContent.slice(0, -1);
                    } else {
                        clearInterval(deletingInterval);
                        currentCommand = (currentCommand + 1) % commands.length;
                        isTyping = false;
                        setTimeout(typeCommand, 500);
                    }
                }, 50);
            }, 2000);
        }
    }, 100);
}

window.addEventListener('load', function() {
    const commandEl = document.getElementById('terminal-command');
    if (commandEl) {
        typeCommand();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.project-img') && !document.querySelector('.home__data')) {
        const sr = ScrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 1000,
            delay: 0,
            mobile: true,
        });

        sr.reveal('.section-title', { duration: 1000, reset: false, origin: 'top' });
        sr.reveal('.project-text', { delay: 100, duration: 1000, reset: false, origin: 'top' });
        sr.reveal('.project-img', { delay: 200, duration: 1000, distance: '80px', reset: false, origin: 'top' });
        sr.reveal('.badges-container', { delay: 300, duration: 1000, reset: false, origin: 'top', distance: '40px' });
        sr.reveal('.seminar-card', { interval: 150, duration: 1000, delay: 100, origin: 'bottom', distance: '50px' });
        sr.reveal('.project-btn', { delay: 500, duration: 1000, origin: 'top', distance: '80px', reset: false });
        sr.reveal('.work__container--mini .work__item', { interval: 100, duration: 1000, delay: 200, origin: 'top', distance: '40px' });
        sr.reveal('.footer__title', { delay: 400, duration: 1000, reset: false, origin: 'top' });
        sr.reveal('.footer__contact', { delay: 500, duration: 1000, reset: false, origin: 'top' });
        sr.reveal('.footer__copy', { delay: 600, duration: 1000, reset: false, origin: 'top' });
    }
});