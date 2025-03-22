


document.addEventListener('DOMContentLoaded', function() {
    highlightCurrentPage();
    
    const navLinks = document.querySelectorAll('nav a');
    const buttons = document.querySelectorAll('.btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.querySelector('.sticky-header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            console.log('button clicked:', this.parentNode.querySelector('h3').textContent);
        });
    });
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        document.querySelector('.bg-overlay').style.transform = `translateY(${scrollPosition * 0.4}px)`;
        
        const header = document.querySelector('.sticky-header');
        if (scrollPosition > 50) {
            header.style.padding = '0.8rem 1.5rem';
        } else {
            header.style.padding = '1.5rem';
        }
    });
    
    const emailText = document.getElementById('email-text');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const closeNotificationBtn = document.getElementById('close-notification');
    let notificationTimeout;
    
    copyEmailBtn.addEventListener('click', function() {
        const email = emailText.textContent;
        navigator.clipboard.writeText(email).then(function() {
            showNotification('Email copied to clipboard!');
        }, function() {
            showNotification('Failed to copy email. Please try again.');
        });
    });
    
    emailText.addEventListener('click', function() {
        const email = emailText.textContent;
        navigator.clipboard.writeText(email).then(function() {
            showNotification('Email copied to clipboard!');
        }, function() {
            showNotification('Failed to copy email. Please try again.');
        });
    });
    
    closeNotificationBtn.addEventListener('click', function() {
        hideNotification();
    });
    
    function showNotification(message) {
        if (notificationTimeout) {
            clearTimeout(notificationTimeout);
        }
        
        notificationMessage.textContent = message;
        notification.classList.add('show');
        
        notificationTimeout = setTimeout(function() {
            hideNotification();
        }, 5000);
    }
    
    function hideNotification() {
        notification.classList.remove('show');
    }
});

function highlightCurrentPage() {
    const currentHash = window.location.hash || '#';
    
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkHash = link.getAttribute('href');
        const parentLi = link.parentElement;
        
        if (linkHash === currentHash) {
            parentLi.classList.add('active');
        } else {
            parentLi.classList.remove('active');
        }
    });
    
    window.addEventListener('scroll', function() {
        const headerHeight = document.querySelector('.sticky-header').offsetHeight;
        const scrollPosition = window.pageYOffset + headerHeight + 100;
        
        const sections = document.querySelectorAll('main div[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav ul li').forEach(li => {
                    li.classList.remove('active');
                });
                
                const correspondingLink = document.querySelector(`nav a[href="#${section.id}"]`);
                if (correspondingLink) {
                    correspondingLink.parentElement.classList.add('active');
                }
            }
        });
        
        if (scrollPosition < 200 + headerHeight) {
            document.querySelectorAll('nav ul li').forEach(li => {
                li.classList.remove('active');
            });
            
            const homeLink = document.querySelector('nav a[href="#"]');
            if (homeLink) {
                homeLink.parentElement.classList.add('active');
            }
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('nav ul li').forEach(li => {
                li.classList.remove('active');
            });
            
            this.parentElement.classList.add('active');
        });
    });
}