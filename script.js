document.addEventListener('DOMContentLoaded', function() {
    // Button that changes text and color
    const magicButton = document.getElementById('magic-button');
    const buttonStatus = document.getElementById('button-status');
    let clickCount = 0;
    
    magicButton.addEventListener('click', function() {
        clickCount++;
        buttonStatus.textContent = `Button clicked ${clickCount} time(s)`;
        
        // Change button color randomly
        const randomColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        magicButton.style.backgroundColor = randomColor;
        
        // Change button text
        const buttonTexts = ["Wow!", "Amazing!", "Try Again", "You did it!", "Click me more!"];
        magicButton.textContent = buttonTexts[Math.floor(Math.random() * buttonTexts.length)];
    });
    
    // Image gallery
    const images = document.querySelectorAll('.gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentIndex = 0;
    
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
        currentIndex = index;
    }
    
    prevBtn.addEventListener('click', function() {
        let newIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(newIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        let newIndex = (currentIndex + 1) % images.length;
        showImage(newIndex);
    });
    
    // Auto-advance gallery every 3 seconds
    setInterval(() => {
        let newIndex = (currentIndex + 1) % images.length;
        showImage(newIndex);
    }, 3000);
    
    // Tab system
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Keypress detection
    document.addEventListener('keydown', function(event) {
        const keypressIndicator = document.getElementById('keypress-indicator');
        keypressIndicator.textContent = `You pressed: ${event.key} (Code: ${event.code})`;
        
        // Special action for 's' key
        if (event.key.toLowerCase() === 's') {
            const tab2Content = document.getElementById('tab2');
            tab2Content.innerHTML += '<p style="color: #e74c3c;">Secret message revealed by pressing "s"!</p>';
        }
    });
    
    // Double-click secret
    document.addEventListener('dblclick', function() {
        showSecretMessage("You found the double-click secret! 🤫");
    });
    
    // Long press detection
    const tab3Content = document.getElementById('tab3');
    let pressTimer;
    
    tab3Content.addEventListener('mousedown', function() {
        pressTimer = setTimeout(() => {
            showSecretMessage("Long press detected! Well done! 🎉");
        }, 1000); // 1 second for long press
    });
    
    tab3Content.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    tab3Content.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    // Function to show secret message
    function showSecretMessage(message) {
        // Create secret message element if it doesn't exist
        let secretMsg = document.querySelector('.secret-message');
        if (!secretMsg) {
            secretMsg = document.createElement('div');
            secretMsg.className = 'secret-message';
            document.body.appendChild(secretMsg);
        }
        
        secretMsg.textContent = message;
        secretMsg.style.display = 'block';
        
        // Hide after 3 seconds
        setTimeout(() => {
            secretMsg.style.display = 'none';
        }, 3000);
    }
});