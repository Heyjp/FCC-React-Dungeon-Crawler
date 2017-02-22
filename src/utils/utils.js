function Point(x, y) {
    this.x = x;
    this.y = y;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Container(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.center = new Point(
        this.x + (this.w / 2),
        this.y + (this.h / 2)
    )
}

function checkOverlap(object, x, y) {

    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].key === this.key) {
            continue;
        }
        let x, y, w, h;
        x = enemies[i].x;
        y = enemies[i].y;
        w = enemies[i].w;
        h = enemies[i].h;

        // Either x or y overlaps, find a new x and y on map
        if (this.x + this.width > x && this.x + this.width <= x + w) {
            this.getLocation(leafs);
        }
        if (this.y + this.height > y && this.y + this.height <= y + h) {
            this.getLocation(leafs);
        }
    }
    return true;
}


function randomSpot(leafs, object) {

    let rooms = leafs;
    let randomLeaf = rooms[Math.floor(Math.random() * (leafs.length - 0) + 0)]

    let newObj = findRandomSpot(randomLeaf);
    let x = newObj.x;
    let y = newObj.y;

    object.x = x;
    object.y = y;
}

function findRandomSpot(leaf) {

    // takes a random location in the room minus 40px for sprite width & height
    this.x = random(leaf.x +40, (leaf.x + leaf.w) - 40);
    this.y = random(leaf.y +40, (leaf.y + leaf.h) - 40);

    return this;
}


function createEnemies(min, max) {

    let minEnemies = min;
    let maxEnemies = max;

    let enemies = Math.random() * (max - min) + min;
    let enemiesArray = [];

    for (let i = 0; i < enemies; i++) {
        let newEnemy = new Enemy(i);
        enemiesArray.push(newEnemy);
    }

    let boss = new Boss();
    enemiesArray.push(boss);

    return enemiesArray;
}

function createWeapons(min, max) {

    let minEnemies = min;
    let maxEnemies = max;

    let enemies = Math.random() * (max - min) + min;
    let weaponsArray = [];

    for (let i = 0; i < enemies; i++) {
        let newWeapon = new Weapon(i);
        weaponsArray.push(newWeapon);
    }
    return weaponsArray;
}

function createPotions(min, max) {

    let minEnemies = min;
    let maxEnemies = max;

    let enemies = Math.random() * (max - min) + min;
    let potionsArray = [];

    for (let i = 0; i < enemies; i++) {
        let newEnemy = new Potion(i);
        potionsArray.push(newEnemy);
    }
    return potionsArray;
}

function populateMap(enemies) {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

function compareLocations (player, objects, direction) {
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

  function clearItems (objArray) {
    for (let i = 0; i < objArray.length; i++) {

      if (objArray[i].remove !== undefined) {
        objArray.splice(i, 1);
      }
    }
    return objArray;
  }


  function paintWorld (worldRooms) {
    c_context.clearRect(0, 0, canvas.width, canvas.height);
    worldRooms.forEach(function (e) {
      e.paint(c_context);
    })
    draw_paths(c_context, container_tree);
  }

  function updateLocs() {
      viewRect.update();
  }

  function drawCanvas() {
      viewRect.draw();
      player.draw();
  }

  // handle sprite and player movement
  function handleUpdate(e) {
      player.update();
      updateLocs();
      populateMap(enemiesArray);
      gameItems = clearItems(gameItems);
      paintWorld(rooms);
      updateUi(player);
      popItems(gameItems);
      drawCanvas();
  }

  function handleItems(weapons, potions, enemies) {
      let newArray = [];
      newArray = newArray.concat(potions).concat(weapons).concat(enemies);

      newArray.forEach(function(e) {
          return randomSpot(rooms, e);
      });
      return newArray;
  }

  function popItems(items) {

      function draw(obj) {
          c_context.drawImage(obj.img,
              obj.sourceX,
              obj.sourceY,
              obj.width,
              obj.height,
              obj.x,
              obj.y,
              obj.destWidth,
              obj.destHeight
          );
      }

      items.forEach(function(e) {
          return draw(e);
      })
  }

  function updateUi (player) {
    var health = `Health: ${player.health}`;
    var damage = `Damage: ${player.damage}`;
    var weapon = `Weapon: ${player.weapon}`;
    var level = `Level: ${player.level}`;
    var experience = `Experience: ${player.experience}`;

    var healthBar = document.querySelector('#health');
    var levelBar = document.querySelector('#level')
    var weaponBar = document.querySelector('#weapon');
    var damageBar = document.querySelector('#damage');
    var experienceBar = document.querySelector('#experience');

    healthBar.textContent = health;
    weaponBar.textContent = weapon;
    damageBar.textContent = damage;
    levelBar.textContent = level;
    experienceBar.textContent = experience;
  }

  function updateEnemyUI (enemy) {

    var health = `Health: ${enemy.health}`;
    var damage = `Damage: ${enemy.damage}`;

    var healthBar = document.querySelector('#eHealth');
    var damageBar = document.querySelector('#eDamage');



    if (enemy.health <= 0) {
      setTimeout(function () {
        clearEnemyUI(enemy);
      }, 1000)
    }

    healthBar.textContent = health;
    damageBar.textContent = damage;
  }

  function clearEnemyUI (enemy) {

    if (enemy.health <= 0) {
      enemy.health = 0;
    }
    var health = `Health: ${enemy.health}`;
    var damage = `Damage: ${enemy.damage}`;

    var healthBar = document.querySelector('#eHealth');
    var damageBar = document.querySelector('#eDamage');

    healthBar.textContent = health;
    damageBar.textContent = "Defeated!";
  }


  function changeDirection (e){
    console.log("keydown")
    player.moving = true;
        switch(e.keyCode)
          {
              case 37: // left arrow
                  player.left = true;
                  player.direction = "left";
                  break;
              case 38: // up arrow
                player.up = true;
                player.direction = "up";
                  break;
              case 39: // right arrow
                  player.right = true;
                  player.direction = "right";
                  break;
              case 40: // down arrow
                  player.down = true;
                  player.direction = "down";
                  break;
              default:
                return;
          }
  }

  function startTheGame () {
    loadImages();
  }
