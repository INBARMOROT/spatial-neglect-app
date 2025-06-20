import React from 'react';
import styled from 'styled-components';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: clamp(1rem, 5vw, 2rem);
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
              url('https://img.freepik.com/free-vector/abstract-connection-network-background_1142-7892.jpg');
  background-size: cover;
  background-position: center;
  direction: rtl;
  text-align: right;
`;

const Title = styled.h1`
  font-family: 'Rubik', sans-serif;
  color: #2c3e50;
  font-size: clamp(1.5rem, 5vw, 2.5rem);
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContentBox = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: clamp(1rem, 4vw, 2rem);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: min(600px, 90vw);
  margin: 1rem;
  width: 100%;
`;

const Text = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: clamp(1rem, 3vw, 1.2rem);
  line-height: 1.6;
  color: #34495e;
  margin: 1rem 0;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: clamp(10px, 2vw, 20px);
  margin: 1.5rem 0;
  justify-content: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: clamp(0.5rem, 3vw, 1.5rem);
  max-width: min(800px, 95vw);
  gap: 1rem;
`;

const Logo = styled.img`
  height: clamp(40px, 10vw, 80px);
  object-fit: contain;
`;

const StartButton = styled.button`
  background: #3498db;
  color: white;
  font-family: 'Rubik', sans-serif;
  font-size: clamp(1rem, 3vw, 1.2rem);
  padding: clamp(0.5rem, 2vw, 0.8rem) clamp(1rem, 4vw, 2rem);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: clamp(1rem, 4vw, 2rem);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
`;

const Dot = styled.div<{ color: string }>`
  width: clamp(20px, 5vw, 30px);
  height: clamp(20px, 5vw, 30px);
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <Container>
      <LogoContainer>
        <Logo src={logo1} alt="Logo 1" />
        <Logo src={logo2} alt="Logo 2" />
      </LogoContainer>
      
      <Title>ברוכים הבאים לתרגול סריקה מרחבית</Title>
      
      <ContentBox>
        <Text>
          לחץ על הנקודה האדומה ולאחריה על הנקודה הירוקה.
          נסה ללחוץ על הנקודות מהר ככל הניתן.
        </Text>
        
        <DotsContainer>
          <Dot color="#e74c3c" />
          <Dot color="#2ecc71" />
        </DotsContainer>
        
        <Text>
          בסיום התרגיל יוצג ממוצע זמני התגובה עבור המרחב הימני והשמאלי של המסך.
        </Text>
      </ContentBox>

      <StartButton onClick={onStart}>התחל תרגול</StartButton>
    </Container>
  );
};

export default WelcomeScreen; 