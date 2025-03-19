import React, { Dispatch } from 'react';
import styled from 'styled-components';
import { Product } from '../App';
import { ActionType } from '../reducers/stateReducer';

export type CartItem = Product & {
  quantity: number;
};

interface ProductListingProps {
  item: Product | CartItem;
  type: 'Search' | 'Cart';
  dispatch: Dispatch<ActionType>;
}

const ProductListing: React.FC<ProductListingProps> = (props) => {
  const { name, group, msrp, price, status } = props.item;
  const dispatch = props.dispatch;
  const [quantity, setQuantity] = React.useState(1);
  const handlePurchase = React.useCallback(
    (item: Product) => {
      dispatch({
        type: 'ADD_PRODUCT',
        payload: { ...item, quantity: quantity },
      });
    },
    [quantity],
  );
  const handleUpdate = React.useCallback((item: CartItem) => {
    if (item.quantity <= 0) {
      dispatch({ type: 'DELETE_PRODUCT', payload: { ...item, quantity: 1 } });
    } else {
      dispatch({ type: 'UPDATE_PRODUCT', payload: item });
    }
  }, []);
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
          <Quantity
            type="number"
            min={props.type === 'Search' ? 1 : 0}
            defaultValue={
              props.type === 'Search' ? 1 : (props.item as CartItem).quantity
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (props.type !== 'Search') {
                handleUpdate({
                  ...props.item,
                  quantity: Number(event.target.value),
                });
              } else {
                console.log('Adding quantity:', Number(event.target.value));
                setQuantity(Number(event.target.value));
              }
            }}
          />
        </>
      )}
      {props.type === 'Search' && (
        <PurchaseBtn
          disabled={status === 'Unavailable'}
          onClick={() => handlePurchase(props.item as Product)}
          type="button"
        >
          {status === 'Unavailable' ? 'Sold Out' : 'Purchase'}
        </PurchaseBtn>
      )}
    </Wrapper>
  );
};

export default ProductListing;

const Wrapper = styled.div`
  height: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.black};
  color: ${(props) => props.theme.black};
  padding: 1em;
  box-sizing: border-box;
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
