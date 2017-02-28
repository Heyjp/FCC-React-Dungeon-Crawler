import React from 'react';
import ReactDOM from 'react-dom';

import WorldMap from './map/canvas.js';
import Room from './map/room.js'

import {draw_paths} from './map/room-builder.js';

import Camera from './camera/camera.js';
import Player from './elements/player.js';

import ImageList from './elements/images.js';

import {changeDirection, cancelDirection, clearItems} from './utils/utils.js'



class Map extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      worldMap: new WorldMap(),
      player: new Player(),
      Images: new ImageList()
    }
  }

  componentDidMount() {
    this.state.Images.loadImages();
    this.drawCanvas();
    this.setBackupCanvas();
    this.startGameLoop()
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



  startGameLoop () {
    var interval = setInterval(() => {
      this.updateMap(this.state.worldMap.canvas.getContext('2d'), this.state.worldMap.objects);
    }, 100);

    this.setState({
      interval
    });
  }

  stopGameLoop () {
    this.state.interval = clearInterval(interval);
    this.setState({
      interval: clearInterval(interval)
    })

  }

  updateMap (ctx, gameItems) {
    clearItems(this.state.worldMap.objects)

    this.state.player.update(ctx, gameItems);
    const backupCanvas = this.state.backupWorldMap

    this.state.worldMap.ctx.clearRect(0, 0, 2000, 2000);
    this.state.worldMap.ctx.drawImage(backupCanvas, 0, 0);
    this.state.worldMap.drawObjects(this.state.worldMap.canvas);

    console.log(this.state.worldMap, "this is worldMap");

  }

  render () {
    return (
      <div  tabIndex="0" className="game-container" onKeyUp={this.handleKeyUp.bind(this)} onKeyDown={this.handleKeyDown.bind(this)}>
        <Legend player={this.state.player} />
        <Canvas worldMap={this.state.worldMap.canvas} player={this.state.player}  width="750" height="750"  />
      </div>
    );
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

class Canvas extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      camera: new Camera(this.refs.canvas, this.props.worldMap)
    }
  }

  componentDidMount () {
    this.setCamera();
  }

  setCamera () {
      console.log("setting camera");
      const canvas = this.refs.canvas;
      const ctx = this.refs.canvas.getContext('2d');

      this.state.camera.follow(this.props.player);
      this.state.camera.update();
      this.state.camera.draw(ctx, this.props.worldMap);

  }

  componentWillReceiveProps() {
    this.drawNewMap();
    console.log("received props");

    setInterval(function() {
      this.drawNewMap();
    }.bind(this), 100);
  }

  drawNewMap () {
    this.state.camera.update();
    const canvas = this.refs.canvas;
    canvas.width = 750;
    canvas.height = 750;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.state.camera.draw(ctx, this.props.worldMap);
    this.props.player.draw(ctx, this.props.worldMap);

  }

  render() {
      return (
        <canvas ref="canvas" width="750" height="750"></canvas>
      )
  }

}


ReactDOM.render(
  <Map />,
  document.getElementById('root')
);
