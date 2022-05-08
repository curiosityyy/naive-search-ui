import './App.css';
import Search from './components/Search'
import {Helmet} from 'react-helmet';

function App() {
  return (
    <div  className="App">
        <Helmet>
            <style>{'body { background-color: white; }'}</style>
        </Helmet>
     <Search />
    </div>
  );
}

export default App;
