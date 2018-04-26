//
// Game object
//

var Game = {};


Game.run = function (container, canvas) {
	this.container = container;
	this.canvas = canvas;
	this.ctx = this.canvas.getContext('2d');
	this._resizeCanvas();
	
	this._previousElapsed = 0;

	var p = this.load();
	Promise.all(p).then(function (loaded) {
		this.init();
		window.requestAnimationFrame(this.tick);
	}.bind(this));
};


Game.tick = function (elapsed) {
	window.requestAnimationFrame(this.tick);

	// clear previous frame
	this.ctx.clearRect(0, 0, this.ctxW, this.ctxH);

	// compute delta time in seconds -- also cap it
	var delta = (elapsed - this._previousElapsed) / 1000.0;
	delta = Math.min(delta, 0.25); // maximum delta of 250 ms
	this._previousElapsed = elapsed;

	this.update(delta);
	this.render();
}.bind(Game);


Game.load = function () {
	return [
		Loader.loadImage('tiles', '../assets/tiles.png'),
		Loader.loadImage('hero', '../assets/character.png')
	];
};


Game.init = function () {
	Keyboard.listenForEvents(
		[Keyboard.LEFT, Keyboard.RIGHT, Keyboard.UP, Keyboard.DOWN]);
	this.tileAtlas = Loader.getImage('tiles');

	this.hero = new Hero(map, 160, 160);
	this.camera = new Camera(map, this.ctxW, this.ctxH);
	this.camera.follow(this.hero);

	this.ctx.font = '18px Raleway';	

	(function (game) {
		window.addEventListener('resize', function () {
			game._resizeCanvas();
		});
	})(this);
};


Game.update = function (delta) {
	this.hero.update(delta, this.camera.following.screenX, this.camera.following.screenY);
	this.camera.update();
};


Game.render = function () {
	this._drawLayer({tile : 3});
	this._drawLayer({tile : 4});

	// draw map background layer
	this._drawLayer({layer : 0});

	// draw main character
	this.ctx.drawImage(
		this.hero.image,
		this.hero.screenX - this.hero.width / 2,
		this.hero.screenY - this.hero.height / 2);

	// draw map top layer
	this._drawLayer({layer : 1});

	this.ctx.fillText('Собрано кустов: ' + this.hero.targetsAchieved, 20, 30);
};


Game._resizeCanvas = function () {
	var canvasW = this.container.clientWidth 
								- this.container.clientWidth % map.tsize,

			canvasH = this.container.clientHeight
								- this.container.clientHeight % map.tsize;

	this.canvas.setAttribute('width', canvasW);
	this.canvas.setAttribute('height', canvasH);
	this.ctxW = canvasW;
	this.ctxH = canvasH;

	if ('camera' in this) {
		this.camera.init(map, canvasW, canvasH); // reset camera width and height
	}
};


Game._drawLayer = function (data) {
	var startCol = Math.floor(this.camera.x / map.tsize);
	var endCol = startCol + (this.camera.width / map.tsize);
	var startRow = Math.floor(this.camera.y / map.tsize);
	var endRow = startRow + (this.camera.height / map.tsize);
	var offsetX = -this.camera.x + startCol * map.tsize;
	var offsetY = -this.camera.y + startRow * map.tsize;

	for (var c = startCol; c <= endCol; c++) {
		for (var r = startRow; r <= endRow; r++) {
			var tile;

			if ('layer' in data) { tile = map.getTile(data.layer, c, r); }
			else if ('tile' in data) { tile = data.tile; }
			
			var x = (c - startCol) * map.tsize + offsetX;
			var y = (r - startRow) * map.tsize + offsetY;
			if (tile !== 0) { // 0 => empty tile
				this.ctx.drawImage(
					this.tileAtlas, // image
					(tile - 1) * map.tsize, // source x
					0, // source y
					map.tsize, // source width
					map.tsize, // source height
					Math.round(x),  // target x
					Math.round(y), // target y
					map.tsize, // target width
					map.tsize // target height
				);
			}
		}
	}
};


Game._drawGrid = function () {
	var width = map.cols * map.tsize;
	var height = map.rows * map.tsize;
	var x, y;

	for (var r = 0; r < map.rows; r++) {
		x = - this.camera.x;
		y = r * map.tsize - this.camera.y;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(width, y);
		this.ctx.stroke();
	}

	for (var c = 0; c < map.cols; c++) {
		x = c * map.tsize - this.camera.x;
		y = - this.camera.y;
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x, height);
		this.ctx.stroke();
	}
};
