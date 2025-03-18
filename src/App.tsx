import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ProductListing from './component/ProductListing';
import { theme } from './theme/theme';
import initState, { InitState } from './state/state';
import stateReducer from './reducers/stateReducer';

export type Product = {
  id: string;
  name: string;
  group: 'Laptop' | 'Tablet' | 'Mobile' | 'Accessory';
  msrp: number;
  price: number;
  status: string;
  quantity: number;
};

const App: React.FC = () => {
  const [productList, setProductList] = React.useState<{
    [key: string]: Product;
  }>({});
  const [state, dispatch] = React.useReducer(stateReducer, initState);

  React.useEffect(() => {
    fetch(
      'https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json',
    )
      .then((response) => response.json())
      .then((json) => setProductList(json));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <ProductListWrapper>
          {Object.values(productList).map((item) => {
            return (
              <ProductListing
                id={item.id}
                name={item.name}
                group={item.group}
                msrp={item.msrp}
                price={item.price}
                status={item.status}
              />
            );
          })}
        </ProductListWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em;
  background: ${(props) => props.theme.light_blue};
  overflow-x: hidden;
`;

const ProductListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
`;

export default App;
