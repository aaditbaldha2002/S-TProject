import React from 'react';
import styled from 'styled-components';

interface TabProps {
  name: string;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = (props) => {
  const { name, onClick } = props;

  return (
    <Wrapper onClick={onClick} type="button">
      {name}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  all: unset;
  background: ${(props) => props.theme.black};
  padding: 1em;
  color: ${(props) => props.theme.white};
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.dark_gray};
  }
`;

export default Tab;
