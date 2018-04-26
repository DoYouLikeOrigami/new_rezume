var map = {
	cols: 12,
	rows: 12,
	tsize: 64,
	layers: [[
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
		3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
		3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
		3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
		3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3,
		3, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 3,
		3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
		3, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 3,
		3, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3,
		3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
		3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 3,
		3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3
	], [
		4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
		4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
		4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
		4, 0, 0, 5, 0, 0, 0, 0, 0, 5, 0, 4,
		4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
		4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
		4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
		4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
		4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
		4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4,
		4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
		4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3
	]],

	getTile: function (layer, col, row) {
		return this.layers[layer][row * this.cols + col];
	},

	setTile: function (layer, col, row, value) {
		this.layers[layer][row * this.cols + col] = value;
	},

	isSolidTileAtXY: function (x, y) {
		var col = Math.floor(x / this.tsize);
		var row = Math.floor(y / this.tsize);

		// tiles 3 and solid -- the rest are walkable
		// loop through all layers and return TRUE if any tile is solid
		return this.layers.reduce(function (res, layer, index) {
			var tile = this.getTile(index, col, row);
			var isSolid = tile === 3;
			return res || isSolid;
		}.bind(this), false);
	},

	getTargets: function () {
		var targets = [];

		// tiles 5 are targets

		for (var i = 0; i < this.layers.length; i++) {
			for (var col = 0; col < this.cols; col++) {
				for (var row = 0; row < this.rows; row++) {
					var tile = this.getTile(i, col, row);
					if (tile === 5)
						targets.push([this.getX(col), this.getY(row)]);
				}
			}
		}

		return targets;
	},

	removeTarget: function (x, y) {
		var col = Math.floor(x / this.tsize),
				row = Math.floor(y / this.tsize);

		for (var i = 0; i < this.layers.length; i++) {
			var tile = this.getTile(i, col, row);

			if (tile === 5)
				this.setTile(i, col, row, 0);
		}
	},

	createTarget: function () {
		var possiblePlaces = [];

		for (var i = 0; i < this.layers[1].length; i++) {
			if (this.layers[1][i] >= 0 && 
					this.layers[1][i] <= 2 && 
					this.layers[0][i] >= 0 && 
					this.layers[0][i] <= 2) {
				possiblePlaces.push(i);
			}
		}

		var index = Math.floor(Math.random() * possiblePlaces.length),
				targetPosition = possiblePlaces[index];

		this.layers[1][targetPosition] = 5;

		var row = Math.floor(targetPosition / this.cols),
				col = targetPosition % this.cols;

		return [this.getX(col), this.getY(row)];
	},

	getCol: function (x) {
		return Math.floor(x / this.tsize);
	},

	getRow: function (y) {
		return Math.floor(y / this.tsize);
	},

	getX: function (col) {
		return col * this.tsize;
	},

	getY: function (row) {
		return row * this.tsize;
	}
};