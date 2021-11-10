import 'normalize.css';
import	'./Styles/Header.css';
import './App.css';
import './Styles/global.css';
import "./Styles/Responsive.css";
import MainRouter from './Router/MainRouter';

function App() {
  return (
    <div className="App">
      <MainRouter/>
    </div>
  );
}

export default App;
