function Hero(map, x, y) {
	this.map = map;
	this.x = x;
	this.y = y;
	this.width = map.tsize;
	this.height = map.tsize;

	this.image = Loader.getImage('hero');

	this.targets = this.map.getTargets();
	this.closestTarget = this._getClosestTarget();
	this.targetsAchieved = 0;

	this.handMode = false;
	this._bindHandModeBtn();
}


Hero.SPEED = 192; // pixels per second
Hero.EPS = 4; // max gap between hero and target


Hero.prototype.update = function (delta, screenX, screenY) {
	var targetId = this._checkTarget();
	if (targetId !== false) {
		this._activateTarget(targetId);
	}

	var dirx = 0;
	var diry = 0;

	if (this.handMode) {
		if (Keyboard.isDown(Keyboard.LEFT)) { dirx = -1; }
		else if (Keyboard.isDown(Keyboard.RIGHT)) { dirx = 1; }
		else if (Keyboard.isDown(Keyboard.UP)) { diry = -1; }
		else if (Keyboard.isDown(Keyboard.DOWN)) { diry = 1; }
		else {
			var mousePos = getMousePosition();

			if (mousePos) {
				if (mousePos.x - Hero.EPS > screenX) { dirx = 1; }
				else if (mousePos.x + Hero.EPS < screenX) { dirx = -1; }
				if (mousePos.y - Hero.EPS > screenY) { diry = 1; }
				else if (mousePos.y + Hero.EPS < screenY) { diry = -1; }
			}
		}
	}
	else {
		if (this.x < this.targets[this.closestTarget][0] + this.map.tsize / 2 - Hero.EPS) { 
		dirx = 1 
		}

		if (this.x > this.targets[this.closestTarget][0] + this.map.tsize / 2 + Hero.EPS) { 
			dirx = -1 
		}

		if (this.y < this.targets[this.closestTarget][1] + this.map.tsize / 2 - Hero.EPS) { 
			diry = 1 
		}

		if (this.y > this.targets[this.closestTarget][1] + this.map.tsize / 2 + Hero.EPS) { 
			diry = -1 
		}

		if (Math.abs(dirx) === 1 && Math.abs(diry) === 1) {
			dirx = dirx / Math.sqrt(2);
			diry = diry / Math.sqrt(2);
		}
	}

	this._move(delta, dirx, diry);
};


Hero.prototype._move = function (delta, dirx, diry) {
	// move hero
	this.x += dirx * Hero.SPEED * delta;
	this.y += diry * Hero.SPEED * delta;

	// check if we walked into a non-walkable tile
	this._collide(dirx, diry);

	// clamp values
	var maxX = this.map.cols * this.map.tsize;
	var maxY = this.map.rows * this.map.tsize;
	this.x = Math.max(0, Math.min(this.x, maxX));
	this.y = Math.max(0, Math.min(this.y, maxY));
};


Hero.prototype._collide = function (dirx, diry) {
	var row, col;
	// -1 in right and bottom is because image ranges from 0..63
	// and not up to 64
	var left = this.x - this.width / 2;
	var right = this.x + this.width / 2 - 1;
	var top = this.y - this.height / 2;
	var bottom = this.y + this.height / 2 - 1;

	// check for collisions on sprite sides
	var collision =
		this.map.isSolidTileAtXY(left, top) ||
		this.map.isSolidTileAtXY(right, top) ||
		this.map.isSolidTileAtXY(right, bottom) ||
		this.map.isSolidTileAtXY(left, bottom);
	if (!collision) { return; }

	if (diry > 0) {
		row = this.map.getRow(bottom);
		this.y = -this.height / 2 + this.map.getY(row);
	}
	else if (diry < 0) {
		row = this.map.getRow(top);
		this.y = this.height / 2 + this.map.getY(row + 1);
	}
	else if (dirx > 0) {
		col = this.map.getCol(right);
		this.x = -this.width / 2 + this.map.getX(col);
	}
	else if (dirx < 0) {
		col = this.map.getCol(left);
		this.x = this.width / 2 + this.map.getX(col + 1);
	}
};


Hero.prototype._getClosestTarget = function () {
	var minDist = false,
			closestId = false;

	for (var i = 0; i < this.targets.length; i++) {
		var currDist = Math.pow(Math.abs(this.x - this.targets[i][0]), 2)
										+ Math.pow(Math.abs(this.y - this.targets[i][1]), 2);

		if (closestId === false || currDist < minDist) {
			minDist = currDist;
			closestId = i;
		}
	}

	return closestId;
};


Hero.prototype._checkTarget = function () {
	if (this.closestTarget === false)
		return false;

	var xDist, yDist;

	for (var i = 0; i < this.targets.length; i++) {
		xDist = Math.abs(this.x - this.targets[i][0] - this.map.tsize / 2);
		yDist = Math.abs(this.y - this.targets[i][1] - this.map.tsize / 2);

		if (Math.pow(xDist, 2) + Math.pow(yDist, 2) <= Math.pow(this.map.tsize / 2, 2))
			return i;
	}

	return false;
};


Hero.prototype._activateTarget = function (targetId) {
	// delete target from map and hero's memory
	this.map.removeTarget(this.targets[targetId][0], this.targets[targetId][1]);
	this.targets.splice(targetId, 1);

	// create target and add it to hero's memory
	var newTarget = this.map.createTarget();
	this.targets.push(newTarget);

	// recount closestTarget and update counter
	this.closestTarget = this._getClosestTarget();
	this.targetsAchieved++;
};


Hero.prototype._bindHandModeBtn = function () {
	var handModeBtn = document.querySelector('.js--game-hand-mode');

	(function (hero) {
		handModeBtn.addEventListener('click', function (e) {
			e.preventDefault();

			if (hero.handMode) {
				hero.handMode = false;
				handModeBtn.textContent = 'Ручной режим';
			}
			else {
				hero.handMode = true;
				handModeBtn.textContent = 'Автоматический режим';
			}
		});
	})(this);
};