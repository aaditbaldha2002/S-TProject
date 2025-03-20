import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ProductListing from './component/ProductListing';
import { theme } from './theme/theme';
import initState from './state/state';
import stateReducer from './reducers/stateReducer';
import NavBar from './component/NavBar';
import FilterByBar from './component/FilterByBar';
import TabTitle from './component/TabTitle';
import SubTotal from './component/SubTotal';

export type Product = {
  id: string;
  name: string;
  group: 'Laptop' | 'Tablet' | 'Mobile' | 'Accessory';
  msrp: number;
  price: number;
  status: string;
};

type TabName =
  | 'All Products'
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
  const [currentTab, setCurrentTab] = React.useState<TabName>('All Products');
  const tabNames: string[] = [
    'All Products',
    'Accessory',
    'Laptop',
    'Mobile',
    'Tablet',
    'Cart',
  ];

  const [activeTabs, setActiveTabs] = React.useState<{
    [key: number]: TabName;
  }>({});

  const handleActiveTabs = React.useCallback(() => {}, []);
  const fetchProducts = React.useCallback(async () => {
    try {
      const response = await fetch(
        'https://s3.us-east-1.amazonaws.com/assets.spotandtango/products.json',
      );
      const json: { [key: string]: Product } = await response.json();

      console.log(json);

      const temp: { [key: string]: Product[] } = {};

      Object.values(json).forEach((item) => {
        if (!temp[item.group]) {
          temp[item.group] = [];
        }
        temp[item.group].push(item);
      });

      setProductList(temp);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  const renderTabContent = React.useCallback(
    (value: string) => {
      switch (value) {
        case 'All Products':
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
            <CartWrapper>
              <GridWrapper onWheel={(e) => e.stopPropagation()}>
                {Object.entries(state.products).map(([key, value]) => (
                  <ProductListing
                    key={key}
                    item={value}
                    type="Cart"
                    dispatch={dispatch}
                  />
                ))}
              </GridWrapper>
              <SubTotal
                totalPrice={state.totalPrice}
                totalItems={state.totalItems}
              />
            </CartWrapper>
          ) : (
            <GridWrapper>
              <NoItemsTitle>No cart items added</NoItemsTitle>
            </GridWrapper>
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
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StickyBars>
          <NavBar
            items={state.totalItems}
            onClick={() => setCurrentTab('Cart')}
          />
          <FilterByBar
            activeTab={currentTab}
            onClick={(name: string) => {
              setCurrentTab(name as TabName);
            }}
          />
        </StickyBars>
        <Results>
          <TabTitle text={`Showing Results for ${currentTab}`} />
          <Divider />
          {tabNames.map((value) =>
            value === currentTab ? (
              <TabWrapper key={value}>{renderTabContent(value)}</TabWrapper>
            ) : null,
          )}
        </Results>
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${(props) => props.theme.light_blue};
`;

const TabWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const Results = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0em 1em;
  box-sizing: border-box;
  gap: 1em;
`;

const StickyBars = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const GridWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1em;
  padding-right: 1em;
  box-sizing: border-box;
`;

const CartWrapper = styled.div`
  display: flex;
  gap: 1em;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: 615px) {
    flex-direction: column-reverse;
  }
`;

const NoItemsTitle = styled.div`
  font-size: 2em;
  text-align: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${(props) => props.theme.black};
`;
export default App;
