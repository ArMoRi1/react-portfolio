import React from 'react';
import Navigation from '../src/components/Navigation/Navigation';
import Greetings from '../src/components/Greetings/Greetings';
// import About from '../src/components/About';
// import Projects from '../src/components/Projects';
// import Contact from '../src/components/Contact';
// import Footer from '../src/components/Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <Navigation />

             {/*Main content with proper IDs for anchor navigation */}
            <section id="home" className="section">
                <Greetings />
            </section>

            {/*<section id="about" className="section">*/}
            {/*    <AboutSection />*/}
            {/*</section>*/}

            {/*<section id="projects" className="section">*/}
            {/*    <ProjectsSection />*/}
            {/*</section>*/}

            {/*<section id="contact" className="section">*/}
            {/*    <ContactSection />*/}
            {/*</section>*/}

            {/*/!* Additional sections that might not be in main navigation *!/*/}
            {/*<MenuSection />*/}
            {/*<FooterSection />*/}
        </div>
    );
}

export default App;