import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import Slider from '../components/Slider';
import Buttons from '../components/Buttons';

const ButtonsContainer = styled(Container)`
display: flex;
  justify-content: flex-end;
  padding: 100px;
`;

const Home = () => {
  return (
    <div className="home">
      <Slider />
      <ButtonsContainer>
        <Buttons />
      </ButtonsContainer>
      </div>
  );
}

export default Home;
