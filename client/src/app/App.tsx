import './App.css';
import Header from '../header/Header';
import { RecoilRoot } from 'recoil';
import TodoCard from '../todo-card/TodoCard';
import Yeet from '../yeet/Yeet';
import { Amplify } from 'aws-amplify';

import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from '../aws-exports';
Amplify.configure(awsExports);

function App() {

  return (
    <RecoilRoot>
      <Yeet />
      <div className='App'>
        <Header />
          <TodoCard />
      </div>
    </RecoilRoot>
  );
}

export default withAuthenticator(App);
