import './App.css';
import { Link } from 'react-router-dom';

function App() {


    return (
        <main>
            <h1>Welcome<br />To the Fifa Card Page</h1>
            <button><Link to='/cards'>Cards</Link></button>
        </main>
    );
}

export default App;
