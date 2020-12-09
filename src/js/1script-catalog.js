
@@include('nouislider.js', {});
@@include('wNumb.min.js', {});

// Swiper Slider 

let sliders = document.querySelectorAll('._swiper');
if (sliders) {
  for (let index = 0; index < sliders.length; index++) {
    let slider = sliders[index];
    if (!slider.classList.contains('swiper-container')){
        let slider_items = slider.children;
        if (slider_items) {
          for (let index = 0; index < slider_items.length; index++) {
            let el = slider_items[index];
            el.classList.add('swiper-slide');
          }
        }
        let slider_content = slider.innerHTML;
        let slider_wrapper = document.createElement('div');
        slider_wrapper.classList.add('swiper-wrapper');
        slider_wrapper.innerHTML = slider_content;
        slider.innerHTML = '';
        slider.appendChild(slider_wrapper);
        slider.classList.add('swiper-container');
    }
  }
  sliders_bild_callback();
}

function sliders_bild_callback(params) { } 

if (document.querySelector('.mainslider')) {
  let mainslider = new Swiper('.mainslider__body', {

      observer: true,
      observerParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      speed: 800,
      //loop: true,

      pagination: {
        el: '.mainslider__dotts',
        clickable: true,
      },

      on: {
        lazyImageReady: function () {
          ibg();
        },
      }
  });
  let mainsliderImages = document.querySelectorAll('.mainslider__image');
  let mainsliderDotts = document.querySelectorAll('.mainslider__dotts .swiper-pagination-bullet');

  for (let index = 0; index < mainsliderImages.length; index++) {
      const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
      mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
  }
}

if (document.querySelector('.products-slider')) {
    let productSlider = new Swiper('.products-slider__item', {

      observer: true,
      observerParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
      speed: 800,
      pagination: {
        el: '.products-slider__info',
        type: 'fraction',
      },
      //loop: true,
      /*
      
      pagination: {
        el: '.mainslider__dotts',
        clickable: true,
      },*/
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      on: {
        lazyImageReady: function () {
          ibg();
        },
      }
  });
  let mainsliderImages = document.querySelectorAll('.mainslider__image');
  let mainsliderDotts = document.querySelectorAll('.mainslider__dotts .swiper-pagination-bullet');

  for (let index = 0; index < mainsliderImages.length; index++) {
      const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
      mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
  }
}
if (document.querySelector('.brands-slider')) {
  let brandsSlider = new Swiper('.brands-slider__body', {

    observer: true,
    observerParents: true,
    slidesPerView: 5,
    spaceBetween: 0,
    speed: 800,
    loop: true,
    /*
    
    pagination: {
      el: '.mainslider__dotts',
      clickable: true,
    },*/
    navigation: {
      nextEl: '.brands-slider__arrow_next',
      prevEl: '.brands-slider__arrow_prev',
    },
    breakpoints: {
        320: {
          slidesPerView: 1,
          autoHeight: true,
        },
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1060: {
          slidesPerView: 5,
        },
    },
})
}