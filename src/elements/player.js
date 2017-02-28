import {checkContext, compareLocations} from '../utils/collision.js';


export default class Player  {

  constructor () {
    // source of img file
    this.img = new Image();
    this.img.src = 'img/Tuxedo.png';

    // source sprite from img.src
    this.sourceX = 10;
    this.sourceY = 10;
    this.sourceWidth = 15;
    this.sourceHeight = 15;
    // location to place on canvas

    this.x = 200;
    this.y = 200;

    this.destWidth = 20;
    this.destHeight = 20;

    // Combat Stats
    this.health = 100;

    this.maxHealth = 100;

    this.weapon = "Nunchucks";

    this.experience = 0;
    this.level = 1;

    this.baseDamage = 10;
    this.weaponDamage = 0;
    this.damage = 10;

    // movement

    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

  }

  update (worldCtx, items) {

    if (!checkContext(worldCtx, this)) {
      return false
    }

    if (compareLocations (this, items)) {
        if (this.left) {
            this.x -= 10;
            this.lastMove = "left";
        }
        if (this.right) {
            this.x += 10;
            this.lastMove = "right";
        }
        if (this.up) {
            this.y -= 10;
            this.lastMove = "up";
        }
        if (this.down) {
            this.y += 10;
            this.lastMove = "down";
        }
      } else if (!compareLocations (this, items)) {
          if (this.lastMove === "left" && this.right) {
            this.x += 10;
          } else if (this.lastMove === "right" && this.left) {
            this.x -= 10
          } else if (this.lastMove === "up" && this.down) {
            this.y += 10
          } else if (this.lastMove === "down" && this.up) {
            this.y -= 10
          }
      }
    }

    draw (ctx, worldMap) {
      // Check to see whether player is in the deadZone
      this.xDeadZone = 375;
      this.yDeadZone = 375;

      let cameraX;
      let cameraY;


      if (this.x >= this.xDeadZone && this.x < worldMap.width - this.xDeadZone) {
          cameraX = this.xDeadZone;
      } else if (this.x > worldMap.width - this.xDeadZone) {
          cameraX = (this.x - worldMap.width) + this.xDeadZone * 2;
      } else {
          cameraX = this.x;
      }

      if (this.y >= this.yDeadZone && this.y < worldMap.height - this.yDeadZone) {
          cameraY = this.yDeadZone;
      } else if (this.y > worldMap.height - this.yDeadZone) {
          cameraY = (this.y - worldMap.height) + this.yDeadZone * 2;
      } else {
          cameraY = this.y;
      }

      ctx.drawImage(this.img,
          this.sourceY,
          this.sourceX,
          this.sourceWidth,
          this.sourceHeight,
          cameraX - this.destWidth / 2,
          cameraY - this.destHeight / 2,
          this.destWidth,
          this.destHeight
      );
    }

    getLocation () {
      // list of all the rooms on the map
      let rooms = leafs;
      // picks a random room
      let randomLeaf = rooms[Math.floor(Math.random() * (leafs.length - 0) + 0)]

      // Check if room is full or not.
      //  if (checkRoomPop(randomLeaf)) {
      //    this.getLocation(rooms);
      //  }

      // take random location and assign it to local vars x and y;
      let newObj = findRandomSpot(randomLeaf);
      let x = newObj.x;
      let y = newObj.y;

      // check if either overlap and if not assign x and y to this or rerun function for new coords
      // if (this.checkOverlap(enemiesObj, x, y)) {
      this.x = x;
      this.y = y;
      //} else {
      //  this.getLocation();
      //}
    }

    updateWeapon ( object) {
      this.weapon = object.name;
      this.weaponDamage = object.damage;
      this.damage = (this.baseDamage * this.level) + this.weaponDamage;
      object.remove = true;
      console.log(object);
    }

    fightEnemy (enemy) {
      this.health -= enemy.damage;
      enemy.combat(this);

      if (this.health <= 0) {
        this.lose()
      }
    }

    updateHealth (object) {
      if (this.health + object.health > this.maxHealth) {
        this.health = this.maxHealth;
      } else {
          this.health += object.health;
      }

      object.remove = true;
    }

    levelUp () {
      this.level++;
      this.maxHealth = 100 * (this.level /2);
      this.experience = this.experience % 100;
      this.health = this.maxHealth;
    }

    lose () {
      alert("You have died, try again!");
    }


}
