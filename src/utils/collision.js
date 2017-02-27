//==============================================================================
// World collision detection ==================================================
// =============================================================================


// Take the sprite coordinates and check for black pixels
export function checkContext(ctx, player) {
  let centerX = Math.floor(player.x + (player.destWidth / 2));
  let centerY = Math.floor(player.y + (player.destHeight / 2));
  let imgObj;

  if (!player.moving) {
    console.log("player not moving");
    return;
  }

  if (player.left) {
    console.log("left");
    centerX -= 20;
    imgObj = ctx.getImageData(centerX, centerY, 1, 1);
  } else if (player.right) {
    console.log("right");
    centerX += 5;
    imgObj = ctx.getImageData(centerX, centerY, 1, 1);
  } else if (player.up) {
    console.log("up");
    centerY -= 30;
    imgObj = ctx.getImageData(centerX, centerY, 1, 1);
  } else if (player.down) {
    console.log("down");
    centerY += 5;
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
          console.log("true");
            return true;
        } else if (obj.data[i] === 0) {
          console.log("false")
          return false;
        }
    }
    return true;
}

export function compareLocations (player, objects, direction) {
    // loop over all the objects to see if the playerLoc clashes with any of the objects

    // make sure combat does not occur unless moving towards enemy
    if (player.moving === false) {
      return false
    }
    for (let i = 0; i < objects.length; i++) {
      if (detectCollision(player, objects[i])) {
        console.log("collision detected, false");
        return false;
      }
    }
    console.log("true")
    return true;
}


function detectCollision (player, obj) {
      // Is the object x and y overlapping

      if (
         (player.x >= obj.x && player.y  >= obj.y) && (player.x  <= obj.x + obj.destWidth && player.y <= obj.y + obj.destHeight)
      || ((player.x + player.destWidth >= obj.x && player.y + player.destHeight >= obj.y) && (player.x +player.destWdith <= obj.x + obj.destWidth && player.y + player.destHeight <= obj.y + obj.destHeight) )
      )
        {
          console.log("handling collison", obj);
          handleCollision(player, obj);
          return true;
        }
      else {
        return false;
      }
}

function handleCollision (player, obj) {

      if (obj.constructor.name === "Enemy") {
        // run combat function
        return player.fightEnemy(obj);
      } else if (obj.constructor.name === "Weapon") {
        console.log("Weapon");
        // pick up weapon function
        return player.updateWeapon(obj);
      } else if (obj.constructor.name === "Potion") {
        console.log("Health")
        // update health
        return player.updateHealth(obj);
      } else if (obj.constructor.name === "Boss") {
        console.log("Health")
        // update health
        return player.fightEnemy(obj);
      }
  }
