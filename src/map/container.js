import React from 'react';

class Container extends React.Component {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.center = new Point(
      this.x + (this.w / 2),
      this.y + (this.h / 2),
    )
  }

  paint (c) {
    c.strokeStyle = "#0F0";
    c.lineWidth = SQUARE;
    c.strokeRect(this.x * SQUARE, this.y * SQUARE,
        this.w * SQUARE, this.h * SQUARE
    );
  }



}
