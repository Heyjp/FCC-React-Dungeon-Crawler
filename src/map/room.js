import React from 'react';

class Room extends React.Component {

  constructor (container) {
    this.x = container.x + random(0, Math.floor(container.w / 3));
    this.y = container.y + random(0, Math.floor(container.h / 3));
    this.w = container.w - (this.x - container.x);
    this.h = container.h - (this.y - container.y);
    this.w -= random(0, this.w / 3);
    this.h -= random(0, this.w / 3);

    return this;
  }

  paint (c) {
    c.fillStyle = "#888";
    c.fillRect(this.x * SQUARE, this.y * SQUARE, this.w * SQUARE, this.h * SQUARE);
  }

  drawPath (ctx, container) {
    ctx.beginPath();
    ctx.lineWidth = SQUARE * 50;
    ctx.strokeStyle = "#888";

    ctx.moveTo(this.center.x * SQUARE, this.center.y * SQUARE);
    ctx.lineTo(container.center.x * SQUARE, container.center.y * SQUARE);
    ctx.stroke();
  }
}

function draw_paths(ctx, tree) {
    if (tree.lchild == undefined || tree.rchild == undefined) {
        return;
    }

    tree.lchild.leaf.drawPath(ctx, tree.rchild.leaf);
    draw_paths(ctx, tree.lchild);
    draw_paths(ctx, tree.rchild);
}
