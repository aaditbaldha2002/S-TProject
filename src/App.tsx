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

type TabName =
  | 'Product List'
  | 'Cart'
  | 'Accessory'
  | 'Laptop'
  | 'Tablet'
  | 'Mobile';
const App: React.FC = () => {
  const [productList, setProductList] = React.useState<{
    [key: string]: Product[];
  }>({});
  const [state, dispatch] = React.useReducer(stateReducer, initState);
  const [currentTab, setCurrentTab] = React.useState<TabName>('Product List');
  const tabNames: string[] = [
    'Product List',
    'Accessory',
    'Laptop',
    'Mobile',
    'Tablet',
    'Cart',
  ];

  const renderTabContent = React.useCallback(
    (value: string) => {
      switch (value) {
        case 'Product List':
          return (
            <GridWrapper onWheel={(e) => e.stopPropagation()}>
              {Object.values(productList).map((list) =>
                list.map((item) => (
                  <ProductListing
                    key={item.id}
                    item={item}
                    type="Search"
                    dispatch={dispatch}
                  />
                )),
              )}
            </GridWrapper>
          );

        case 'Cart':
          return Object.keys(state.products).length > 0 ? (
            <CartList onWheel={(e) => e.stopPropagation()}>
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
          ) : (
            <CartList>
              <CartItemWrapper style={{ textAlign: 'center' }}>
                No cart items added
              </CartItemWrapper>
            </CartList>
          );

        case 'Accessory':
        case 'Laptop':
        case 'Mobile':
        case 'Tablet':
          return (
            <GridWrapper onWheel={(e) => e.stopPropagation()}>
              {Object.values(productList[value]).map((item) => (
                <ProductListing
                  key={item.id}
                  item={item}
                  type="Search"
                  dispatch={dispatch}
                />
              ))}
            </GridWrapper>
          );

        default:
          return <p>No products available</p>;
      }
    },
    [productList, currentTab, state.products],
  );

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
            {tabNames.map((value, index) => {
              return (
                <Tab
                  key={index}
                  name={value}
                  onClick={() => setCurrentTab(value as TabName)}
                />
              );
            })}
          </TabList>
          <TotalPrice>
            Total Price: {Math.max(0.0, Number(state.totalPrice.toFixed(2)))}
          </TotalPrice>
          <TotalItems>Total Items: {Math.max(0, state.totalItems)}</TotalItems>
        </TabListWrapper>
        <Divider />
        {tabNames.map((value) =>
          value === currentTab ? (
            <TabWrapper key={value}>
              <TabTitle>{currentTab}</TabTitle>
              {renderTabContent(value)}
            </TabWrapper>
          ) : null,
        )}
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
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
  align-items: flex-start;
  position: relative;
`;

const TabList = styled.div`
  width: 100%;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
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
  align-self: stretch;
  position: relative;
`;

const GridWrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  width: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1em;
  box-sizing: border-box;

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1035px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
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
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;

  @media (min-width: 510px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1em;
  }
`;

const CartItemWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;

  @media (min-width: 510px) {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  @media (min-width: 610px) {
    grid-column-start: 2;
    grid-column-end: 3;
    min-width: 510px;
  }
  /* text-align: center; */
`;

export default App;
