//
// start up function
//

window.onload = function () {
	var container = document.querySelector('.main-screen__canvas'),
			canvas = container.querySelector('#canvas');

	Game.run(container, canvas);
};
