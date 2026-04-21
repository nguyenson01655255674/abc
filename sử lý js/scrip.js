// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        if (name && email && message) {
            alert('Cảm ơn ' + name + '! Tin nhắn của bạn đã được gửi. Chúng tôi sẽ liên hệ sớm.');
            this.reset();
        } else {
            alert('Vui lòng điền đầy đủ thông tin.');
        }
    });
}

// Button hover effects (enhance CSS)
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// Product item hover effects
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    });
    item.addEventListener('mouseleave', function () {
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });
});

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(139, 69, 19, 0.9)';
    } else {
        header.style.backgroundColor = '#8B4513';
    }
});

// Toggle menu for mobile
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
if (menuToggle && nav) {
    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const isOpen = nav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (nav.classList.contains('open') && !nav.contains(event.target) && !menuToggle.contains(event.target)) {
            nav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('open')) {
            nav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Modal product view
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.querySelector('.modal-close');
const modalPrev = document.querySelector('.modal-nav.prev');
const modalNext = document.querySelector('.modal-nav.next');

const productGalleries = {
    'CHUNG CƯ - XU HƯỚNG TƯƠNG LAI': [
        '../thiết kế css/ảnh (img)/CHUNG CƯ - XU HƯỚNG TƯƠNG LAI/472989090_1003272221831708_7743880649575566154_n.jpg',
        '../thiết kế css/ảnh (img)/CHUNG CƯ - XU HƯỚNG TƯƠNG LAI/473081948_1003272125165051_3977668502008880919_n.jpg',
        '../thiết kế css/ảnh (img)/CHUNG CƯ - XU HƯỚNG TƯƠNG LAI/473108530_1003272071831723_4700826785998119047_n.jpg',
        '../thiết kế css/ảnh (img)/CHUNG CƯ - XU HƯỚNG TƯƠNG LAI/473113998_1003272365165027_5764045328932552151_n.jpg',
        '../thiết kế css/ảnh (img)/CHUNG CƯ - XU HƯỚNG TƯƠNG LAI/473128924_1003272341831696_1434667685731591389_n.jpg'
    ],
    'Phong cách Châu Âu Quý Phái': [
        '../thiết kế css/ảnh (img)/phong cách châu âu quý phái/186491349_139293024896303_8347618329646340863_n.jpg',
        '../thiết kế css/ảnh (img)/phong cách châu âu quý phái/184764492_139293018229637_8309117131968095985_n.jpg',
        '../thiết kế css/ảnh (img)/phong cách châu âu quý phái/187739116_139293068229632_483662611508586611_n.jpg'
    ],
    'Phong cách Cổ Điển': [
        '../thiết kế css/ảnh (img)/phong cách cổ điển/470186065_983945713764359_5829741203146925974_n.jpg',
        '../thiết kế css/ảnh (img)/phong cách cổ điển/470188601_983945747097689_627059733646100731_n.jpg',
        '../thiết kế css/ảnh (img)/phong cách cổ điển/470196182_983946030430994_8526638281340860675_n.jpg'
    ],
    'Phòng khách sạn bán tân cổ điển': [
        '../thiết kế css/ảnh (img)/phòng khách sạn phong cách bán tân cổ điển/186474684_149850400507232_126503323833020866_n.jpg',
        '../thiết kế css/ảnh (img)/phòng khách sạn phong cách bán tân cổ điển/189548416_149850443840561_6785251925916445060_n.jpg',
        '../thiết kế css/ảnh (img)/phòng khách sạn phong cách bán tân cổ điển/193517348_149850453840560_4236772246769704955_n.jpg'
    ],
    'Trang trọng dành cho gia đình': [
        '../thiết kế css/ảnh (img)/trang trọng dành cho gia đình/470778520_988299129995684_5366523733881977447_n.jpg',
        '../thiết kế css/ảnh (img)/trang trọng dành cho gia đình/470795480_988299329995664_6259204030862039470_n.jpg',
        '../thiết kế css/ảnh (img)/trang trọng dành cho gia đình/470817811_988299206662343_3183798091047585224_n.jpg'
    ]
};

let currentProductGallery = [];
let currentProductIndex = 0;
let currentProductTitle = '';
let currentProductDescription = '';

function renderModalProductImage(index) {
    const imgSrc = currentProductGallery[index];
    if (!imgSrc) return;

    modalImg.src = imgSrc;
    modalImg.alt = currentProductTitle;
    modalCaption.innerHTML = `<h3>${currentProductTitle} (${index + 1}/${currentProductGallery.length})</h3><p>${currentProductDescription}</p>`;
}

function openProductModal(title, description, initialSrc) {
    currentProductTitle = title;
    currentProductDescription = description;
    currentProductGallery = productGalleries[title] || [initialSrc];
    currentProductIndex = 0;
    renderModalProductImage(currentProductIndex);
    modal.style.display = 'block';
}

document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', function () {
        const title = this.getAttribute('data-title') || this.querySelector('h3').innerText;
        const description = this.getAttribute('data-description') || this.querySelector('p').innerText;
        const initialSrc = this.querySelector('img').src;
        openProductModal(title, description, initialSrc);
    });
});

if (modal && modalImg && modalCaption && modalClose && modalPrev && modalNext) {
    modalPrev.addEventListener('click', () => {
        if (!currentProductGallery.length) return;
        currentProductIndex = (currentProductIndex - 1 + currentProductGallery.length) % currentProductGallery.length;
        renderModalProductImage(currentProductIndex);
    });

    modalNext.addEventListener('click', () => {
        if (!currentProductGallery.length) return;
        currentProductIndex = (currentProductIndex + 1) % currentProductGallery.length;
        renderModalProductImage(currentProductIndex);
    });

    modalClose.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}


const modalBack = document.querySelector('.modal-back');
if (modalBack) {
    modalBack.addEventListener('click', function () {
        modal.style.display = 'none';
    });
}

// Carousel navigation
const carouselImages = [
    {
        src: '../thiết kế css/ảnh (img)/CHUNG CƯ - XU HƯỚNG TƯƠNG LAI/472989090_1003272221831708_7743880649575566154_n.jpg',
        title: 'CHUNG CƯ - XU HƯỚNG TƯƠNG LAI',
        description: 'Nội thất chung cư hiện đại, hợp xu hướng.'
    },
    {
        src: '../thiết kế css/ảnh (img)/phong cách châu âu quý phái/186491349_139293024896303_8347618329646340863_n.jpg',
        title: 'Phong cách Châu Âu Quý Phái',
        description: 'Thiết kế sang trọng, góc nhìn quý phái.'
    },
    {
        src: '../thiết kế css/ảnh (img)/phong cách cổ điển/470186065_983945713764359_5829741203146925974_n.jpg',
        title: 'Phong cách Cổ Điển',
        description: 'Ấn tượng hoàng gia, sang trọng vượt thời gian.'
    },
    {
        src: '../thiết kế css/ảnh (img)/phòng khách sạn phong cách bán tân cổ điển/186474684_149850400507232_126503323833020866_n.jpg',
        title: 'Phòng khách sạn bán tân cổ điển',
        description: 'Không gian khách sạn sang trọng, ấm cúng.'
    },
    {
        src: '../thiết kế css/ảnh (img)/trang trọng dành cho gia đình/470778520_988299129995684_5366523733881977447_n.jpg',
        title: 'Trang trọng dành cho gia đình',
        description: 'Nội thất gia đình đẳng cấp và bền bỉ.'
    }
];

let currentCarouselIndex = 0;
const carouselImageEl = document.getElementById('carouselImage');
const carouselCaptionEl = document.getElementById('carouselCaption');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function renderCarousel(index) {
    const item = carouselImages[index];
    if (!carouselImageEl || !carouselCaptionEl || !item) return;

    carouselImageEl.src = item.src;
    carouselImageEl.alt = item.title;
    carouselCaptionEl.textContent = item.title + ' - ' + item.description;
}

if (carouselImageEl && carouselCaptionEl && prevBtn && nextBtn) {
    renderCarousel(currentCarouselIndex);

    prevBtn.addEventListener('click', () => {
        currentCarouselIndex = (currentCarouselIndex - 1 + carouselImages.length) % carouselImages.length;
        renderCarousel(currentCarouselIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselImages.length;
        renderCarousel(currentCarouselIndex);
    });
}

// Thumbnail click switch
const carouselThumbnailsContainer = document.getElementById('carouselThumbnails');

function updateActiveThumbnail(index) {
    if (!carouselThumbnailsContainer) return;
    const thumbs = carouselThumbnailsContainer.querySelectorAll('.thumbnail');
    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function renderThumbnails() {
    if (!carouselThumbnailsContainer) return;

    carouselThumbnailsContainer.innerHTML = '';

    carouselImages.forEach((item, index) => {
        const thumb = document.createElement('img');
        thumb.className = 'thumbnail';
        if (index === currentCarouselIndex) thumb.classList.add('active');
        thumb.setAttribute('data-index', index);
        thumb.src = item.src;
        thumb.alt = item.title;

        thumb.addEventListener('click', () => {
            currentCarouselIndex = index;
            renderCarousel(index);
            updateActiveThumbnail(index);
        });

        carouselThumbnailsContainer.appendChild(thumb);
    });
}

renderCarousel(currentCarouselIndex);
if (carouselThumbnailsContainer) {
    renderThumbnails();
}
