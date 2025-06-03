import React from 'react';
import styled from 'styled-components';
import logo1 from '../assets/logo1.png';
import logo2 from '../assets/logo2.png';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
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
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Instructions = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 1rem;
`;

const Text = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #34495e;
  margin: 1rem 0;
`;

const DotExample = styled.div`
  display: flex;
  gap: 20px;
  margin: 1.5rem 0;
  justify-content: center;
`;

const Dot = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${props => props.color};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  font-family: 'Rubik', sans-serif;
  font-size: 1.2rem;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  max-width: 800px;
`;

const Logo = styled.img`
  height: 80px;
  object-fit: contain;
`;

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <WelcomeContainer>
      <LogoContainer>
        <Logo src={logo1} alt="Logo 1" />
        <Logo src={logo2} alt="Logo 2" />
      </LogoContainer>
      
      <Title>ברוכים הבאים לתרגול סריקה מרחבית</Title>
      
      <Instructions>
        <Text>
          לחץ על הנקודה האדומה ולאחריה על הנקודה הירוקה.
          נסה ללחוץ על הנקודות מהר ככל הניתן.
        </Text>
        
        <DotExample>
          <Dot color="#e74c3c" />
          <Dot color="#2ecc71" />
        </DotExample>
        
        <Text>
          בסיום התרגיל יוצג ממוצע זמני התגובה עבור המרחב הימני והשמאלי של המסך.
        </Text>
      </Instructions>

      <Button onClick={onStart}>התחל תרגול</Button>
    </WelcomeContainer>
  );
};

export default WelcomeScreen; 