import React from 'react';


class Weapon extends React.Component {

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


class Potion extends React.Component {
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
