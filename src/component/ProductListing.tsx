import React from 'react';
import styled from 'styled-components';

interface ProductListingProps {
  id: string;
  name: string;
  group: 'Laptop' | 'Tablet' | 'Mobile' | 'Accessory';
  msrp: number;
  price: number;
  status: string;
}

const ProductListing: React.FC<ProductListingProps> = (props) => {
  const { name, group, msrp, price, status } = props;

  const handlePurchase = React.useCallback(() => {}, []);

  return (
    <Wrapper>
      <Name>{name}</Name>
      <Group>{group}</Group>
      <MSRP>{msrp.toFixed(2)}</MSRP>
      <Price>{price.toFixed(2)}</Price>
      <PurchaseBtn disabled={status === 'Unavailable'} onClick={handlePurchase}>
        {status === 'Unavailable' ? 'Sold Out' : 'Purchase'}
      </PurchaseBtn>
    </Wrapper>
  );
};

export default ProductListing;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.black};
  color: ${(props) => props.theme.black};
  padding: 1em;
  box-sizing: border-box;
`;

const CategoryContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
`;

const Name = styled.div`
  text-align: center;
  font-size: 1em;
`;

const Group = styled.div`
  text-align: center;
  font-size: 1em;
`;

const MSRP = styled.div`
  text-align: center;
  font-size: 1em;
`;

const Price = styled.div`
  text-align: center;
  font-size: 1em;
`;

const PurchaseBtn = styled.button`
  all: unset;
  background: ${(props) => props.theme.black};
  border-radius: 5px;
  color: ${(props) => props.theme.white};
  padding: 1em 2em;
  &:hover {
    cursor: pointer;
  }
`;
