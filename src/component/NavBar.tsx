import React from 'react';
import styled from 'styled-components';

interface NavBarProps {
  items: number;
  onClick: () => void;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  return (
    <Wrapper>
      <Cart onClick={props.onClick}>
        <Title>Cart</Title>
        <Items>{props.items}</Items>
      </Cart>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  background: ${(props) => props.theme.black};
`;

const Cart = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;
  padding: 1em;
  font-size: 1.5em;
  color: ${(props) => props.theme.white};
  &:hover {
    cursor: pointer;
  }
  gap: 1em;
`;

const Title = styled.div`
  display: flex;
`;

const Items = styled.div`
  display: flex;
`;
export default NavBar;
