import React from 'react';

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
