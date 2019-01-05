import React, { Component } from 'react'
import './styles/Square.css'
export default class Square extends Component {
    constructor(){
        super();
        this.state = {
            value: ' ',
            isX: true
        }
    }
  render() {
      const  { isX }  = this.state;
    return (
      <button className="square"
        onClick={ () => this.props.onClick() }
      >
        { this.props.value }
      </button>
    )
  }
}
