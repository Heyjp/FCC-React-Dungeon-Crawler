// Resource gathering  -  https://stackoverflow.com/questions/35261956/javascript-game-code-running-very-slow

/*
    Sources of Images

    Tuxedo = http://opengameart.org/users/dezrasdragons
    ChestRed = http://opengameart.org/users/hippo
    Dragon = http://opengameart.org/content/dragon-pixel-art
    Earth019 (evil tree) = http://opengameart.org/users/emerald

*/

export class Enemy  {

  constructor (key) {
    this.img = new Image();
    this.img.src = "img/earth019.png";

    this.key = key;

    // dimensions on the map
    this.destWidth = 35;
    this.destHeight = 35;

    // dimensions of the sprite on the png
    this.sourceX = 150;
    this.sourceY = 5;
    this.width = 120;
    this.height = 110;

    // stats for the enemy
    this.health = random(60, 100) * 2;
    this.experience = this.health / 4;

    this.damage = 10;
  }

  draw (ctx) {
    c_context.drawImage(this.img,
        this.sourceX,
        this.sourceY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.destWidth,
        this.destHeight
    );
  }

  getLocation (leafs) {
    let rooms = leafs;
    let randomLeaf = rooms[Math.floor(Math.random() * (leafs.length - 0) + 0)];

    let newObj = findRandomSpot(randomLeaf);
    let x = newObj.x;
    let y = newObj.y;

    this.x = x;
    this.y = y;
  }

  combat (player) {
    this.health -= player.damage;

    if (this.health <= 0) {
      player.experience += Math.floor(this.experience / player.level);
      this.remove = true;

        if (player.experience > (100 * player.level)) {
          player.levelUp();
        }
    }
        // updateEnemyUI(this)
  }

}

export class Weapon {

  constructor () {
    var weaponsList = ["Dagger", "ShortSword", "BattleAxe", "Longsword", "Claymore", "Dual Swords", "Excalibur"]

    this.img = new Image();
    this.img.src = "img/ChestRed.png"

    // change this to weaponsList.length
    this.num = random(0, weaponsList.length - 1);
    this.name = weaponsList[this.num];

    // Item Stats
    this.multiplier = (this.num + 1) * 2;
    this.baseDamage = 10;
    this.damage = this.baseDamage * this.multiplier;

    this.x = Math.floor(random(0, 2000));
    this.y = Math.floor(random(0, 2000));

    // dimensions on the map
    this.destWidth = 35;
    this.destHeight = 35;

    // dimensions of the sprite on the png
    this.sourceX = 0;
    this.sourceY = 0;
    this.width = 24;
    this.height = 24;
  }

}


export class Potion {
  constructor () {
    // Source of images from http://opengameart.org/users/rafaelchm
    this.img = new Image();
    this.img.src = "img/pt2.png"

    this.num = random(0, 4);
    switch (this.num) {
        case 0:
            this.img.src = "img/pt1.png"
            this.health = 25;
            break;
        case 1:
            this.img.src = "img/pt2.png"
            this.health = 50;
            break;
        case 2:
            this.img.src = "img/pt3.png"
            this.health = 75;
            break;
        case 3:
            this.img.src = "img/pt4.png"
            this.health = 100;
            break;
        default:
            this.img.src = "img/pt4.png"
            this.health = 100;
            break;

  }

    // dimensions on the map
    this.destWidth = 35;
    this.destHeight = 35;

    // dimensions of the sprite on the png
    this.sourceX = 0;
    this.sourceY = 0;
    this.width = 375;
    this.height = 375;
}

class Boss extends Enemy {

  constructor () {
    this.img = new Image();
    this.img.src = "img/dragon.png";

    // dimensions on the map
    this.destWidth = 35;
    this.destHeight = 35;

    // dimensions of the sprite on the png
    this.sourceX = 0;
    this.sourceY = 0;
    this.width = 32;
    this.height = 32;

    // stats for the enemy
    this.health = random(500, 750) * 2;
    this.experience = this.health / 4;

    this.damage = 10;
  }

  draw () {
    c_context.drawImage(this.img,
        this.sourceX,
        this.sourceY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.destWidth,
        this.destHeight
    );
  }

  combat (player) {
    this.health -= player.damage;

    if (this.health <= 0) {
      player.experience += Math.floor(this.experience / player.level);
      this.remove = true;

        if (player.experience > (100 * player.level)) {
          player.levelUp();
        }
      endGame();
    }
  }

}
