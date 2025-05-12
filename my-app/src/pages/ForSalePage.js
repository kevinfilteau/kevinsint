import React from 'react';
import Card from '../components/shared/Card';
import './ForSalePage.css';

const ForSalePage = () => {
  return (
    <>
      <Card>
        <h1>For Sale <small>Modular Synthesizers & Equipment</small></h1>
        
        <div className="modular-showcase">
          <a 
            href="https://modulargrid.net/e/racks/view/1972821#module-finder" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="modular-image-container"
          >
            <img 
              src="https://cdn.modulargrid.net/img/racks/modulargrid_1972821.jpg" 
              alt="Modular synthesizer equipment" 
              className="modular-image"
            />
          </a>
          
          <div className="modular-info">
            <p>Check out the modules I currently have to sell or trade.</p>
            <a 
              href="https://modulargrid.net/e/racks/view/1972821#module-finder" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
            >
              View modules
            </a>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ForSalePage;
