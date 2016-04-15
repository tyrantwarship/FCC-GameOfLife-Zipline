import React from 'react';
import Cell from './Cell';
import Store from './Store';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size
    };
    this.lifeCyclePID = null;
  }

  componentWillMount() {
    // store listeners 
    Store.on('start', () => {
      this.startLifeCycle(this.props.speed);
    });
    Store.on('end', () => {
      this.endLifeCycle();
    });
  }

  componentDidMount() {
    this.startLifeCycle(this.props.speed);
  }

  componentWillReceiveProps(nextProps) {
    console.log('we are inside the compomentWillReceiveProps function');
    // check if cycle is running
    if (this.lifeCyclePID != null) {
      this.endLifeCycle();
      this.startLifeCycle(nextProps.speed);
    } 
  }

  populateBoardWithCells(size) {
    let row = 0;
    let col = 0;
    switch (size) {
      case 'small':
      row = 50;
      col = 30;
      break;
      case 'medium':
      row = 70;
      col = 50;
      break;
      case 'large':
      row = 100;
      col = 80;
      break;
    }
    // across
    const across = col;
    // down
    const down = row;
    // will be a two dimension array
    let board = [];
    for (let x = 0; x < across; x++) {
      board.push([]);
      for (let y = 0; y < down; y++) {
        board[x].push(<Cell id={ x+ ',' +y }/>);
      }
    }
    return board;
  }

  boardSize(size) {
    switch (size) {
      case 'small':
        return ;
        break;
      case 'medium':
        break;
      case 'large':
        break;
    }
  }

  checkForLife = () => {
    console.log('I am checking for life');
  }

  startLifeCycle = (speed) => {
    let counter = 0;
    // prevents previous PID's from being overwritten if user spam clicks 'start'
    if (this.lifeCyclePID === null) {
      this.lifeCyclePID = setInterval(() => {
        /* console.log(counter);
           counter++; */
        console.log('running at speed: ', speed);
        this.checkForLife();
      }, speed);
    }
  }

  endLifeCycle = () => {
    clearInterval(this.lifeCyclePID);
    // clear the PID after usage
    this.lifeCyclePID = null;
  }

  render() {
    const board = this.populateBoardWithCells(this.props.size);
    return (
      <div className={'board board-' + this.props.size}>
        {
          board
        }
      </div>
    );
  }
}

Board.defaultProps = {
  size: 'medium',
  speed: 1000
};
