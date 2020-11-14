import {
  Swiper,
  Navigation,
  Pagination,
  Autoplay
} from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay]);

const jobCardSlider = new Swiper('.block-job__slider', {
  slidesPerView: 'auto',
  spaceBetween: 20,
  centeredSlides: true,
  loop: true,
  loopedSlides: 150,
  freeMode: true,
  freeModeMomentumRatio: 0.6,
  freeModeMomentumVelocityRatio: 0.6,
  wrapperClass: 'block-job__slider-container',
  slideClass: 'block-job__slider-item',
  slideActiveClass: 'is-active',
})

let interleaveOffset = 0.5;
const creativeSlider = new Swiper('.block-creative__slider', {
  autoplay: {
    delay: 3000
  },
  loop: true,
  speed: 1000,
  watchSlidesProgress: true,
  wrapperClass: 'block-creative__slider-container',
  slideClass: 'block-creative__slider-item',
  slideActiveClass: 'is-active',
  navigation: {
    nextEl: ".block-creative__slider-arrow--next",
    prevEl: ".block-creative__slider-arrow--prev"
  },
  on: {

    progress: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        let slideProgress = swiper.slides[i].progress,
          innerOffset = swiper.width * interleaveOffset,
          innerTranslate = slideProgress * innerOffset;

        swiper.slides[i].querySelector(".block-creative__slider-parallax")
          .style.transform =
          "translateX(" + innerTranslate + "px)";
      }
    },
    touchStart: function () {
      let swiper = this;
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function (swiper, speed) {
      for (let i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".block-creative__slider-parallax")
          .style.transition =
          speed + "ms";
      }
    }
  }
})


// selects
const slectElms = document.querySelectorAll('.select');

if (slectElms) {
  slectElms.forEach(slectElm => {
    const selected = slectElm.querySelector('.select__selected')
    const body = slectElm.querySelector('.select__body')
    const itemsElm = slectElm.querySelector('.select__items')
    const items = slectElm.querySelectorAll('.select__item')
    const icon = slectElm.querySelector('.select__selected-icon')
    let isOpen = 0


    selected.addEventListener('click', () => {
      if (isOpen == 0) {
        body.style.height = `${itemsElm.offsetHeight}px`
        slectElm.classList.add('is-active')
        icon.style.transform = 'rotate(90deg)'
        isOpen = !0
      } else {
        body.style.height = `0px`
        slectElm.classList.remove('is-active')
        icon.style.transform = 'rotate(0deg)'
        isOpen = 0
      }
    })

    items.forEach((item, i) => {
      const tags = item.querySelectorAll('.select__tag')

      tags.forEach(tag => {
        let isActive = 0

        tag.addEventListener('click', () => {

          items.forEach((ite, j) => {
            if (j !== i) {
              ite.classList.remove('is-active')
              const ltags = ite.querySelectorAll(
                '.select__tag')
              ltags.forEach((ltag, k) => {
                ltag.classList.remove('is-active')
              })
            }
            else {
              ite.classList.add('is-active')
            }
          })


          if (isActive == 0) {
            tag.classList.add('is-active')
            isActive = !0
          } else {
            tag.classList.remove('is-active')
            isActive = 0
          }
        })
      })
    })


  })
}
