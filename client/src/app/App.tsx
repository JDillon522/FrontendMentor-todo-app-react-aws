import { Component } from 'react';
import './App.css';
import Header from '../header/Header';
import { RecoilRoot, useRecoilState } from 'recoil';
import { todoState } from '../state/atoms';

class App extends Component {
  todo = useRecoilState(todoState)[0];
  setTodo = useRecoilState(todoState)[1];

  componentDidMount() {

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
