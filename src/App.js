import './App.css';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';

function App() {
    return (
        <div>
            <Navbar />
            <main id='app'>
                <div>
                    <img src='/fifaCardBack (2).png' alt='FifaCard' />
                    <img src='/fifaCardBack (2).png' alt='FifaCard' />
                    <img src='/fifaCardBack (2).png' alt='FifaCard' />
                </div>
                <section>
                    <h1>Welcome<br />To the Fifa Card Page</h1>
                    <Link to='/cards'>Enter</Link>
                </section>
                <div>
                    <img src='/fifaCardBack (2).png' alt='FifaCard' />
                    <img src='/fifaCardBack (2).png' alt='FifaCard' />
                    <img src='/fifaCardBack (2).png' alt='FifaCard' />
                </div>
            </main>
        </div>
    );
}

export default App;
