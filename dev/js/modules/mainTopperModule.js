'use strict';
var mainTopperModule = (function () {
	var init = function () {
		if (_vars.mainTopper) {
			_setUpListeners();
			_defaultRun();
		}
	};

	var _vars = {
		activeClass : 'main-topper--visible',
		mainTopper : document.querySelector('.main-topper') || false,
		linksSelector : '.main-topper__nav ul li a'
	};

	var _setUpListeners = function () {
		_fixMainTopper();
		_bindLinks();
	};

	var _defaultRun = function () {
	};

	var _fixMainTopper = function () {
		window.addEventListener('scroll', function() {
			var scrolled = parseInt(window.pageYOffset || document.documentElement.scrollTop),
					topperHeight = _vars.mainTopper.clientHeight;

			if (scrolled >= topperHeight) {
				_vars.mainTopper.classList.add(_vars.activeClass);
			}
			else {
				_vars.mainTopper.classList.remove(_vars.activeClass);
			};
		});
	};

	var _bindLinks = function () {
		var links = _vars.mainTopper.querySelectorAll(_vars.linksSelector);

		for (var i = 0; i < links.length; i++) {
			(function (i) {
				links[i].addEventListener('click', function (e) {
					e.preventDefault();

					var href = links[i].getAttribute("href");
					scrollModule.scrollTo(href);
				});
			})(i);
		}
	};

	return {
		init: init
	};

})();
