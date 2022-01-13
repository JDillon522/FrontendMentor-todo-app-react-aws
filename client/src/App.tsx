import React, { Component } from 'react';
import './App.css';
import icon from './images/icon-cross.svg';

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = { data: null }
    this.testApi()
  }

  async testApi() {
    const data = await fetch('/api');
    console.log(await data.json())
  }

  render() {
    return (
      <section>
        <div>Works</div>
        <img src={icon} alt="" />
      </section>
    );

  }
}

export default App;
