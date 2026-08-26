import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Greetings from './components/Greetings/Greetings';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navigation />

             {/*Main content with proper IDs for anchor navigation */}
            <section id="home" className="section">
                <Greetings />
            </section>

            <section id="about" className="section">
                <About />
            </section>

            <section id="projects" className="section">
                <Projects />
            </section>

            <section id="contact" className="section">
                <Contact />
            </section>

            <Footer />
        </div>
    );
}

export default App;