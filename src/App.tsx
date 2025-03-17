import React from 'react';
import styled from 'styled-components';

const App: React.FC = () => {
  return <Wrapper>Hello World</Wrapper>;
};

const Wrapper = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding: 1em 0em;
`;

export default App;
