import React from 'react';
import Container from './container.js';
import Tree from './tree.js';
import {split_container, random_split} from './room-builder.js';
import Room from './room.js'


const canvas = document.createElement('canvas');

const c_context = canvas.getContext('2d');

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

    let canvas = document.createElement('canvas');
    canvas.width = MAP_SIZE;
    canvas.height = MAP_SIZE;

    this.canvas = canvas;
  }
}



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
