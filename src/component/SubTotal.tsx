import React from 'react';
import styled from 'styled-components';

interface SubTotalProps {
  totalPrice: number;
  totalItems: number;
}

const SubTotal: React.FC<SubTotalProps> = (props) => {
  return (
    <Wrapper>
      <TotalPrice>Total Price: {props.totalPrice.toFixed(2)}</TotalPrice>
      <TotalItems>Total Items: {props.totalItems}</TotalItems>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  background: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};
  font-size: 2em;
`;

const TotalPrice = styled.div`
  width: 100%;
`;

const TotalItems = styled.div`
  width: 100%;
`;

export default SubTotal;
