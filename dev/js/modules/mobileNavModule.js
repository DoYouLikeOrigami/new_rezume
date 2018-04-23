var mobileNavModule = (function () {
	var init = function () {
		_setUpListeners();
		_defaultRun();
	};

	var show = function () {
		return _showMobileNav();
	};

	var hide = function () {
		return _hideMobileNav();
	};

	var _vars = {
		mobileNavButtonSelector : '.js-show-mobile-nav',
		hideNavSelector : '.js-hide-mobile-nav',

		mobileNavSelector : '.mobile-nav',
		mobileNavHiddenClass : 'mobile-nav--hidden',

		overlay : document.querySelector('.block-overlay') || false,
		overlayActiveClass : 'block-overlay--active',

		linksSelector : '.mobile-nav__link'
	};

	var _setUpListeners = function () {
		_bindMobileNav(document.querySelectorAll(_vars.mobileNavButtonSelector));
		_bindOverlayHideNav();
		_bindHideNav();
		_bindLinks();
	};

	var _defaultRun = function () {
	};

	var _bindMobileNav = function (navBtn) {
		if (navBtn) {
			for (var i = 0; i < navBtn.length; i++) {
				navBtn[i].addEventListener('click', function(e) {
					e.preventDefault();
					_showMobileNav();
				});
			}
		}

		else {
			console.error('mobileNavModule -> _bindMobileNav : no navBtn found or passed: ' + navBtn);
			return false;
		};

		return true;
	};

	var _bindOverlayHideNav = function () {
		if (_vars.overlay) {
			_vars.overlay.addEventListener('click', function(e) {
				e.preventDefault;
				_hideMobileNav();
			});
		};
	};

	var _bindHideNav = function () {
		if (_vars.hideNavSelector) {
			var hideBtns = document.querySelectorAll(_vars.hideNavSelector);

			for (var i = 0; i < hideBtns.length; i++) {
				hideBtns[i].addEventListener('click', function (ev) {
					ev.preventDefault();
					_hideMobileNav();
				});
			}
		};
	};

	var _showMobileNav = function () {
		var mobileNav = document.querySelector(_vars.mobileNavSelector);

		if (mobileNav) {
			mobileNav.classList.remove(_vars.mobileNavHiddenClass);

			if (_vars.overlay) {
				_vars.overlay.classList.add(_vars.overlayActiveClass);
			};
		};

		return true;
	};

	var _hideMobileNav = function () {
		var mobileNav = document.querySelector(_vars.mobileNavSelector);

		if (mobileNav) {
			mobileNav.classList.add(_vars.mobileNavHiddenClass);

			if (_vars.overlay) {
				_vars.overlay.classList.remove(_vars.overlayActiveClass);
			};
		};

		return true;
	};

	var _bindLinks = function () {
		var mobileNav = document.querySelector(_vars.mobileNavSelector);

		if (!mobileNav)
			return false;

		var links = mobileNav.querySelectorAll(_vars.linksSelector);

		for (var i = 0; i < links.length; i++) {
			(function (i) {
				links[i].addEventListener('click', function (e) {
					e.preventDefault();

					var href = links[i].getAttribute("href");

					_hideMobileNav();
					scrollModule.scrollTo(href);
				});
			})(i);
		}
	};

	return {
		init: init,
		show: show,
		hide: hide
	};

})();
