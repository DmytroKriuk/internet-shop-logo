
@@include('nouislider.js', {});
@@include('wNumb.min.js', {});


let header__burger = document.querySelector('.icon-menu');
let header_menu = document.querySelector('.menu__body');
let back = document.querySelector('body');
let header__list = document.querySelector('.menu__list');

header__burger.onclick = function(){
    header__burger.classList.toggle('_active');
    header_menu.classList.toggle('_active');
    back.classList.toggle('_lock');
}

header__list.onclick = function () {
    header__list.classList.remove('_active');
    back.classList.toggle('_lock');
}

//dynamic adapt

class DynamicAdapt {
    constructor(type) {
      this.type = type;
    }
  
    init() {
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = [...document.querySelectorAll('[data-da]')];
  
      // наполнение оbjects объктами
      this.nodes.forEach((node) => {
        const data = node.dataset.da.trim();
        const dataArray = data.split(',');
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
      });
  
      this.arraySort(this.оbjects);
  
      // массив уникальных медиа-запросов
      this.mediaQueries = this.оbjects
        .map(({
          breakpoint
        }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
        .filter((item, index, self) => self.indexOf(item) === index);
  
      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      this.mediaQueries.forEach((media) => {
        const mediaSplit = media.split(',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];
  
        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = this.оbjects.filter(
          ({
            breakpoint
          }) => breakpoint === mediaBreakpoint
        );
        matchMedia.addEventListener('change', () => {
          this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
      });
    }
  
    // Основная функция
    mediaHandler(matchMedia, оbjects) {
      if (matchMedia.matches) {
        оbjects.forEach((оbject) => {
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.moveTo(оbject.place, оbject.element, оbject.destination);
        });
      } else {
        оbjects.forEach(
          ({ parent, element, index }) => {
            if (element.classList.contains(this.daClassname)) {
              this.moveBack(parent, element, index);
            }
          }
        );
      }
    }
  
    // Функция перемещения
    moveTo(place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
        destination.append(element);
        return;
      }
      if (place === 'first') {
        destination.prepend(element);
        return;
      }
      destination.children[place].before(element);
    }
  
    // Функция возврата
    moveBack(parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].before(element);
      } else {
        parent.append(element);
      }
    }
  
    // Функция получения индекса внутри родителя
    indexInParent(parent, element) {
      return [...parent.children].indexOf(element);
    }
  
    // Функция сортировки массива по breakpoint и place 
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    arraySort(arr) {
      if (this.type === 'min') {
        arr.sort((a, b) => {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }
            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }
            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }
            return a.place - b.place;
          }
          return a.breakpoint - b.breakpoint;
        });
      } else {
        arr.sort((a, b) => {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }
            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }
            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }
            return b.place - a.place;
          }
          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    }
  }
const da = new DynamicAdapt("max");
da.init();



if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  let menuParents = document.querySelectorAll('.menu-page__parent>a');
  for (let index = 0; index < menuParents.length; index++) {
    const menuParent = menuParents[index];
    menuParent.addEventListener("click", function (e) {
      menuParent.parentElement.classList.toggle('_active');
        e.preventDefault();
    })
  }
} else {
let menuParents = document.querySelectorAll('.menu-page__parent');
for (let index = 0; index < menuParents.length; index++) {
    const menuParent = menuParents[index];
    menuParent.addEventListener("mouseenter", function (e) {
        menuParent.classList.add('_active');
    });
    menuParent.addEventListener("mouseleave", function (e) {
      menuParent.classList.remove('_active');
  });
} 
}

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  let filterTitle = document.querySelector('.filter__title');
  let filterContent = document.querySelector('.filter__content');
  filterTitle.addEventListener("click", function(e) {
    filterTitle.classList.toggle('_active');
    filterContent.classList.toggle('_active');
  });
}

let menuPageBurger = document.querySelector('.menu-page__burger');
let menuPageBody = document.querySelector('.menu-page__body');
menuPageBurger.addEventListener("click", function(e) {
  menuPageBurger.classList.toggle('_active');
  menuPageBody.classList.toggle('_active');
});

let searchSelect = document.querySelector('.search-page__title');
let eachSelect = document.querySelector('.categories-search')
searchSelect.addEventListener("click", function (e) {
  searchSelect.classList.toggle('_active');
  eachSelect.classList.toggle('_active');
});


let searchSpoller = document.querySelectorAll('._spollers-body');
let eachSpoller = document.querySelectorAll('._spoller')
console.log(eachSpoller)

searchSpoller.forEach(function(e) {
  e.addEventListener("click", function (e) {
    console.log(e.target.classList.toggle('_active'))
})});


const headers = document.querySelectorAll("[data-name='spoiler-title']");

headers.forEach(function (item) {
  item.addEventListener("click", headerClick);
});

function headerClick() {
  this.nextElementSibling.classList.toggle("spoiler-body");
}

let checkboxCategories = document.querySelectorAll('.categories-search__checkbox');

for (let index = 0; index < checkboxCategories.length; index++) {
    const checkboxCategory = checkboxCategories[index];
    checkboxCategory.addEventListener("change", function (e) {
        checkboxCategory.classList.toggle('_active');
       
        let checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox._active');

        if (checkboxActiveCategories.length > 0) {
          searchSelect.classList.add('_categories');
          let searchQuantity = searchSelect.querySelector('.search-page__quantity');
          searchQuantity.innerHTML = searchQuantity.getAttribute('data-text') + ' ' +  checkboxActiveCategories.length;
        } else {
          searchSelect.classList.remove('_categories');
        }
    });
};
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


  window.onload = function () { 
    for (let index = 0; index < mainsliderImages.length; index++) {
    const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
    mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
}
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

  window.onload = function () { 
    for (let index = 0; index < mainsliderImages.length; index++) {
    const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
    mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
}
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

const priceSlider = document.querySelector('.price-filter__slider');

noUiSlider.create(priceSlider, {
    start: [20, 200000],
    connect: true,
    tooltips: [wNumb({decimals: 0}), wNumb({decimals: 0}),],
    range: {
        'min': [0],
        'max': [200000]
    }
});

const priceStart = document.getElementById('price-start');
const priceEnd = document.getElementById('price-end');
priceStart.addEventListener('keyup', setPriceValues);
priceEnd.addEventListener('keyup', setPriceValues);

function setPriceValues() {
  let priceStartValue;
  let priceEndValue;
  if (priceStart.value != '') {
    priceStartValue = priceStart.value;
  }
  if(priceEnd.value != '') {
    priceEndValue = priceEnd.value
  }

  priceSlider.noUiSlider.set([priceStartValue, priceEndValue]);
}