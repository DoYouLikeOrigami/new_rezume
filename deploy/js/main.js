"use strict";var mainModule=function(){var e=function(){},o=function(){mainTopperModule.init(),showTextModule.init(".js--show-about-text",".section-about__text","section-about__text--mobile-visible"),showTextModule.initMultiple(".section-exp",".js--show-text",".section-exp__item-descr","section-exp__item-descr--mobile-visible","Показать описание"),mobileNavModule.init(),projectPopupModule.init();var e=document.querySelector(".js--main-scroll")||!1;if(e){var o=e.getAttribute("href");scrollModule.bindScroll(e,o)}};return{init:function(){e(),o()}}}(),mainTopperModule=function(){var o={activeClass:"main-topper--visible",mainTopper:document.querySelector(".main-topper")||!1,linksSelector:".main-topper__nav ul li a"},e=function(){r(),n()},t=function(){},r=function(){window.addEventListener("scroll",function(){var e=parseInt(window.pageYOffset||document.documentElement.scrollTop);o.mainTopper.clientHeight<=e?o.mainTopper.classList.add(o.activeClass):o.mainTopper.classList.remove(o.activeClass)})},n=function(){for(var r=o.mainTopper.querySelectorAll(o.linksSelector),e=0;e<r.length;e++)!function(t){r[t].addEventListener("click",function(e){e.preventDefault();var o=r[t].getAttribute("href");scrollModule.scrollTo(o)})}(e)};return{init:function(){o.mainTopper&&(e(),t())}}}(),mobileNavModule=function(){var t={mobileNavButtonSelector:".js-show-mobile-nav",hideNavSelector:".js-hide-mobile-nav",mobileNavSelector:".mobile-nav",mobileNavHiddenClass:"mobile-nav--hidden",overlay:document.querySelector(".block-overlay")||!1,overlayActiveClass:"block-overlay--active",linksSelector:".mobile-nav__link"},e=function(){r(document.querySelectorAll(t.mobileNavButtonSelector)),n(),l(),u()},o=function(){},r=function(e){if(!e)return console.error("mobileNavModule -> _bindMobileNav : no navBtn found or passed: "+e),!1;for(var o=0;o<e.length;o++)e[o].addEventListener("click",function(e){e.preventDefault(),i()});return!0},n=function(){t.overlay&&t.overlay.addEventListener("click",function(e){e.preventDefault,c()})},l=function(){if(t.hideNavSelector)for(var e=document.querySelectorAll(t.hideNavSelector),o=0;o<e.length;o++)e[o].addEventListener("click",function(e){e.preventDefault(),c()})},i=function(){var e=document.querySelector(t.mobileNavSelector);return e&&(e.classList.remove(t.mobileNavHiddenClass),t.overlay&&t.overlay.classList.add(t.overlayActiveClass)),!0},c=function(){var e=document.querySelector(t.mobileNavSelector);return e&&(e.classList.add(t.mobileNavHiddenClass),t.overlay&&t.overlay.classList.remove(t.overlayActiveClass)),!0},u=function(){var e=document.querySelector(t.mobileNavSelector);if(!e)return!1;for(var r=e.querySelectorAll(t.linksSelector),o=0;o<r.length;o++)!function(t){r[t].addEventListener("click",function(e){e.preventDefault();var o=r[t].getAttribute("href");c(),scrollModule.scrollTo(o)})}(o)};return{init:function(){e(),o()},show:function(){return i()},hide:function(){return c()}}}(),projectPopupModule=function(){var c={btnShowSelector:".js--show-project-popup",btnHideSelector:".js--hide-project-popup",popupSelector:".block-project-popup",popupActiveClass:"block-project-popup--active",iframeSelector:".block-project-popup__iframe",githubLinkSelector:".block-project-popup__controls-link",preloader:document.querySelector(".block-preloader")||!1,preloaderVisibleClass:"block-preloader--visible"},e=function(){o(),t()},o=function(){for(var i=document.querySelectorAll(c.btnShowSelector),e=0;e<i.length;e++)!function(e){var o=document.querySelector(c.popupSelector),t=i[e].dataset.src,r=i[e].getAttribute("href"),n=o.querySelector(c.iframeSelector),l=o.querySelector(c.githubLinkSelector);i[e].addEventListener("click",function(e){e.preventDefault(),o&&(mobileNavModule.hide(),n.setAttribute("src",t),l.setAttribute("href",r),c.preloader&&c.preloader.classList.add(c.preloaderVisibleClass),n.onload=function(){o.classList.add(c.popupActiveClass),c.preloader&&c.preloader.classList.remove(c.preloaderVisibleClass)})})}(e)},t=function(){for(var e=document.querySelectorAll(c.btnHideSelector),o=0;o<e.length;o++)e[o].addEventListener("click",function(e){e.preventDefault(),r()})},r=function(){var e=document.querySelector(c.popupSelector);e&&e.classList.remove(c.popupActiveClass)};return{init:function(){e()},hide:r}}(),scrollModule=function(){var n={topper:document.querySelector(".main-topper")||!1},t=function(e){var o=document.querySelector(e),t=0,r=0;if(!o)return console.error("Error in scrollModule -> scrollTo : no item found by selector "+e),!1;n.topper&&"none"!=n.topper.style.display&&(t=n.topper.clientHeight),(r=o.offsetTop+t)<0&&(r=0),window.scroll({top:r,left:0,behavior:"smooth"})};return{scrollTo:t,bindScroll:function(e,o){if(!e||!o)return console.error("Error in scrollModule -> bindScroll : no element or selector passed"),!1;e.addEventListener("click",function(e){e.preventDefault(),t(o)})}}}(),showTextModule=function(){var a=function(o,t,r,e){if(!o||!t||!r)return console.error("Error in showTextModule -> _bind : no btn, textBlock or textActiveClass found"),!1;var n=e||"Читать далее";o.addEventListener("click",function(e){e.preventDefault(),t.classList.contains(r)?o.innerText=n:o.innerText="Скрыть текст",t.classList.toggle(r)})},c=function(e,o,t,r,n){if(!e||!r)return console.error("Error in showTextModule -> _bindAll : no block or textActiveClass found"),!1;var l,i=e.querySelectorAll(o),c=e.querySelectorAll(t);if(!i||!c)return console.error("Error in showTextModule -> _bindAll : no btns or texts found"),!1;for(var u=0;u<i.length;u++)a(i[l=u],c[l],r,n)};return{init:function(e,o,t,r){var n=document.querySelector(e),l=document.querySelector(o);a(n,l,t,r)},initMultiple:function(e,o,t,r,n){for(var l=document.querySelectorAll(e),i=0;i<l.length;i++)c(l[i],o,t,r,n)}}}();mainModule.init();