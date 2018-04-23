'use strict';
var showTextModule = (function () {
	var init = function (btnSelector, textSelector, textActiveClass, btnText) {
		var btn = document.querySelector(btnSelector),
				text = document.querySelector(textSelector);

		_bind(btn, text, textActiveClass, btnText);
	};

	var initMultiple = function (blockSelector, btnSelector, textSelector, textActiveClass, btnText) {
		var blocks = document.querySelectorAll(blockSelector);

		for (var i = 0; i < blocks.length; i++)
			_bindAll(blocks[i], btnSelector, textSelector, textActiveClass, btnText);
	};

	var _bind = function (btn, textBlock, textActiveClass, btnText) {
		if (!btn || !textBlock || !textActiveClass) {
			console.error('Error in showTextModule -> _bind : no btn, textBlock or textActiveClass found');
			return false;
		}

		var _btnText = (btnText) ? btnText : 'Читать далее';

		btn.addEventListener('click', function (e) {
			e.preventDefault();

			if (textBlock.classList.contains(textActiveClass))
				btn.innerText = _btnText
			else
				btn.innerText = 'Скрыть текст';

			textBlock.classList.toggle(textActiveClass);
		});
	};

	var _bindAll = function (block, btnSelector, textSelector, textActiveClass, btnText) {
		if (!block || !textActiveClass) {
			console.error('Error in showTextModule -> _bindAll : no block or textActiveClass found');
			return false;
		}

		var btns = block.querySelectorAll(btnSelector),
				texts = block.querySelectorAll(textSelector);

		if (!btns || !texts) {
			console.error('Error in showTextModule -> _bindAll : no btns or texts found');
			return false;
		}

		for (var i = 0; i < btns.length; i++) {
			(function (i) {
				_bind(btns[i], texts[i], textActiveClass, btnText);
			})(i);
		};
	};

	return {
		init: init,
		initMultiple: initMultiple
	};

})();
