var projectPopupModule = (function () {
	var init = function () {
		_setUpListeners();
	};

	var _vars = {
		btnShowSelector : '.js--show-project-popup',
		btnHideSelector : '.js--hide-project-popup',

		popupSelector : '.block-project-popup',
		popupActiveClass : 'block-project-popup--active',

		iframeSelector : '.block-project-popup__iframe',
		githubLinkSelector : '.block-project-popup__controls-link',

		preloader : document.querySelector('.block-preloader') || false,
		preloaderVisibleClass : 'block-preloader--visible'
	};

	var _setUpListeners = function () {
		_bindShowBtns();
		_bindHideBtns();
	};

	var _bindShowBtns = function () {
		var btns = document.querySelectorAll(_vars.btnShowSelector);

		for (var i = 0; i < btns.length; i++) {
			(function (i) {
				var popup = document.querySelector(_vars.popupSelector),
						projectSrc = btns[i].dataset.src,
						githubLinkHref = btns[i].getAttribute("href"),
						iframe = popup.querySelector(_vars.iframeSelector),
						githubLink = popup.querySelector(_vars.githubLinkSelector);

				btns[i].addEventListener('click', function (e) {
					e.preventDefault();

					if (popup) {
						mobileNavModule.hide();

						iframe.setAttribute('src', projectSrc);
						githubLink.setAttribute('href', githubLinkHref);

						if (_vars.preloader)
							_vars.preloader.classList.add(_vars.preloaderVisibleClass);

						iframe.onload = function () {
							popup.classList.add(_vars.popupActiveClass);

							if (_vars.preloader)
								_vars.preloader.classList.remove(_vars.preloaderVisibleClass);
						}
					}
				});
			})(i);
		}
	};

	var _bindHideBtns = function () {
		var btns = document.querySelectorAll(_vars.btnHideSelector);

		for (var i = 0; i < btns.length; i++) {
			btns[i].addEventListener('click', function (e) {
				e.preventDefault();
				_hidePopup();
			});
		}
	}; 

	var _hidePopup = function () {
		var popup = document.querySelector(_vars.popupSelector);

		if (popup)
			popup.classList.remove(_vars.popupActiveClass);
	};

	return {
		init: init,
		hide: _hidePopup
	};

})();
