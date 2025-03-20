import React from 'react';
import styled from 'styled-components';

interface TabTitleProps {
  text: string;
}

const TabTitle: React.FC<TabTitleProps> = (props) => {
  const text = props.text;
  const hasCart = text.toLowerCase().includes('cart');

  return <Wrapper>{hasCart ? 'Your Cart' : props.text}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  text-align: start;
  font-size: 2em;
  margin: 0.5em 0em;
`;

export default TabTitle;
