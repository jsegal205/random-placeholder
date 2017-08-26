import React, { Component } from 'react';
import './App.css';

const sources = [
  'http://baconmockup.com',
  'http://loremflickr.com',
  'http://lorempixel.com',
  'http://lorempizza.com',
  'https://morganfillman.space',
  'https://placebear.com',
  'http://placebeard.it',
  'http://www.fillmurray.com',
  'http://www.placecage.com',
  'http://www.stevensegallery.com',
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: '',
      width: '',
      placeholderBase: null,
      error: null,
    }

    this.generatePlaceholder = this.generatePlaceholder.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleWidthChange = this.handleWidthChange.bind(this);
  }

  generatePlaceholder() {
    if (!this.state.height) {
      this.setState({
        error: 'Please enter a height',
        placeholderBase: '',
      });
      return;
    }

    if (!this.state.width) {
      this.setState({
        error: 'Please enter a width',
        placeholderBase: '',
      });
      return;
    }

    this.setState({
      error: '',
      placeholderBase: sources[Math.floor(Math.random() * sources.length)],
    });
  }

  handleHeightChange(val) {
    this.setState({ height: val.target.value });
  }

  handleWidthChange(val) {
    this.setState({ width: val.target.value });
  }

  renderError() {
    if (!this.state.error) {
      return null;
    }

    return (
      <p>
        {this.state.error}
      </p>
    );
  }

  renderPlaceholder() {
    if (!this.state.placeholderBase) {
      return null;
    }

    const source = `${this.state.placeholderBase}/${this.state.width}/${this.state.height}`;

    return (
      <div>
        <div>
          <a href={this.state.placeholderBase} target="_blank">
            {source}
          </a>
        </div>
        <img src={source} alt={`random placeholder from ${this.state.placeholderBase}`} />
      </div>
    );
  }

  renderFooter() {
    const sourceMap = sources.map((s, i) => {
      return (<a href={s} target="_blank" key={i}>{s}</a>);
    });

    return (
      <div className="footer">
        Thank you to the following services:
        {sourceMap}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Random Placeholder Image</h2>
        </div>
        <p>
          Have you ever spent too much time looking for the best placeholder image to use in your mockup?
        </p>
        <p className="App-intro">
          Please enter measurements!
        </p>
        <div className="input-container">
          <div>
            <label>Height:&nbsp;</label>
            <input
              id="height"
              type="number"
              placeholder="300"
              value={this.state.height}
              onChange={this.handleHeightChange}
            />&nbsp;px
          </div>
          <div>
            <label>Width:&nbsp;</label>
            <input
              id="width"
              type="number"
              placeholder="300"
              value={this.state.width}
              onChange={this.handleWidthChange}
            />&nbsp;px
          </div>
        </div>
        <button onClick={this.generatePlaceholder}>Generate!</button>
        {this.renderError()}
        {this.renderPlaceholder()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default App;
