import React from 'react';
import ReactDOM from 'react-dom';

import WorldMap from './map/canvas.js';
import Room from './map/room.js'

import {draw_paths} from './map/room-builder.js';

import Camera from './camera/camera.js';
import Player from './elements/player.js';

import ImageList from './elements/images.js';

import {changeDirection, cancelDirection} from './utils/utils.js'



class Canvas extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      worldMap: new WorldMap(),
      player: new Player()
    }
  }

  componentDidMount() {
    this.drawCanvas();
    this.setBackupCanvas();
    this.setCamera();

  }

  drawCanvas () {
    const ctx = this.state.worldMap.canvas.getContext('2d');
    this.state.worldMap.map.paint(ctx);
    this.state.worldMap.rooms.forEach(function (e) {
      e.paint(ctx);
    });
    draw_paths(ctx, this.state.worldMap.map);
  }

  handleKeyDown (e) {
    changeDirection(e.keyCode, this.state.player);
  }

  handleKeyUp(e)  {
    cancelDirection(e.keyCode, this.state.player);
  }


  setBackupCanvas () {

    let backupCanvas = document.createElement('canvas');
    backupCanvas.width = 2000;
    backupCanvas.height = 2000;
    let backupCtx = backupCanvas.getContext('2d');
    backupCtx.drawImage(this.state.worldMap.canvas, 0, 0);

    this.setState({
      backupWorldMap : backupCanvas
    })
  }

  setCamera () {
      const canvas = this.refs.canvas;
      const ctx = this.refs.canvas.getContext('2d');

      let camera = new Camera(this.refs.canvas, this.state.worldMap);
      camera.follow(this.state.player);

      camera.draw(ctx, this.state.worldMap.canvas);

      const newState = {...this.state};
      newState.camera = camera;

      // this.setState creates a pending state update, can write a cb to update you when the state has been updated
      this.setState(newState, function () {
        setInterval(() => {
          this.updateMap(this.state.worldMap.canvas.getContext('2d'), []);
        }, 200);
        return;
      });
      // store intervalId in the state so it can be accessed later:
  }

  updateMap (ctx, gameItems) {
    this.state.player.update(ctx, gameItems);
    this.state.camera.update();
    this.drawNewMap();
  }

  drawNewMap () {
    const drawNewCanvas = this.refs.canvas;
    const ctx = drawNewCanvas.getContext('2d');
    ctx.clearRect(0, 0, drawNewCanvas.width, drawNewCanvas.height);
    this.state.worldMap.drawObjects(this.state.worldMap.canvas);
    this.state.camera.draw(ctx, this.state.worldMap.canvas);
    this.state.player.draw(ctx, this.state.worldMap.canvas);
  }

  render() {
      return (
        <canvas tabIndex="0" onKeyUp={this.handleKeyUp.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} ref="canvas" width={this.props.width} height={this.props.height}></canvas>
      )
  }
}

class Legend extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
      return (
        <div className="stat-block">
          <ul>
            <li>Player</li>
            <li>Level: 0</li>
            <li>Weapon: Nunchucks</li>
            <li>Health</li>
          </ul>
          <hr />
          <ul>
            <li>Enemy</li>
            <li>Level: 0</li>
            <li>Health: 100</li>
          </ul>
          <hr />
          <h4>Legend</h4>
          <ul>
            <li>Player  <img src="img/tuxedo.png" alt="" /></li>
            <li>Enemy <img src="img/earth019.png" alt="" /></li>
            <li>Dragon <img src="img/dragon.png" alt="" /></li>
            <li>Weapons Chest <img src="img/chestRed.png" alt="" /></li>
            <li>Full Health Potion <img src="img/pt1.png" alt="" /></li>
            <li>75% Potion <img src="img/pt2.png" alt="" /></li>
            <li>50% Potion <img src="img/pt3.png" alt="" /></li>
            <li>25% potion <img src="img/pt4.png" alt="" /></li>
          </ul>
        </div>
    )
  }
}

class Map extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
     Images: new ImageList()
    }

  }

  componentDidMount () {
    this.state.Images.loadImages();
    console.log("Mounted!!!");
  }

  render () {
    return (
      <div>
        <Canvas width="750" height="750" />
      </div>
    );
  }
}

ReactDOM.render(
  <Map />,
  document.getElementById('root')
);

/*
<div>
  <h3>Roguelike Dungeon Crawler by HeyJP </h3>
  <div className="map-container">
    <Legend />
    <Canvas />
  </div>
</div>

*/
