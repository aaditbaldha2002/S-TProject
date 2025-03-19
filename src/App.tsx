import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ProductListing from './component/ProductListing';
import { theme } from './theme/theme';
import initState from './state/state';
import stateReducer from './reducers/stateReducer';
import Tab from './component/Tab';

export type Product = {
  id: string;
  name: string;
  group: 'Laptop' | 'Tablet' | 'Mobile' | 'Accessory';
  msrp: number;
  price: number;
  status: string;
};

type TabName = 'Product List' | 'Cart';
const App: React.FC = () => {
  const [productList, setProductList] = React.useState<{
    [key: string]: Product[];
  }>({});
  const [state, dispatch] = React.useReducer(stateReducer, initState);
  const [currentTab, setCurrentTab] = React.useState<TabName>('Product List');

  React.useEffect(() => {
    fetch(
      'https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json',
    )
      .then((response) => response.json())
      .then((json: { [key: string]: Product }) => {
        console.log(json);
        let temp: { [key: string]: Product[] } = {};
        Object.values(json).forEach((item) => {
          if (!temp[item.group]) {
            temp[item.group] = [];
          }
          temp[item.group].push(item);
        });
        setProductList(temp);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <TabListWrapper>
          <TabList>
            <Tab
              name="Product List"
              onClick={() => setCurrentTab('Product List')}
            />
            <Tab name="Cart" onClick={() => setCurrentTab('Cart')} />
          </TabList>
          <TotalPrice>
            Total Price: {Math.max(0.0, Number(state.totalPrice.toFixed(2)))}
          </TotalPrice>
          <TotalItems>Total Items: {Math.max(0, state.totalItems)}</TotalItems>
        </TabListWrapper>
        <Divider />
        {currentTab === 'Product List' && (
          <TabWrapper>
            <TabTitle>{currentTab}</TabTitle>
            <GridWrapper>
              {Object.values(productList).map((list) => {
                return (
                  <>
                    {list.map((item, key) => (
                      <ProductListing
                        key={item.id}
                        item={item}
                        type="Search"
                        dispatch={dispatch}
                      />
                    ))}
                  </>
                );
              })}
            </GridWrapper>
          </TabWrapper>
        )}
        {currentTab === 'Cart' && (
          <TabWrapper>
            <TabTitle>{currentTab}</TabTitle>
            <CartList>
              {Object.entries(state.products).map(([key, value]) => (
                <CartItemWrapper key={key}>
                  <ProductListing
                    item={value}
                    type="Cart"
                    dispatch={dispatch}
                  />
                </CartItemWrapper>
              ))}
            </CartList>
          </TabWrapper>
        )}
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
  gap: 1em;
`;

const TabListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 25%;
  align-items: flex-start;
  position: relative;
`;

const TabList = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const TotalPrice = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.5em;
  color: ${(props) => props.theme.black};
`;

const TotalItems = styled.div`
  display: flex;
  width: 100%;
  font-size: 1.5em;
  color: ${(props) => props.theme.black};
`;

const Divider = styled.div`
  display: flex;
  align-self: stretch;
  width: 2px;
  border-right: 1px solid ${(props) => props.theme.black};
`;

const TabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  align-self: stretch;
`;

const GridWrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  width: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  box-sizing: border-box;
`;

const TabTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 1em;
  box-sizing: border-box;
  padding: 1em;
  background: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};
`;

const CartList = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto;
  flex-direction: column;
  gap: 1em;
  height: 100vh;
  overflow-y: auto;
`;

const CartItemWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
`;

export default App;
