   // Mobile Menu functionality
   const bar = document.getElementById('bar');
           const close = document.getElementById('close');
           const nav = document.getElementById('navbar');

        if (bar){
            bar.addEventListener('click', () => {
                nav.classList.add('active');
            })
        }
        if(close){
            close.addEventListener('click', () =>{
                nav.classList.remove('active');
            })
        }

        document.querySelectorAll('.carousel').forEach((carousel) => {
            const imagesContainer = carousel.querySelector('.carousel-images');
            const slides = carousel.querySelectorAll('.carousel-images img');
            const prevButton = carousel.querySelector('.carousel-buttons #prev');
            const nextButton = carousel.querySelector('.carousel-buttons #next');
            const indicators = carousel.querySelectorAll('.carousel-indicators span');
        
            let currentIndex = 0;
            const slideWidth = 100 / slides.length;
            let autoPlayInterval;
            let isTransitioning = false;
            let autoPlayPaused = false;
        
            function updateCarousel() {
                imagesContainer.style.transform = `translateX(${-currentIndex * slideWidth}%)`;
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentIndex);
                });
            }
        
            function showNextSlide() {
                if (isTransitioning) return;
                isTransitioning = true;
        
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
        
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
        
            function showPrevSlide() {
                if (isTransitioning) return;
                isTransitioning = true;
        
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
        
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
            }
        
            indicators.forEach((indicator) => {
                indicator.addEventListener('click', () => {
                    currentIndex = parseInt(indicator.dataset.index);
                    updateCarousel();
                    pauseAutoPlay(); // Stop autoplay temporarily
                });
            });
        
            nextButton.addEventListener('click', () => {
                showNextSlide();
                pauseAutoPlay();
            });
        
            prevButton.addEventListener('click', () => {
                showPrevSlide();
                pauseAutoPlay();
            });
        
            function startAutoPlay() {
                if (!autoPlayPaused) {
                    autoPlayInterval = setInterval(showNextSlide, 3000);
                }
            }
        
            function pauseAutoPlay() {
                clearInterval(autoPlayInterval);
                autoPlayPaused = true;
        
                // Resume auto-play after 5 seconds
                setTimeout(() => {
                    autoPlayPaused = false;
                    startAutoPlay();
                }, 5000);
            }
        
            // Start auto-play on page load
            startAutoPlay();
        
            // Initialize carousel position
            updateCarousel();
        });
        
