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


// menu
const menuElm = document.querySelector('.main-navbar__menu')
if (menuElm) {
  const menuToogler = menuElm.querySelector('.main-navbar__menu-toggler')
  const menuInner = menuElm.querySelector('.main-navbar__menu-inner')
  const menuBody = menuElm.querySelector('.main-navbar__menu-body')
  let isOpen = 0

  menuToogler.addEventListener('click', () => {
    if (isOpen == 0) {
      isOpen = !0
      menuBody.style.height = `${menuInner.offsetHeight}px`
      menuElm.classList.add('is-active')
    } else {
      isOpen = 0
      menuBody.style.height = '0px'
      menuElm.classList.remove('is-active')
    }
  })


  const dropdwonItems = document.querySelectorAll(
    '.main-navbar__menu-item--dropdown')

  dropdwonItems.forEach(dropdwonItem => {
    const toggler = dropdwonItem.querySelector('.main-navbar__menu-row')
    const lists = dropdwonItem.querySelector('.main-navbar__dropdown-items')
    const wrapper = dropdwonItem.querySelector(
      '.main-navbar__dropdown-wrapper')
    const icon = dropdwonItem.querySelector('.main-navbar__menu-icon')
    let isOpen = 0

    toggler.addEventListener('click', () => {

      menuBody.style.height = 'auto'
      lists.addEventListener('transitionend', () => {
        menuBody.style.height = `${menuInner.offsetHeight}px`
      })

      if (isOpen == 0) {
        isOpen = !0
        lists.style.height = `${wrapper.offsetHeight}px`
        icon.style.transform = 'rotate(-180deg)'
      } else {
        isOpen = 0
        lists.style.height = '0px'
        icon.style.transform = 'rotate(0deg)'
      }
    })

  })
}



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
        icon.style.transform = 'rotate(180deg)'
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



// switchs

const switchElms = document.querySelectorAll('.switch')

if (switchElms) {
  switchElms.forEach(switchElm => {
    let isOn = 0
    const toogler = switchElm.querySelector('.switch__toggler')
    const inputGroup = switchElm.querySelector('.switch__input-group')
    const inputInner = switchElm.querySelector('.switch__input-inner')
    const input = switchElm.querySelector('.switch__input')
    const suggestELm = switchElm.querySelector('.switch__input-suggest')
    const sgItmes = switchElm.querySelectorAll(
      '.switch__input-suggest-item')
    toogler.addEventListener('click', () => {
      if (isOn == 0) {
        isOn = !0
        switchElm.classList.add('is-on')
        switchElm.classList.remove('is-off')
        inputGroup.style.height = `${inputInner.offsetHeight}px`
      } else {
        isOn = 0
        switchElm.classList.remove('is-on')
        switchElm.classList.add('is-off')
        inputGroup.style.height = `0px`

      }
    })

    if (suggestELm) {
      input.addEventListener('focus', (e) => {
        suggestELm.style.height = '400px'
        inputInner.classList.add('is-focus')
      })

      input.addEventListener('blur', (e) => {
        suggestELm.style.height = '0px'
        inputInner.classList.remove('is-focus')
      })

      sgItmes.forEach(sgItme => {
        sgItme.addEventListener('click', () => {
          input.value = sgItme.innerText

          console.log(sgItme.innerText);
        })
      })

    }
  })
}

// lng switch

const lsElm = document.querySelector('.lng-switch')
const enBtn = document.querySelector('.lng-switch__btn--en')
const dtBtn = document.querySelector('.lng-switch__btn--dt')


if (lsElm) {
  enBtn.addEventListener('click', () => {
    lsElm.classList.add('is-en')
    lsElm.classList.remove('is-dt')
  })

  dtBtn.addEventListener('click', () => {
    lsElm.classList.add('is-dt')
    lsElm.classList.remove('is-en')
  })
}
