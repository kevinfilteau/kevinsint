import React from 'react';
import { Link } from 'react-router-dom';
import HeaderCard from './HeaderCard';
import '../../styles/header.css';

const Header = () => {
  return (
    <HeaderCard>
      <div className="header-content">
        <div className="header-title">
          <h1>Kevin Sint <small>Modular Synthesizers Electronic Music</small></h1>
        </div>
        
        <ul className="where">
          <li><a href="https://x.com/kevinsintlive" rel="nofollow">X</a></li>
          <li><a href="https://www.twitch.tv/kevinsint" rel="nofollow">Twitch</a></li>
          <li><a href="https://rumble.com/c/c-5919363" rel="nofollow">Rumble</a></li>
          <li><Link to="/for-sale">For Sale</Link></li>
          <li><a href="https://kevinsint.notion.site" rel="nofollow">More...</a></li>
        </ul>
      </div>
    </HeaderCard>
  );
};

export default Header;
