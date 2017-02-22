//==============================================================================
// World collision detection ==================================================
// =============================================================================


// Take the sprite coordinates and check for black pixels
function checkContext(ctx, player) {

  let centerX = Math.floor(player.x + (player.destWidth / 2));
  let centerY = Math.floor(player.y + (player.destHeight / 2));

  let imgObj;

  if (!player.moving) {
    return;
  }

  if (player.left) {
    console.log("left");
    centerX -= 25;
    imgObj = ctx.getImageData(centerX, centerY, 1, 1);
  } else if (player.right) {
    console.log("right");
    centerX += 10;
    imgObj = ctx.getImageData(centerX, centerY, 1, 1);
  } else if (player.up) {
    console.log("up");
    centerY -= 35;
    imgObj = ctx.getImageData(centerX, centerY, 1, 1);
  } else if (player.down) {
    console.log("down");
    centerY += 10;
    imgObj = ctx.getImageData(centerX, centerY, 1, 1);
  }

  if (loopPixelData(imgObj)) {
    return true;
  } else {
    return false;
  }

}

// loop over the object data array to see if there are any black pixels
function loopPixelData(obj) {
    for (let i = 0; i < obj.data.length; i += 4) {
        if (obj.data[i] === 136) {
            return true;
        } else if (obj.data[i] === 0) {
          return false;
        }
    }
    return true;
}
