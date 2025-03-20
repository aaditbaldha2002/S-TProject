import React from 'react';
import styled from 'styled-components';

interface TabTitleProps {
  text: string;
}

const TabTitle: React.FC<TabTitleProps> = (props) => {
  return <Wrapper>{props.text}</Wrapper>;
};

const Wrapper = styled.div`
  width: 100%;
  text-align: start;
  font-size: 2em;
  margin: 0.5em 0em;
`;

export default TabTitle;
