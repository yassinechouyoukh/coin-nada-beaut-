document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.footer-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            if (window.innerWidth > 900) return; // Disable on desktop

            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('.toggle-icon i');
            const isOpen = content.classList.contains('open');

            // Close all others
            document.querySelectorAll('.footer-content.open').forEach(el => {
                if (el !== content) {
                    el.classList.remove('open');
                    const siblingToggle = el.previousElementSibling;
                    siblingToggle.querySelector('.toggle-icon i').classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            });

            // Toggle current
            content.classList.toggle('open', !isOpen);
            icon.classList.toggle('fa-chevron-down', isOpen);
            icon.classList.toggle('fa-chevron-up', !isOpen);
        });
    });

    // Open the first one by default on mobile
    if (window.innerWidth <= 900) {
        const firstToggle = toggles[0];
        const firstContent = firstToggle.nextElementSibling;
        const firstIcon = firstToggle.querySelector('.toggle-icon i');
        firstContent.classList.add('open');
        firstIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    }
});