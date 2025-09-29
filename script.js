'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
  }
}

if (testimonialsItem.length && modalContainer && overlay && modalImg && modalTitle && modalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function () {
      const avatar = this.querySelector('[data-testimonials-avatar]');
      const title = this.querySelector('[data-testimonials-title]');
      const text = this.querySelector('[data-testimonials-text]');
      if (avatar) { modalImg.src = avatar.src; modalImg.alt = avatar.alt; }
      if (title) { modalTitle.innerHTML = title.innerHTML; }
      if (text) { modalText.innerHTML = text.innerHTML; }
      testimonialsModalFunc();
    });
  }
}

//Activating close button in modal-testimonial

if (modalCloseBtn) { modalCloseBtn.addEventListener('click', testimonialsModalFunc); }
if (overlay) { overlay.addEventListener('click', testimonialsModalFunc); }

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select) {
  select.addEventListener('click', function () { elementToggleFunc(this); });
}

if (selectItems.length && selectValue) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      if (select) { elementToggleFunc(select); }
      filterFunc(selectedValue);
    });
  }
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

if (filterBtn.length) {
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener('click', function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) { selectValue.innerText = this.innerText; }
      filterFunc(selectedValue);
      if (lastClickedBtn) { lastClickedBtn.classList.remove('active'); }
      this.classList.add('active');
      lastClickedBtn = this;
    });
  }
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formBtn && formInputs.length) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute('disabled');
      } else {
        formBtn.setAttribute('disabled', '');
      }
    });
  }

  // Send form submission via email using mailto
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const ownerEmailAddress = 'gnanavardhan360@gmail.com';
    const fullname = form.querySelector('input[name="fullname"]').value.trim();
    const fromEmail = form.querySelector('input[name="email"]').value.trim();
    const role = form.querySelector('input[name="role"]') ? form.querySelector('input[name="role"]').value.trim() : '';
    const message = form.querySelector('textarea[name="message"]').value.trim();

    const subject = encodeURIComponent(`Portfolio Contact: ${fullname}`);
    const body = encodeURIComponent(`Name: ${fullname}\nEmail: ${fromEmail}\nRole: ${role}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:${ownerEmailAddress}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;

    form.reset();
    formBtn.setAttribute('disabled', '');
  });
}

// Open links in a new tab (exclude hash, mailto, tel)
document.addEventListener('DOMContentLoaded', function () {
  const anchors = document.querySelectorAll('a[href]');
  for (let i = 0; i < anchors.length; i++) {
    const href = anchors[i].getAttribute('href');
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:')
    ) {
      anchors[i].setAttribute('target', '_blank');
      anchors[i].setAttribute('rel', 'noopener');
    }
  }
});

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function () {
    const target = this.innerText.trim().toLowerCase();

    // Deactivate all pages and links
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove('active');
    }
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove('active');
    }

    // Activate the matching page
    for (let j = 0; j < pages.length; j++) {
      if (pages[j].dataset.page === target) {
        pages[j].classList.add('active');
        break;
      }
    }

    // Activate clicked link
    this.classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);
  });
}