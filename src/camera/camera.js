/*
  Camera code based on Gustavo Carvalho on stack overflow

  http://stackoverflow.com/questions/16919601/html5-canvas-camera-viewport-how-to-actally-do-it
*/


import React from 'react';

class Camera extends React.Component {

  constructor (canvas, worldMap) {
    this.x = 0;
    this.y = 0

    this.xView = canvas.width;
    this.yView = canvas.height;
    this.centerX = this.xView / 2;
    this.centerY = this.yView / 2;

    // the deadzone
    this.deadZoneX = 0;
    this.deadZoneY = 0;

    // map dimensions
    this.worldW = worldMap.w;
    this.worldH = worldMap.h;
  }

  follow (followObj) {
    this.follow = followObj;
  }

  update () {
    // Camera within the boundaries of the world map
    if (this.follow.x - this.centerX < 0) {
        this.x = 0;
    } else if (this.follow.x + this.centerX > this.worldW) {
        this.x = this.worldW - this.xView;
    } else {
        this.x = this.follow.x - this.centerX;
    }

    if (this.follow.y - this.centerY < 0) {
        this.y = 0;
    } else if (this.follow.y + this.centerY > this.worldH) {
        this.y = this.worldH - this.yView;
    } else {
        this.y = this.follow.y - this.centerY;
    }
  }

  draw () {
    v_context.clearRect(0, 0, canvas.width, canvas.height);
    v_context.drawImage(canvas, this.x, this.y, this.xView, this.yView, 0, 0, this.xView, this.yView);
  }
}
