/* ========================================================
       2. CHỨC NĂNG BANNER TRƯỢT XOAY VÒNG (TRANG CHỦ)
    ======================================================== */
    const track = document.getElementById('banner-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const container = document.querySelector('.banner-carousel-container');

    if (track && prevBtn && nextBtn) {
        let isTransitioning = false;
        let autoPlay = null;

        function getMoveAmount() {
            const item = track.querySelector('.banner-item');
            if (!item) return 0;
            const gap = parseFloat(getComputedStyle(track).gap) || 0;
            return item.getBoundingClientRect().width + gap;
        }

        function slideNext() {
            if (isTransitioning) return;
            isTransitioning = true;
            const moveAmount = getMoveAmount();
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = `translateX(-${moveAmount}px)`;

            setTimeout(() => {
                track.style.transition = 'none';
                track.appendChild(track.firstElementChild);
                track.style.transform = 'translateX(0)';
                isTransitioning = false;
            }, 400);
        }

        function slidePrev() {
            if (isTransitioning) return;
            isTransitioning = true;
            const moveAmount = getMoveAmount();
            track.style.transition = 'none';
            track.prepend(track.lastElementChild);
            track.style.transform = `translateX(-${moveAmount}px)`;
            track.offsetHeight;
            track.style.transition = 'transform 0.4s ease-in-out';
            track.style.transform = 'translateX(0)';

            setTimeout(() => {
                isTransitioning = false;
            }, 400);
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlay = setInterval(slideNext, 2500);
        }

        function stopAutoPlay() {
            if (autoPlay !== null) {
                clearInterval(autoPlay);
                autoPlay = null;
            }
        }

        nextBtn.addEventListener('click', slideNext);
        prevBtn.addEventListener('click', slidePrev);

        startAutoPlay();

        if (container) {
            container.addEventListener('mouseenter', stopAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
        }
    }
