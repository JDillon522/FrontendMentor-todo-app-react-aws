import { Component } from 'react';
import './App.css';
import Header from '../header/Header';
import { RecoilRoot } from 'recoil';

class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = { data: null }
    this.testApi()
  }

  async testApi() {
    // const data = await fetch('/api');
    // console.log('API', await data.json())
  }

  render() {
    return (
      <RecoilRoot>
        <main className='App'>
          <Header />

        </main>
      </RecoilRoot>
    );

  }
}

export default App;
