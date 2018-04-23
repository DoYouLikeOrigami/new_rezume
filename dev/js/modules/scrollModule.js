var scrollModule = (function () {
	var _vars = {
		topper : document.querySelector('.main-topper') || false
	};

	var scrollTo = function (selector) {
		var item = document.querySelector(selector),
				topperHeight = 0,
				offset = 0;

		if (!item) {
			console.error('Error in scrollModule -> scrollTo : no item found by selector ' + selector);
			return false;
		}

		if (_vars.topper && _vars.topper.style.display != 'none')
			topperHeight = _vars.topper.clientHeight;

		offset = item.offsetTop + topperHeight;
		(offset < 0) ? offset = 0 : false;

		window.scroll({
			top: offset, 
			left: 0, 
			behavior: 'smooth' 
		});
	};

	var bindScroll = function (element, selector) {
		if (!element || !selector) {
			console.error('Error in scrollModule -> bindScroll : no element or selector passed');
			return false;
		}

		element.addEventListener('click', function (e) {
			e.preventDefault();
			scrollTo(selector);
		});
	};

	return {
		scrollTo: scrollTo,
		bindScroll: bindScroll
	};

})();
