import React from 'react';
import styled from 'styled-components';
import ProductListing from './component/ProductListing';

type product = {
  id: string;
  name: string;
  group: string;
  msrp: number;
  price: number;
  status: string;
};

const App: React.FC = () => {
  const [productList, setProductList] = React.useState<product[]>([]);

  React.useEffect(() => {
    console.log('call the api and store it');
  });

  return (
    <Wrapper>
      <ProductListWrapper>
        {productList.map((item, index) => {
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
  );
};

const Wrapper = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding: 1em 0em;
`;

const ProductListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default App;
