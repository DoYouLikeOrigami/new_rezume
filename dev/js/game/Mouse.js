var mousePos = false,
		canvas = document.querySelector('#canvas');

document.onmousemove = handleMouseMove;


function handleMouseMove(event) {
	var dot, eventDoc, doc, body, pageX, pageY;

	event = event || window.event; // IE-ism

	// If pageX/Y aren't available and clientX/Y are,
	// calculate pageX/Y - logic taken from jQuery.
	// (This is to support old IE)
	if (event.pageX == null && event.clientX != null) {
		eventDoc = (event.target && event.target.ownerDocument) || document;
		doc = eventDoc.documentElement;
		body = eventDoc.body;

		event.pageX = event.clientX +
			(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
			(doc && doc.clientLeft || body && body.clientLeft || 0);

		event.pageY = event.clientY +
			(doc && doc.scrollTop	|| body && body.scrollTop	|| 0) -
			(doc && doc.clientTop	|| body && body.clientTop	|| 0 );
	}

	mousePos = {
		x: event.pageX,
		y: event.pageY
	};
}


function getCoords(elem) { // кроме IE8-
	var box = elem.getBoundingClientRect();

	return {
		x: box.left + pageXOffset,
		y: box.top + pageYOffset,
		width: box.width,
		height: box.height,
	};

}


function getMousePosition() {
	if (!mousePos) {
		return false;
	}

	var canvasPos = getCoords(canvas);

	if (mousePos.x >= canvasPos.x &&
			mousePos.x <= canvasPos.x + canvasPos.width &&
			mousePos.y >= canvasPos.y &&
			mousePos.y <= canvasPos.y + canvasPos.height) 
	{
		return	{ 
			x: mousePos.x - canvasPos.x,
			y: mousePos.y - canvasPos.y
		};
	}

	return false;
}