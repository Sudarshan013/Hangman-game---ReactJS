import React, { Component } from "react";
import {randomWord} from "./words"
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component{
  static defaultProps = {
    images : [img0, img1,img2, img3, img4, img5, img6],
    maxWrong: 6,
  }
  state = {
    nWrong: 0,
    guessed: new Set(),
    answer : randomWord()
  }
  generateButtons = () => {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,index) => {
      return <button
        key={index}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    })
  }
  guessedWord = () => {
    console.log('hey')
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }
  handleGuess = (event) => {
    let ltr = event.target.value;
    this.setState({
      guessed: this.state.guessed.add(ltr),
      nWrong: this.state.nWrong + (this.state.answer.split("").includes(ltr) ? 0 : 1)
    })
  }
  handleRestart = () => {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }
  render() {
    let isWinner = this.guessedWord().join("") === this.state.answer
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} />
        <p><strong>{isWinner ? "You win !!!!!" : null}</strong></p> git 
        {this.state.nWrong < this.props.maxWrong ?
          <div>
            <p>Number of Wrong guesses : {this.state.nWrong}</p>
            <p className='Hangman-word'>{this.guessedWord()}</p>
            <p className='Hangman-btns'>{this.generateButtons()}</p> 
          </div> :
          <div>
            <button className="restart-btn" onClick={this.handleRestart}>Restart</button>
            <p style={{ fontSize: '39px' }}>Answer : {this.state.answer} </p>
            <p style={{ fontSize: '69px' }}>GAME OVER</p>
          </div>
        }
      </div>
    );
  }
}


export default Hangman;
