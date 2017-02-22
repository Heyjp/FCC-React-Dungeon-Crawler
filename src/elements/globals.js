// =============================================================================


// Resource gathering  -  https://stackoverflow.com/questions/35261956/javascript-game-code-running-very-slow

var playerImg = new Image();
var enemyImg = new Image();
var itemChest = new Image();
var pt1 = new Image();
var pt2 = new Image();
var pt3 = new Image();
var pt4 = new Image();
var dragon = new Image();

/*
    Sources of Images

    Tuxedo = http://opengameart.org/users/dezrasdragons
    ChestRed = http://opengameart.org/users/hippo
    Dragon = http://opengameart.org/content/dragon-pixel-art
    Earth019 (evil tree) = http://opengameart.org/users/emerald

*/

var imageSrcs = ['img/Tuxedo.png', 'img/ChestRed.png', 'img/earth019.png', 'img/pt1.png', 'img/pt2.png', 'img/pt3.png', 'img/pt4.png', 'img/dragon.png'];
var images = [playerImg, enemyImg, itemChest, pt1, pt2, pt3, pt4, dragon];
var loadCount = 0; // keep a count of images that have loaded so far


var gameInt;

var view = document.querySelector('#view')
view.width = 750;
view.height = 750;

var v_context = view.getContext('2d');

// canvas & context
var canvas = document.createElement('canvas');
canvas.width = 2000;
canvas.height = 2000;

var c_context = canvas.getContext('2d');

var MAP_SIZE = 2000;
var SQUARE = canvas.width / MAP_SIZE;
var N_ITERATIONS = 5;
var DISCARD_BY_RATIO = true;
var H_RATIO = 0.45;
var W_RATIO = 0.45;

let xCounter = 0;
let yCounter = 0;


// world map container
var worldMap = new Container(0, 0, canvas.width, canvas.height);
var mapCopy = canvas.getContext('2d');

var container_tree = split_container(worldMap, N_ITERATIONS);
var viewPort = new Container(0, 0, view.width, view.height);

c_context.fillStyle = "#000";
c_context.fillRect(0, 0, canvas.width, canvas.height);
// paint outlines

container_tree.paint(c_context);
container_tree.paint(mapCopy);
// draw connections
draw_paths(c_context, container_tree);

var leafs = container_tree.getLeafs();

var rooms = [];
for (var i = 0; i < leafs.length; i++) {
    let room = new Room(leafs[i]);
    room.paint(c_context);
    rooms.push(room);
}

// player init
var player = new Player();
player.getLocation(rooms);

// camera init
var viewRect = new Camera(view, v_context, worldMap);
viewRect.follow(player);

// Create and draw NPCS on map
var enemiesArray = createEnemies(10, 30);
var potionsArray = createPotions(5, 15);
var weaponsArray = createWeapons(3, 10);

var gameItems = handleItems(weaponsArray, potionsArray, enemiesArray);
popItems(gameItems);

document.addEventListener('keydown', changeDirection);

document.addEventListener("keyup", function(e){
  this.direction = false;
  console.log("keyup", e.keyCode);
  player.moving = false;
    switch(e.keyCode)
    {
        case 37: // left arrow
            player.left = false;
            break;
        case 38: // up arrow
            player.up = false;
            break;
        case 39: // right arrow
            player.right = false;
            break;
        case 40: // down arrow
            player.down = false;
            break;
        default:
          return;
    }
});

loadImages();
