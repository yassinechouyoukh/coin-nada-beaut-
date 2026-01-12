
document.addEventListener('DOMContentLoaded', function() {
    const galleryData = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=750&q=80",
            caption: "Layers or blunt cut? If you're undecided, why not leave it up to our team of experts to give you ideas for your newest look?"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=750&q=80",
            caption: "Sharp, clean lines for a modern silhouette that exudes confidence and style."
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=750&q=80",
            caption: "Balayage coloring technique for natural-looking highlights that blend seamlessly with your base color."
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1519415711931-702deacf5be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=750&q=80",
            caption: "Textured curls with face-framing layers for volume and bounce that captures light beautifully."
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&h=750&q=80",
            caption: "Pixie cut with textured top for a bold, low-maintenance style that's both chic and practical."
        }
    ];

    const galleryTrack = document.getElementById('galleryTrack');
    const navDots = document.getElementById('navDots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentSlide = 0;
    let autoSlideInterval;
    let isPaused = false;

    function initGallery() {
        galleryTrack.innerHTML = '';
        navDots.innerHTML = '';
        
        galleryData.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = `gallery-slide ${index === 0 ? 'active' : ''}`;
            slide.setAttribute('data-index', index);
            
            slide.innerHTML = `
                <img src="${item.image}" alt="Gallery image ${item.id}" class="gallery-image">
                <p class="gallery-caption">${item.caption}</p>
            `;
            
            galleryTrack.appendChild(slide);
            
            const dot = document.createElement('button');
            dot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            dot.setAttribute('aria-label', `Go to image ${index + 1}`);
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            navDots.appendChild(dot);
        });
        
        startAutoSlide();
    }

    function goToSlide(index) {
        currentSlide = index;
        galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateActiveClasses();
        resetAutoSlide();
    }

    function updateActiveClasses() {
        document.querySelectorAll('.gallery-slide').forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === currentSlide) {
                slide.classList.add('active');
            }
        });
        
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentSlide) {
                dot.classList.add('active');
            }
        });
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % galleryData.length;
        goToSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = currentSlide === 0 ? galleryData.length - 1 : currentSlide - 1;
        goToSlide(prevIndex);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === ' ') {
            isPaused = !isPaused;
            if (!isPaused) {
                resetAutoSlide();
            } else {
                clearInterval(autoSlideInterval);
            }
        }
    });

    galleryTrack.addEventListener('mouseenter', () => {
        isPaused = true;
        clearInterval(autoSlideInterval);
    });

    galleryTrack.addEventListener('mouseleave', () => {
        isPaused = false;
        startAutoSlide();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    galleryTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    galleryTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    initGallery();
});