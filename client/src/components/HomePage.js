import React from 'react';
import styled from 'styled-components';
import StartupList from './lists/StartupList';
import InvestorList from './lists/InvestorList';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const HomePage = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <StartupList />
      <InvestorList />
    </Container>
  );
};

export default HomePage;


