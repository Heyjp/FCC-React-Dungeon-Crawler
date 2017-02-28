import React from 'react';
import Container from './container.js';
import Tree from './tree.js';
import {split_container, random_split} from './room-builder.js';
import Room from './room.js'

import {populateRooms} from '../utils/utils.js';
import {Enemy, Potion, Weapon, Boss} from '../elements/objects.js';


const MAP_SIZE = 2000;
const SQUARE = 1;
//canvas.width / MAP_SIZE;
const N_ITERATIONS = 5;


let newBox = new Container(0, 0, 2000, 2000);
let container_tree = split_container(newBox, N_ITERATIONS);
let world = container_tree.getLeafs();

let roomArray = [];
world.forEach(function (e) {
  let room = new Room(e);
  roomArray.push(room);
});

export default class WorldMap {
  constructor () {
    this.map = container_tree;
    this.rooms = roomArray;

    this.canvas = document.createElement('canvas');
    this.canvas.width = MAP_SIZE;
    this.canvas.height = MAP_SIZE;
    this.ctx = this.canvas.getContext('2d');

    this.objects = populateRooms(this.rooms, Enemy, Potion, Weapon, Boss);
  }

  drawObjects () {
    const ctx = this.ctx;
    this.objects.forEach(function (e) {
      e.draw(ctx);
    })
  }

}


/*
1) import the objects from objects.js
2) create a function to run once which populates the map with objects
    2.1) create min and max of enemies / items/ weapons to be in each rooms
    2.2) cycle through each room - create the alotted objects and get a random location
    2.3) when a location is added check to see if it overlaps with the previous objects, if so rerandom the location
    2.4) when the list of objects is finalized for that room, concat with larger array of all the objects on map
    2.5) exit once all the rooms are completed

*/

/*

Private and public functions...

public functions have access to private values


function Person(name, secret) {
    // public
    this.name = name;

    // private
    var secret = secret;

    // public methods have access to private members
    this.setSecret = function(s) {
        secret = s;
    }

    this.getSecret = function() {
        return secret;
    }
}

// Must use getters/setters
Person.prototype.spillSecret = function() { alert(this.getSecret()); };

*/
