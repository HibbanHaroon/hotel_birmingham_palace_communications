import Content from './components/Content';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <div className="App">
      <div><Toaster/></div>
      <Content />
    </div>
  );
}

export default App;
