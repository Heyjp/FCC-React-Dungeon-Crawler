var React = require('react');
var ReactDOM = require('react-dom');

class Canopy extends React.Component {
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
  <Canopy />,
  document.getElementById('root')
);
