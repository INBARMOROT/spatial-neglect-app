import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import logo1 from './assets/logo1.png';
import logo2 from './assets/logo2.png';
import WelcomeScreen from './components/WelcomeScreen';

interface Point {
  x: number;
  y: number;
  timestamp: number;
}

interface PointPair {
  first: Point;
  second: Point;
  direction: 'left' | 'right';
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  
  @media screen and (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Dot = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  width: min(40px, 10vw);
  height: min(40px, 10vw);
  border-radius: 50%;
  background-color: red;
  cursor: pointer;
  transform: translate(-50%, -50%);
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  touch-action: none;
`;

const Line = styled.div<{ $start: { x: number; y: number }; $end: { x: number; y: number } }>`
  position: absolute;
  left: ${props => props.$start.x}px;
  top: ${props => props.$start.y}px;
  width: ${props => {
    const dx = props.$end.x - props.$start.x;
    const dy = props.$end.y - props.$start.y;
    return Math.sqrt(dx * dx + dy * dy);
  }}px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.2);
  transform: rotate(${props => {
    const dx = props.$end.x - props.$start.x;
    const dy = props.$end.y - props.$start.y;
    return Math.atan2(dy, dx);
  }}rad);
  transform-origin: left center;
  z-index: 999;
`;

const GuideLineVertical = styled.div<{ $right?: boolean }>`
  position: absolute;
  top: 0;
  ${props => props.$right ? 'right' : 'left'}: 0;
  width: 6px;
  height: 100%;
  background-color: rgba(255, 0, 0, 0.4);
`;

const Stats = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  direction: rtl;
  font-family: 'Rubik', sans-serif;
  z-index: 1001;
`;

const ResultsContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 90vw;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  margin: 1rem;
  font-size: clamp(14px, 3vw, 16px);
`;

const AdBanner = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: min(60px, 15vh);
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 998;
  padding: 0.5rem;
`;

const RestartButton = styled.button`
  background: #3498db;
  color: white;
  font-family: 'Rubik', sans-serif;
  font-size: clamp(1rem, 3vw, 1.2rem);
  padding: clamp(0.5rem, 2vw, 0.8rem) clamp(1rem, 4vw, 2rem);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
`;

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [firstDot, setFirstDot] = useState<Point | null>(null);
  const [secondDot, setSecondDot] = useState<Point | null>(null);
  const [clickedFirst, setClickedFirst] = useState(false);
  const [stats, setStats] = useState<{ left: number[]; right: number[] }>({ left: [], right: [] });
  const [attempts, setAttempts] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const generateRandomPosition = useCallback(() => {
    const maxWidth = Math.min(window.innerWidth - 40, window.innerWidth * 0.9);
    const maxHeight = Math.min(window.innerHeight - 80, window.innerHeight * 0.9);
    const x = 20 + Math.random() * (maxWidth - 40);
    const y = 20 + Math.random() * (maxHeight - 40);
    return { x, y, timestamp: Date.now() };
  }, []);

  const resetDots = useCallback(() => {
    setFirstDot(generateRandomPosition());
    setSecondDot(null);
    setClickedFirst(false);
  }, [generateRandomPosition]);

  const startNewSession = () => {
    setStats({ left: [], right: [] });
    setAttempts(0);
    setShowResults(false);
    resetDots();
  };

  useEffect(() => {
    if (!showWelcome) {
      resetDots();
    }
  }, [showWelcome, resetDots]);

  const handleDotClick = (isFirst: boolean) => {
    if (isFirst && !clickedFirst) {
      setClickedFirst(true);
      setSecondDot(generateRandomPosition());
      return;
    }

    if (!isFirst && clickedFirst) {
      const reactionTime = (Date.now() - (firstDot?.timestamp || 0)) / 1000;
      const isRightSide = (secondDot?.x || 0) > window.innerWidth / 2;
      
      setStats(prev => ({
        left: isRightSide ? prev.left : [...prev.left, reactionTime],
        right: isRightSide ? [...prev.right, reactionTime] : prev.right
      }));

      setAttempts(prev => prev + 1);

      if (attempts + 1 >= 10) {
        setShowResults(true);
      } else {
        resetDots();
      }
    }
  };

  const calculateAverage = (arr: number[]) => {
    if (arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  return (
    <Container>
      <GuideLineVertical />
      <GuideLineVertical $right />
      
      {firstDot && (
        <Dot
          $x={firstDot.x}
          $y={firstDot.y}
          onClick={() => handleDotClick(true)}
        />
      )}
      
      {clickedFirst && secondDot && (
        <>
          <Line $start={firstDot!} $end={secondDot} />
          <Dot
            $x={secondDot.x}
            $y={secondDot.y}
            onClick={() => handleDotClick(false)}
          />
        </>
      )}

      <Stats>
        <div>זמן תגובה ממוצע בצד ימין: {calculateAverage(stats.right).toFixed(2)} שניות</div>
        <div>זמן תגובה ממוצע בצד שמאל: {calculateAverage(stats.left).toFixed(2)} שניות</div>
        <div>ניסיון {attempts}/10</div>
        {showResults && (
          <RestartButton onClick={startNewSession}>התחל מחדש</RestartButton>
        )}
      </Stats>

      <AdBanner>
        {/* Add your Google AdMob component here */}
        Ad Banner - ID: ca-app-pub-4533363193509892/4340858193
      </AdBanner>
    </Container>
  );
};

export default App; 