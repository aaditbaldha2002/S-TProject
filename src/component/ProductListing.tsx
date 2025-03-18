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
  const [quantity, setQuantity] = React.useState(1);
  const handlePurchase = React.useCallback(() => {}, []);

  return (
    <Wrapper>
      <NameTitle>Name:</NameTitle>
      <Name>{name}</Name>
      <GroupTitle>Group:</GroupTitle>
      <Group>{group}</Group>
      <MarketPriceTitle>Market Price:</MarketPriceTitle>
      <MSRP>{msrp}</MSRP>
      <PriceTitle>Sales Price:</PriceTitle>
      <Price>{price}</Price>
      {status === 'Available' && (
        <>
          <QuantityTitle>Quantity:</QuantityTitle>
          <Quantity type="number" min={1} defaultValue={1} />
        </>
      )}
      <PurchaseBtn
        disabled={status === 'Unavailable'}
        onClick={handlePurchase}
        type="button"
      >
        {status === 'Unavailable' ? 'Sold Out' : 'Purchase'}
      </PurchaseBtn>
    </Wrapper>
  );
};

export default ProductListing;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.black};
  color: ${(props) => props.theme.black};
  padding: 1em;
  box-sizing: border-box;
  width: 25%;
  gap: 0.5em;
`;

const NameTitle = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 1;
`;
const TextCell = styled.div`
  text-align: center;
  font-size: 1em;
`;

const Name = styled(TextCell)`
  grid-column: 2;
  grid-row: 1;
`;

const Group = styled(TextCell)`
  grid-column: 2;
  grid-row: 2;
`;

const MSRP = styled(TextCell)`
  grid-column: 2;
  grid-row: 3;
`;

const Price = styled(TextCell)`
  grid-column: 2;
  grid-row: 4;
`;

const GroupTitle = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 2;
`;

const MarketPriceTitle = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 3;
`;

const PriceTitle = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 4;
`;

const QuantityTitle = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row: 5;
  width: 100%;
`;

const PurchaseBtn = styled.button`
  all: unset;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row: 6;
  text-align: center;
  background: ${(props) => props.theme.black};
  border-radius: 5px;
  color: ${(props) => props.theme.white};
  padding: 1em 2em;
  &:hover {
    cursor: pointer;
  }

  &:disabled {
    background: ${(props) => props.theme.gray};
    cursor: not-allowed;
  }
`;

const Quantity = styled.input`
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  font-size: 1em;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row: 5;
`;
