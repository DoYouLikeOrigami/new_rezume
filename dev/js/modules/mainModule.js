'use strict';
var mainModule = (function () {

	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var _setUpListeners = function () {
	};

	var _defaultRun = function () {
		mainTopperModule.init();
		showTextModule.init('.js--show-about-text', '.section-about__text', 'section-about__text--mobile-visible');
		showTextModule.initMultiple('.section-exp', '.js--show-text', '.section-exp__item-descr', 'section-exp__item-descr--mobile-visible', 'Показать описание');
		mobileNavModule.init();
		projectPopupModule.init();

		var mainBtn = document.querySelector('.js--main-scroll') || false;

		if (mainBtn) {
			var scrollToSelector = mainBtn.getAttribute("href");
			scrollModule.bindScroll(mainBtn, scrollToSelector)
		}
	};

	var _vars = {
		
	};

	return {
		init: init
	};

})();
