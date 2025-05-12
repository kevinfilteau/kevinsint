import React, { useEffect } from 'react';
import Card from '../components/shared/Card';

const HomePage = () => {
  useEffect(() => {
    // Initialize Twitch embed
    const script = document.createElement('script');
    script.src = 'https://player.twitch.tv/js/embed/v1.js';
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      if (window.Twitch) {
        new window.Twitch.Player("twitch-embed", {
          channel: "kevinsint"
        });
      }
    };
    
    // Initialize Twitter widgets
    const twitterScript = document.createElement('script');
    twitterScript.src = 'https://platform.twitter.com/widgets.js';
    twitterScript.async = true;
    twitterScript.charset = 'utf-8';
    document.body.appendChild(twitterScript);
    
    return () => {
      document.body.removeChild(script);
      if (twitterScript.parentNode) {
        document.body.removeChild(twitterScript);
      }
    };
  }, []);

  return (
    <>
      <Card>
        <h2>En direct sur Twitch<br/>
          <small>Interactions et modulations synthétiques</small>
        </h2>

        <p className="text-center">Jeudi 19 h</p>
        <p className="text-center">Venez discuter sur <a href="https://discord.com/channels/1195377163155816479/1195377678342160524">Discord</a> ou <a href="https://www.twitch.tv/kevinsint">Twitch</a></p>

        <div id="twitch-embed" className="responsive"></div>
      </Card>

      <Card id="social-x">
        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            Trying my first &quot;official&quot; video
            upload to X : ) I hope you&#39;ll like it. <a href="https://t.co/jrWwbbCg30">pic.twitter.com/jrWwbbCg30</a>
          </p>&mdash; Kevin Sint (@kevinsintlive) <a
            href="https://twitter.com/kevinsintlive/status/1842236313501647005?ref_src=twsrc%5Etfw">
            October 4, 2024
          </a>
        </blockquote>
      </Card>

      <Card>
        <div className="text">
          <h2>Bio ...</h2>

          <p>I've long had a passion for robotics and automation. However, today, with my IT business, I am drawn
            to more artistic hobbies.</p>

          <p>Since my twenties, I've been attracted to the idea of making music to express myself, but I never
            enjoyed learning to play an instrument.</p>

          <p>The day my friend introduced me to his Pocket Operator, everything changed. I was captivated by the
            ability to instantly create a rhythm that made me vibe.</p>

          <p>I ditched the DJ table, which I had enjoyed for the past year, and devoted myself to making music
            with my newly purchased PO-33, Volca Modular, and Volca Drum.</p>

          <p>Gradually exploring the world of sound synthesis through my friend and countless videos, I
            eventually took the plunge into the limitless world of modular synthesizers.</p>

          <p>I rediscovered the joy of hands-on interaction with tangible components —turning knobs, connecting
            wires— the same tactile satisfaction I once found in robotics and electronics, before everything
            became purely programmable.</p>

          <p>But above all, music sets me free.</p>

          <p><em>Kevin</em></p>
        </div>
      </Card>
    </>
  );
};

export default HomePage;
