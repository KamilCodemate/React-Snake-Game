import React from 'react';
import Board from './Board';
import './Game.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      head: [0, 2],
      apple: [],
      direction: null,
      body: [[0, 1]],
      snakeLength: 1,
      displayText: 'Press [SPACE] to start the game',
      didGameStarted: false,
      speed: 120,
    };
    this.move = this.move.bind(this);
    this.generateApple = this.generateApple.bind(this);
    this.isAppleEaten = this.isAppleEaten.bind(this);
    this.checkLoss = this.checkLoss.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        if (!this.state.didGameStarted) {
          this.generateApple();
          this.setState({
            didGameStarted: true,
            direction: 'right',
            displayText: '',
          });
        }
      }
    });
    document.addEventListener('keydown', (e) => {
      if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && this.state.direction !== 'right' && this.state.didGameStarted)
        this.setState({ direction: 'left' });
      if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && this.state.direction !== 'left' && this.state.didGameStarted)
        this.setState({ direction: 'right' });
      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && this.state.direction !== 'bottom' && this.state.didGameStarted)
        this.setState({ direction: 'top' });
      if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && this.state.direction !== 'top' && this.state.didGameStarted)
        this.setState({ direction: 'bottom' });
    });
    setInterval(() => this.move(), this.state.speed);
  }

  move() {
    let newBody = this.state.body;
    newBody.unshift(this.state.head);
    if (newBody.length > this.state.snakeLength) {
      newBody.pop();
    }

    switch (this.state.direction) {
      case 'left':
        this.setState((prevState) => ({
          head: [prevState.head[0], prevState.head[1] - 1],
          body: newBody,
        }));
        break;
      case 'right':
        this.setState((prevState) => ({
          head: [prevState.head[0], prevState.head[1] + 1],
          body: newBody,
        }));
        break;
      case 'top':
        this.setState((prevState) => ({
          body: newBody,
          head: [prevState.head[0] - 1, prevState.head[1]],
        }));
        break;
      case 'bottom':
        this.setState((prevState) => ({
          body: newBody,
          head: [prevState.head[0] + 1, prevState.head[1]],
        }));
        break;
      default:
        break;
    }
    this.isAppleEaten();
    this.checkLoss();
  }

  generateApple() {
    while (true) {
      const appleRow = Math.floor(Math.random() * 15);
      const appleColumn = Math.floor(Math.random() * 15);

      if (
        !(appleRow === this.state.head[0] && appleColumn === this.state.head[1]) &&
        !this.state.body.some((square) => square[0] === appleRow && square[1] === appleColumn)
      ) {
        this.setState({
          apple: [appleRow, appleColumn],
        });
        return;
      }
    }
  }

  isAppleEaten() {
    if (this.state.head[0] === this.state.apple[0] && this.state.head[1] === this.state.apple[1]) {
      this.setState((prevState) => ({
        snakeLength: prevState.snakeLength + 1,
      }));
      this.generateApple();
    }
  }

  checkLoss() {
    const head = this.state.head;
    const body = this.state.body;
    if (head[0] > 14 || head[0] < 0 || head[1] > 14 || head[1] < 0) {
      this.handleLoss('quitting map');
    }

    if (body.slice(1).some((square) => square[0] === head[0] && square[1] === head[1])) {
      this.handleLoss('hit yourself');
    }
    if (this.state.snakeLength >= 254) {
      this.handleLoss('win');
    }
  }

  handleLoss(reason) {
    this.setState({
      didGameStarted: false,
      displayText: `Loss by ${reason}. Press [SPACE] to try again`,
      direction: null,
      body: [[0, 1]],
      head: [0, 2],
      snakeLength: 1,
    });
    if (reason === 'win') {
      this.setState({
        displayText: 'Congrats! You won! Press [SPACE] to play again',
      });
    }
  }
  render() {
    return (
      <div className='container'>
        <div className='mainGame'>
          <div className='board'>
            <Board head={this.state.head} body={this.state.body} apple={this.state.apple} />
          </div>
          <div className='stats'>
            <div className='points'>
              <span>Points: {this.state.snakeLength - 1}</span>
            </div>
          </div>
        </div>
        <div className='start'>{this.state.displayText}</div>
      </div>
    );
  }
}

export default Game;
