import './App.css';
import Hello from './components/Hello';
import Start from './components/Start';
import HelloProps from './components/HelloProps';
import Counter from './components/Counter';
import InputSample from './components/InputSample';
import InputSample2 from './components/InputSample2';
import UserList from './components/user/UserList';
import UserList2 from './components/user/UserList2';

function App() {
  return (
    <div className="App">
      <h1>Hello React World~!!</h1>
      <Start />
      <Hello />
      <Hello />
      <HelloProps name="react" color="red"/>
      <hr />
      <Counter />
      <hr />
      <InputSample />
      <InputSample2 />
      <hr />
      {/* <UserList /> */}
      <hr />
      <UserList2 />
    </div>
  );
}

export default App;
