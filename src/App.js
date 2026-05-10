import { useEffect, useRef, useState } from 'react';
import './App.css';

const breakfastItems = [
  'Sausage',
  'Bacon',
  'Fresh fruit',
  'Eggs',
  'Toast',
  'Oatmeal',
];

const drinkOptions = ['Water', 'Apple juice', 'Orange juice'];

const lunchItems = [
  'Chicken thighs',
  'Mashed potatoes',
  'Beans',
  'Green beans',
];

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingSong, setIsLoadingSong] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return undefined;
    }

    let fadeInterval;
    const startTimer = window.setTimeout(() => {
      audio.volume = 0;

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoadingSong(false);
          fadeInterval = window.setInterval(() => {
            audio.volume = Math.min(audio.volume + 0.025, 0.55);

            if (audio.volume >= 0.55) {
              window.clearInterval(fadeInterval);
            }
          }, 150);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoadingSong(false);
        });
    }, 5000);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(fadeInterval);
    };
  }, []);

  const playSong = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.volume = 0.55;
    audio.play().then(() => {
      setIsPlaying(true);
      setIsLoadingSong(false);
    });
  };

  const pauseSong = () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const toggleSong = () => {
    if (isLoadingSong) {
      return;
    }

    if (isPlaying) {
      pauseSong();
      return;
    }

    playSong();
  };

  return (
    <main className="page-shell">
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/A%20Song%20For%20Mama.mp3`}
        preload="auto"
        loop
      />

      <section className="welcome">
        <p className="eyebrow">Mother's Day Breakfast</p>
        <h1>Good morning, Mothers.</h1>
        <p className="welcome-message">
          Today starts with a table full of your favorites, a little extra
          sunshine, and all the love you make feel so easy every day.
        </p>
      </section>

      <section className="menu-panel" aria-labelledby="menu-heading">
        <div className="menu-heading">
          <p className="eyebrow">Served with love</p>
          <h2 id="menu-heading">Breakfast Menu</h2>
        </div>

        <div className="menu-grid">
          <div className="menu-section">
            <h3>Breakfast</h3>
            <ul>
              {breakfastItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="menu-section drinks">
            <h3>Drinks</h3>
            <ul>
              {drinkOptions.map((drink) => (
                <li key={drink}>{drink}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="menu-panel lunch-panel" aria-labelledby="lunch-heading">
        <div className="menu-heading">
          <p className="eyebrow">Later today</p>
          <h2 id="lunch-heading">Lunch Menu</h2>
        </div>

        <div className="menu-section lunch-section">
          <h3>Lunch</h3>
          <ul>
            {lunchItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="music-control" aria-live="polite">
        <div>
          <span className="music-label">Now Playing</span>
          <strong>
            {isLoadingSong
              ? 'Loading song...'
              : isPlaying
                ? 'A Song for Mama'
                : "Mom's song is paused"}
          </strong>
        </div>
        <button
          className={`music-button${isLoadingSong ? ' loading' : ''}`}
          type="button"
          onClick={toggleSong}
          disabled={isLoadingSong}
        >
          {isLoadingSong && <span className="spinner" aria-hidden="true" />}
          <span className="music-button-symbol" aria-hidden="true">
            {isLoadingSong ? '' : isPlaying ? '||' : '>'}
          </span>
          <span className="sr-only">
            {isLoadingSong ? 'Loading song' : isPlaying ? 'Pause song' : 'Play song'}
          </span>
        </button>
      </div>
    </main>
  );
}

export default App;
