import styled from 'styled-components';

interface ProductListingProps {
  id: string;
  name: string;
  group: string;
  msrp: number;
  price: number;
  status: string;
}

const ProductListing: React.FC<ProductListingProps> = (props) => {
  const { name, group, msrp, price, status } = props;

  return (
    <Wrapper>
      <Name>{name}</Name>
      <Group>{group}</Group>
      <MSRP>{msrp.toFixed(2)}</MSRP>
      <Price>{price.toFixed(2)}</Price>
    </Wrapper>
  );
};

export default ProductListing;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled.div`
  text-align: center;
  font-size: 2em;
  padding: 1em;
`;

const Group = styled.div`
  text-align: center;
  font-size: 1.5em;
  padding: 1em;
`;

const MSRP = styled.div`
  text-align: center;
  font-size: 1.2em;
  padding: 1em;
`;

const Price = styled.div`
  text-align: center;
  font-size: 1.2em;
  padding: 1em;
`;
