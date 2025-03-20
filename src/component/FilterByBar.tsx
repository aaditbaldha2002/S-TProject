import React from 'react';
import Tab from './Tab';
import styled from 'styled-components';

interface FilterByBarProps {
  activeTab: string;
  onClick: (tabName: string) => void;
}

const FilterByBar: React.FC<FilterByBarProps> = (props) => {
  const tabNames: string[] = [
    'All Products',
    'Accessory',
    'Laptop',
    'Mobile',
    'Tablet',
  ];
  return (
    <TabListWrapper>
      <TabList>
        {props.activeTab === 'Cart' ? (
          <>
            <Divider />
            <Tab
              name={'Go Back'}
              onClick={() => props.onClick('All Products')}
              isActive={false}
            />
            <Divider />
          </>
        ) : (
          <>
            <Title>Filter By:</Title>
            <Divider />
            {tabNames.map((value, index) => {
              return (
                <>
                  <Tab
                    key={index}
                    name={value}
                    onClick={() => props.onClick(value)}
                    isActive={value === props.activeTab}
                  />
                  {index < tabNames.length && <Divider />}
                </>
              );
            })}
          </>
        )}
      </TabList>
    </TabListWrapper>
  );
};
const TabListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  background: ${(props) => props.theme.dark_gray};
`;
const TabList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-x: auto;
  font-size: 1.2em;
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  white-space: nowrap;
  vertical-align: middle;
  color: ${(props) => props.theme.white};
`;
const Title = styled.div`
  display: flex;
  padding: 1em;
`;
const Divider = styled.div`
  width: 1px;
  border-right: 1px solid ${(props) => props.theme.white};
  align-self: stretch;
`;
export default FilterByBar;
