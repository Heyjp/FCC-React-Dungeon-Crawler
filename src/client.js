import React from 'react';
import ReactDOM from 'react-dom';

class Canvas extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div>Hello World!
      <p>Huuuugue works</p>
      </div>
    );
  }
}

ReactDOM.render(
  <Canvas />,
  document.getElementById('root')
);
