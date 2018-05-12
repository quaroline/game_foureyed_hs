var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");

var width = cnv.width, height = cnv.height;

var leftA = 65, upW = 87, rightD = 68, downS = 83;
var left = 37, up = 38, right = 39, down = 40;
var map = 77, credits = 67, run = 16, keys = 75;

var mvLeft = mvUp = mvRight = mvDown = false;

var cam = {

	x: 230,
	y: 80,
	width: width,
	height: height,

	innerLeftBoundary: function() { return this.x + (this.width*0.25); },
	innerTopBoundary: function() { return this.y + (this.height*0.25); }, 
	innerRightBoundary: function() { return this.x + (this.width*0.75); },
	innerBottomBoundary: function() { return this.y + (this.height*0.75); }

};

function keydownHandler(e) {

	var key = e.keyCode;

	switch(key) {

		case left:
		case leftA:
			mvLeft = true;
			break;

		case up:
		case upW:
			mvUp = true;
			break;

		case right:
		case rightD:
			mvRight = true;
			break;

		case down:
		case downS:
			mvDown = true;
			break;

		case map:
			cam.x = 0;
			cam.y = 0;
			cnv.width = 840;
			cnv.height = 560;
			cam.width = cnv.width;
			cam.height = cnv.height;
			break;

		case credits:
			document.getElementById('credits').style.display = 'block';
			break;

		case run:
			player.speed = 4;
			break;

		case keys:
			document.getElementById('keys').style.display = 'block';
			break;

	}

}

function keyupHandler(e) {

	var key = e.keyCode;

	switch(key) {

		case left:
		case leftA:
			mvLeft = false;
			break;

		case up:
		case upW:
			mvUp = false;
			break;

		case right:
		case rightD:
			mvRight = false;
			break;

		case down:
		case downS:
			mvDown = false;
			break;

		case map:
			cam.x = Math.max(0,Math.min(T_width - cam.width,cam.x));
			cam.y = Math.max(0,Math.min(T_height - cam.height,cam.y));
			cnv.width = 360;
			cnv.height = 360;
			cam.width = cnv.width;
			cam.height = cnv.height;
			break;

		case credits:
			document.getElementById('credits').style.display = 'none';
			break;

		case run:
			player.speed = 2;
			break;

		case keys:
			document.getElementById('keys').style.display = 'none';
			break;

	}

}

function update() {

	if (mvLeft && !mvRight) {

		player.x -= player.speed;
		player.srcY = tileSrcSize + player.height * 2;

	}

	if (mvRight && !mvLeft) {

		player.x += player.speed;
		player.srcY = tileSrcSize + player.height * 3;

	}

	if (mvUp && !mvDown) {

		player.y -= player.speed;
		player.srcY = tileSrcSize + player.height * 1;

	} 

	if (mvDown && !mvUp) {

		player.y += player.speed;
		player.srcY = tileSrcSize + player.height * 0;

	}

	if (mvLeft || mvRight || mvUp || mvDown) {

		player.countAnim++;

		if (player.countAnim >= 40) {

			player.countAnim = 0;

		}

		player.srcX = Math.floor(player.countAnim/5) * player.width;

	} else {

		player.srcX = 0;
		player.countAnim = 0;

	}

	for(var i in walls) {

		var wall = walls[i];
		blockRectangle(player,wall);

	}

	for(var i in tables) {

		var table1 = tables[i];
		blockRectangle(player,table1);

	}

	for(var i in lockers) {

		var locker = lockers[i];
		blockRectangle(player,locker);

	}

	for(var i in bookcases) {

		var bookcase = bookcases[i];
		blockRectangle(player,bookcase);

	}

	for(var i in easels) {

		var easel = easels[i];
		blockRectangle(player,easel);

	}

	for(var i in tableTeachers) {

		var tableTeacher = tableTeachers[i];
		blockRectangle(player,tableTeacher);

	}

	for(var i in tableBooks) {

		var tableBook = tableBooks[i];
		blockRectangle(player,tableBook);

	}

	for(var i in tablePCS) {

		var tablePC = tablePCS[i];
		blockRectangle(player,tablePC);

	}

	for(var i in skeletons) {

		var skeleton = skeletons[i];
		blockRectangle(player,skeleton);

	}

	for(var i in keys) {

		var key = keys[i];
		getKeys(player,key);

	}

	if (player.x < cam.innerLeftBoundary()) {

		cam.x = player.x - (cam.width * 0.25);

	}

	if (player.y < cam.innerTopBoundary()) {

		cam.y = player.y - (cam.height * 0.25);

	}

	if (player.x + player.width > cam.innerRightBoundary()) {

		cam.x = player.x + player.width - (cam.width * 0.75);
	}

	if (player.y + player.height > cam.innerBottomBoundary()) {

		cam.y = player.y + player.height - (cam.height * 0.75);

	}

	cam.x = Math.max(0,Math.min(T_width - cam.width,cam.x));
	cam.y = Math.max(0,Math.min(T_height - cam.height,cam.y));

}