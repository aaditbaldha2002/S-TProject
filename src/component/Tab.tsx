import React from 'react';
import styled from 'styled-components';

interface TabProps {
  name: string;
  onClick: () => void;
  isActive: boolean;
}

const Tab: React.FC<TabProps> = (props) => {
  const { name, onClick } = props;

  return (
    <Wrapper onClick={onClick} type="button" isActive={props.isActive}>
      {name}
    </Wrapper>
  );
};

const Wrapper = styled.button<{ isActive: boolean }>`
  all: unset;
  background: ${(props) =>
    props.isActive ? props.theme.selected_blue_gray : props.theme.dark_gray};
  padding: 1em;
  color: ${(props) => props.theme.white};
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.light_blue};
    color: ${(props) => props.theme.black};
  }
  white-space: nowrap;
`;

export default Tab;
