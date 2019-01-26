import React, { Component } from 'react'
import Square from './Square';

export default class Game extends Component {
    constructor() {
        super();
        this.state = {
            xIsNext: true,
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0
        }
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }
    handleClick(i) {
        const { xIsNext } = this.state;
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) return;

        squares[i] = xIsNext ? 'X' : 'O';

        this.setState({
            squares: squares,
            history: history.concat([{
                squares: squares
            }]),
            xIsNext: !xIsNext,
            stepNumber: history.length
        });
    } encapsulated
    renderSquare(i) {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        return <Square
            value={current.squares[i]}
            onClick={() => this.handleClick(i)}
        />
    }
    calculateWinner(squares) {
        const line = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let index = 0; index < line.length; index++) {
            const [a, b, c] = line[index];
            if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to ' + move :
                'Go to game start';
            return (
                <button key={move} onClick={() => this.jumpTo(move)}>{desc}</button>
            )
        });

        let status;
        if (winner) {
            status = `Winner : Player ${winner}`;
        }
        else {
            status = `Next Player : ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="moves">{moves}</div>
            </div>
        )
    }
}
