import React, { useState, useRef, useEffect } from 'react';
import GameScene from './components/GameScene';
import MainMenu from './components/MainMenu';
import HUD from './components/HUD';
import { CarbonCreditCalculator } from './game/CarbonCreditCalculator';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu');
  const [gameData, setGameData] = useState(() => ({
    carbonCredits: 0,
    energyOrbs: 100,
    currentArea: 'Forest Valley',
    co2Absorbed: 0,
    co2Target: 1000,
    areaHealth: 100,
    carbonCreditsHistory: [],
    totalInvestment: 0,
    carbonPriceHistory: [],
    lastCalculationTime: Date.now()
  }));

  const [tool, setTool] = useState('plant');
  const [treeStats, setTreeStats] = useState({ total: 0, alive: 0, mature: 0 });
  const gameToolSetter = useRef(null);

  // 🎵 Nhạc nền
  const bgMusicRef = useRef(null);

  // Khởi tạo audio 1 lần duy nhất khi app load
  useEffect(() => {
    const audio = new Audio("/assetGame/bg-music.mp3");
    audio.loop = true;            // 🔁 phát lặp lại
    audio.volume = 0.1;           // âm lượng mặc định
    bgMusicRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const startGame = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play().catch(err => {
        console.warn("Không phát nhạc được:", err);
      });
    }
    setGameState('playing');
  };

  const pauseGame = () => {
    setGameState('paused');
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
    }
  };

  const resumeGame = () => {
    setGameState('playing');
    if (bgMusicRef.current) {
      bgMusicRef.current.play();
    }
  };

  const returnToMenu = () => {
    setGameState('menu');
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0; // reset nhạc về đầu
    }
  };

  const updateGameData = (newData) => {
    setGameData(prev => ({ ...prev, ...newData }));
  };

  const handleToolChange = (newTool) => {
    console.log("App: Tool changed to", newTool);
    setTool(newTool);
    if (gameToolSetter.current) {
      gameToolSetter.current(newTool);
    }
  };

  const handleTreeStatsChange = (stats) => {
    setTreeStats(stats);
  };

  const calculateCarbonCredits = (plants, environment, treeStats) => {
    const calculator = new CarbonCreditCalculator();
    const currentTime = Date.now();
    const timeElapsed = (currentTime - gameData.lastCalculationTime) / 1000;

    const newCredits = calculator.calculateRealTimeCredits(plants, environment, timeElapsed);

    const updatedData = {
      carbonCredits: gameData.carbonCredits + newCredits,
      lastCalculationTime: currentTime,
      carbonCreditsHistory: [
        ...gameData.carbonCreditsHistory,
        {
          timestamp: currentTime,
          credits: newCredits,
          total: gameData.carbonCredits + newCredits
        }
      ]
    };

    updateGameData(updatedData);
  };

  return (
    <div className="App">
      {gameState === 'menu' && (
        <MainMenu onStartGame={startGame} />
      )}

      {gameState === 'playing' && (
        <div className="game-container">
          <GameScene
            gameData={gameData}
            updateGameData={updateGameData}
            onPause={pauseGame}
            onToolChange={fn => { gameToolSetter.current = fn; }}
            onTreeStatsChange={handleTreeStatsChange}
          />
          <HUD
            gameData={gameData}
            onPause={pauseGame}
            tool={tool}
            onToolChange={handleToolChange}
            treeStats={treeStats}
          />
        </div>
      )}

      {gameState === 'paused' && (
        <div className="game-container">
          <GameScene
            gameData={gameData}
            updateGameData={updateGameData}
            onPause={pauseGame}
            isPaused={true}
            onToolChange={fn => { gameToolSetter.current = fn; }}
            onTreeStatsChange={handleTreeStatsChange}
          />
          <HUD
            gameData={gameData}
            onPause={pauseGame}
            tool={tool}
            onToolChange={handleToolChange}
            treeStats={treeStats}
          />
          <div className="pause-overlay">
            <div className="pause-menu">
              <h2>Tạm dừng</h2>
              <button onClick={resumeGame}>Tiếp tục</button>
              <button onClick={returnToMenu}>Quay về menu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
