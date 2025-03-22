// Add any JavaScript functionality here
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the navigation highlighting
    highlightCurrentPage();
    
    // Add smooth scrolling to all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Smooth scroll behavior could be added here
            console.log('Button clicked:', this.textContent);
        });
    });
});

function highlightCurrentPage() {
    // Get current page URL
    const currentLocation = window.location.pathname;
    
    // Find all nav links
    const navLinks = document.querySelectorAll('nav a');
    
    // Check each link to see if it matches the current page
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // If it's the homepage or the paths match
        if (linkPath === '#' && (currentLocation === '/' || currentLocation.includes('index.html'))) {
            link.style.borderBottom = '2px solid white';
        } else if (currentLocation.includes(linkPath) && linkPath !== '#') {
            link.style.borderBottom = '2px solid white';
        }
    });
}