import React from 'react';


class Enemy extends React.Component {

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
