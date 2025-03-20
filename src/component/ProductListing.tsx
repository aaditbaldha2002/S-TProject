import React, { Dispatch } from 'react';
import styled, { css } from 'styled-components';
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
    (item: Product, quantity: number) => {
      console.log(quantity);
      if (Number(quantity) > 0) {
        dispatch({
          type: 'ADD_PRODUCT',
          payload: { ...item, quantity: Number(quantity) },
        });
      }
    },
    [quantity],
  );
  const handleUpdate = React.useCallback(
    (item: Product, quantity: string) => {
      if (quantity === '') {
        return;
      } else if (Number(quantity) <= 0) {
        dispatch({ type: 'DELETE_PRODUCT', payload: { ...item, quantity: 1 } });
      } else {
        dispatch({
          type: 'UPDATE_PRODUCT',
          payload: { ...item, quantity: Number(quantity) },
        });
      }
    },
    [quantity],
  );
  return (
    <Wrapper type={props.type}>
      <ProductImg src="#" alt="Product Image" />
      <ProductDescription>
        <Name>{name}</Name>
        <Group>{group}</Group>
        <Price>{price}$</Price>
        <MSRP>{msrp}$</MSRP>
        {status === 'Available' && (
          <>
            <Quantity
              required
              type="number"
              min={props.type === 'Search' ? 1 : 0}
              defaultValue={
                props.type === 'Search' ? 1 : (props.item as CartItem).quantity
              }
              onWheel={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (['-', '+', 'e', 'E', '.'].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (props.type !== 'Search') {
                  handleUpdate(props.item, event.target.value);
                } else {
                  setQuantity(Number(event.target.value));
                }
              }}
            />
          </>
        )}
        {props.type === 'Search' && (
          <PurchaseBtn
            disabled={status === 'Unavailable'}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handlePurchase(props.item as Product, quantity)
            }
            type="button"
          >
            {status === 'Unavailable' ? 'Sold Out' : 'Add to Cart'}
          </PurchaseBtn>
        )}
      </ProductDescription>
    </Wrapper>
  );
};

export default ProductListing;

const Wrapper = styled.div<{ type: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.black};
  color: ${(props) => props.theme.black};
  padding: 1em;
  box-sizing: border-box;
  gap: 1em;

  ${(props) =>
    props.type === 'Search'
      ? css`
          @media (min-width: 600px) {
            flex-direction: row;
          }
        `
      : css`
          @media (min-width: 900px) {
            flex-direction: row;
          }
        `}
`;

const ProductImg = styled.img`
  width: 100%;
  max-width: 300px;
  min-width: fit-content;
  height: 300px;
  border: 1px solid ${(props) => props.theme.black};
`;

const ProductDescription = styled.div`
  width: fit-content;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1em;
`;

const TextCell = styled.div`
  font-size: 1em;
  width: fit-content;
`;

const Name = styled(TextCell)`
  font-size: 2em;
`;

const Group = styled(TextCell)`
  font-size: 1.5em;
`;

const MSRP = styled(TextCell)`
  font-size: 1.2em;
`;

const Price = styled(TextCell)`
  font-size: 1.7em;
`;

const PurchaseBtn = styled.button`
  all: unset;
  width: fit-content;
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
  width: fit-content;
  box-sizing: border-box;
  text-align: center;
  font-size: 1em;
  padding: 1em;
`;
