// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for staggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe menu sections
document.querySelectorAll('.menu-section').forEach(section => {
    observer.observe(section);
});

// Add hover effect to menu items
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'rgba(212, 175, 55, 0.03)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '';
    });
});

// Dark mode toggle (optional)
function initDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.classList.add('dark-mode-toggle');
    darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// Print function
function printMenu() {
    window.print();
}

// Add print button
function addPrintButton() {
    const printBtn = document.createElement('button');
    printBtn.innerHTML = '🖨️ طباعة';
    printBtn.classList.add('print-btn');
    printBtn.addEventListener('click', printMenu);
    document.body.appendChild(printBtn);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add stagger animation class
    const style = document.createElement('style');
    style.innerHTML = `
        .menu-section {
            animation: fadeInUp 0.8s ease-out backwards;
        }
        
        .menu-section:nth-child(1) { animation-delay: 0s; }
        .menu-section:nth-child(2) { animation-delay: 0.1s; }
        .menu-section:nth-child(3) { animation-delay: 0.2s; }
        .menu-section:nth-child(4) { animation-delay: 0.3s; }
        .menu-section:nth-child(5) { animation-delay: 0.4s; }
        
        .dark-mode {
            --bg-beige: #1a1a1a;
            --text-brown: #f5f1ed;
            --cream: #2a2a2a;
            --matte-black: #f9f6f3;
            --shadow-color: rgba(245, 241, 237, 0.1);
            --shadow-color-dark: rgba(245, 241, 237, 0.2);
        }
        
        .dark-mode body {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
        }
        
        .dark-mode .container {
            background: 
                repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(212, 175, 55, 0.05) 2px,
                    rgba(212, 175, 55, 0.05) 4px
                );
        }
        
        .dark-mode-toggle,
        .print-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--gold);
            color: var(--text-brown);
            border: none;
            padding: 12px 18px;
            border-radius: 50px;
            cursor: pointer;
            font-size: 1rem;
            box-shadow: 0 4px 12px var(--shadow-color-dark);
            transition: all 0.3s ease;
            z-index: 100;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        
        .print-btn {
            bottom: 70px;
        }
        
        .dark-mode-toggle:hover,
        .print-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px var(--shadow-color-dark);
        }
        
        .dark-mode-toggle:active,
        .print-btn:active {
            transform: translateY(0);
        }
        
        @media (max-width: 768px) {
            .dark-mode-toggle,
            .print-btn {
                padding: 10px 15px;
                font-size: 0.9rem;
            }
        }
        
        @media print {
            .dark-mode-toggle,
            .print-btn {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    initDarkModeToggle();
    addPrintButton();
});

// Preload animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});