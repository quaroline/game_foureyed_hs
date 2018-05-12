var cnv = document.querySelector("canvas");
var ctx = cnv.getContext("2d");
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close");

var bgMenu = new Image();
	bgMenu.src = "img/bg_menu.png";

ctx.drawImage(bgMenu, 0, 0, cnv.width, cnv.height);

var width = cnv.width, height = cnv.height;

var leftA = 65, upW = 87, rightD = 68, downS = 83;
var left = 37, up = 38, right = 39, down = 40;
var map = 77, credits = 67, pause = 80;

var checkKey = false;

var mvLeft = mvUp = mvRight = mvDown = false;

var tileSize = 10;
var tileSrcSize = 96;

var img = new Image();
	img.src = "img/img.png";

var walls = [],
	tables = [],
	lockers = [],
	bookcases = [],
	easels = [],
	tableTeachers = [],
	tableBooks = [],
	tablePCS = [],
	skeletons = [],
	keys = [];

var player = {

	x: 385 + 2,
	y: 240 + 2,
	width: 24,
	height: 32,
	speed: 2,
	srcX: 0,
	srcY: tileSrcSize,
	countAnim: 0

};

var key = {

	x: 115,
	y: 584,
	width: 20-5,
	height: 21-5,
	srcX: 0,
	srcY: tileSrcSize

}


var T_width = maze[0].length * tileSize,
	T_height = maze.length * tileSize;

for(var row in maze) {

	for(var column in maze[row]) {

		var tile = maze[row][column];
		var x = column*tileSize;
		var y = row*tileSize;

		if (tile === 1) {

			var wall = {

				x: tileSize*column,
				y: tileSize*row,
				width: tileSize,
				height: tileSize

			};

			walls.push(wall);

		}

		if (tile === 2 || tile === 3 || tile === 9 || tile === 10) {

			var table = {

				x: tileSize*column+10,
				y: tileSize*row+7,
				width: 32/2-4,
				height: 37/2-7

			};

			tables.push(table);

		}

		if (tile === 13) {

			var locker = {

				x: tileSize*column+4,
				y: tileSize*row-10,
				width: 48/2-4,
				height: 30

			};

			lockers.push(locker);

		}

		if (tile === 4 || tile === 5) {

			var bookcase = {

				x: tileSize*column+14,
				y: tileSize*row-10,
				width: 48/2-4,
				height: 30

			};

			bookcases.push(bookcase);

		}

		if (tile === 8) {

			var tableTeacher = {

				x: tileSize*column,
				y: tileSize*row+20,
				width: 32/2-4+35,
				height: 37/2-7+2

			};

			tableTeachers.push(tableTeacher);

		}

		if (tile === 17) {

			var easel = {

				x: tileSize*column+10,
				y: tileSize*row,
				width: 35-15,
				height: 41-25

			};

			easels.push(easel);

		}

		if (tile === 15) {

			var tableBook = {

				x: tileSize*column+20,
				y: tileSize*row,
				width: 98-50,
				height: 100-50

			};

			tableBooks.push(tableBook);

		}

		if (tile === 18) {

			var tablePC = {

				x: tileSize*column,
				y: tileSize*row,
				width: 72-20,
				height: 58-30

			};

			tablePCS.push(tablePC);

		}

		if (tile === 20) {

			var skeleton = {

				x: tileSize*column,
				y: tileSize*row,
				width: 34-20,
				height: 20

			};

			skeletons.push(skeleton);

		}

		if (tile === 21) {

			var key = {

				x: tileSize*column,
				y: tileSize*row,
				width: 34-20,
				height: 20

			};

			keys.push(key);

		}

	}

}


function blockRectangle(objA,objB) {

	var distX = (objA.x + objA.width/2) - (objB.x + objB.width/2);
	var distY = (objA.y + objA.height/2) - (objB.y + objB.height/2);

	var sumwidth = (objA.width + objB.width)/2;
	var sumheight = (objA.height + objB.height)/2;

	if (Math.abs(distX) < sumwidth && Math.abs(distY) < sumheight) {

		var overlapX = sumwidth - Math.abs(distX);
		var overlapY = sumheight - Math.abs(distY);

		if (overlapX > overlapY) {

			objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;

		} else {

			objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;

		}

	}

}

function render() {

	ctx.clearRect(0,0,width,height);

	ctx.save();
	ctx.translate(-cam.x,-cam.y);

	for(var row in maze) {

		for(var column in maze[row]) {

			var tile = maze[row][column];
			var x = column*tileSize;
			var y = row*tileSize;

			if (tile == 6) {

				ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);

			}

			ctx.drawImage(img,tile * tileSrcSize,0,tileSrcSize,tileSrcSize,x,y,tileSize,tileSize);

		}

	}

	for(var row in maze) {

		for(var column in maze[row]) {

			var tile = maze[row][column];
			var x = column*tileSize;
			var y = row*tileSize;

			switch (tile) {

				case 2: //Mesa vazia
					ctx.drawImage(img,127,305,32,38,x,y,32-4,38-4);
					break;

				case 3: //Mesa 1
					ctx.drawImage(img,96,306,32,37,x,y,32-4,37-4);
					break;

				case 4: //Estante 1 + parede
					ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,0,228,63,70,x,y,63-20,70-20);
					break;

				case 5: //Estante 2 + parede
					ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,64,227,64,70,x,y,64-20,71-20);
					break;

				case 7: //Quadro negro + parede
					ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,130,224,54,37,x,y,54-10,37-10);
					break;

				case 8: //Mesa professor + parede
					ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,130,260,62,45,x,y,62-4,45-4);
					break;

				case 9: //Mesa 2
					ctx.drawImage(img,128,343,32,38,x,y,32-4,38-4);
					break;

				case 10: //Mesa 2
					ctx.drawImage(img,96,343,32,38,x,y,32-4,38-4);
					break;

				case 11: //Grama
					ctx.drawImage(img,96,298,10,8,x,y,10,10);
					break;

				case 12: //Janela de fora + parede
					ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,96,381,85,56,x,y,85-20,56-20);
					break;

				case 13: //Armário fechado + parede
					ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,0,444,48,97,x,y,24-4,48-4);
					break;

				case 14: //Janela de dentro + parede
					ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,0,396,48,48,x,y,48-20,48-20);
					break;

				case 15: //Mesa biblioteca
					ctx.drawImage(img,0,0,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,48,437,98,100,x,y,98-20,100-20);
					break;

				case 16: //Escorregador
					ctx.drawImage(img,96,298,10,8,x,y,10,10);
					break;

				case 17: //Quadro 1
					ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,0,542,34,42,x,y,35-4,41-4);
					break;

				case 18: //Mesa + PC
					ctx.drawImage(img,0,0,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,97,681,72,58,x,y,72-15,58-15);
					break;

				case 19: //Cadeira PC
					ctx.drawImage(img,0,0,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,116,545,27,36,x,y,27-5,36-5);
					break;

				case 20: //Caveira
					ctx.drawImage(img,0,300,tileSrcSize,tileSrcSize,x,y,10,10);
					ctx.drawImage(img,151,440,34,70,x,y,34-15,70-25);
					break;

			}

		}

	}

	ctx.drawImage(img,player.srcX,player.srcY,player.width,player.height,player.x,player.y,player.width,player.height);
	ctx.drawImage(img,key.x,key.y,key.width+5,key.height+5,810,330,key.width,key.height);

	if ((player.x >= 799 && player.x <= 806) && (player.y >= 306 && player.y <= 326)) {

		checkKey = true;
		key.x=173;
		key.y=833;
		document.getElementById('fixed').style.display = 'block';

	}

	if ((player.x >= 734 && player.x <= 736) && (player.y >= 250 && player.y <= 257)) {

		if (checkKey) {
			
			player=0;
			document.getElementById('myModal').style.display = "block";

		}

	}

	if ((player.x >= 660 && player.x <= 667) && (player.y >= 445 && player.y <= 515)) {

		document.getElementById('fixed').style.display = 'none';

	}

	for(var row in maze) {

		for(var column in maze[row]) {

			var tile = maze[row][column];
			var x = column*tileSize;
			var y = row*tileSize;

			if (tile == "f") {

				ctx.drawImage(img,tileSrcSize,0,tileSrcSize,tileSrcSize,x,y,10,10);

			} else if (tile == 16) {

				ctx.drawImage(img,0,695,96,52,x,y,96-20,52-20);

			}

		}

	}

	ctx.restore();

}

function startGame() {

	cleanMenu();

	update();
	render();
	requestAnimationFrame(startGame,cnv);

	window.addEventListener("keydown",keydownHandler,false);
	window.addEventListener("keyup",keyupHandler,false);

}

function cleanMenu() {

	document.getElementById('single').style.display = 'none';

}

function cleanModal() {

	document.getElementById('myModal').style.display = "none";

}
