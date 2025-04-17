import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  width: 100%;
  max-width: ${({ fullWidth }) => (fullWidth ? '100%' : '1200px')};
  margin: 0 auto;
  padding: ${({ noPadding, theme }) => (noPadding ? '0' : `0 ${theme.spacing.md}`)};
`;

const Container = ({ 
  children, 
  fullWidth = false,
  noPadding = false,
  ...props 
}) => {
  return (
    <StyledContainer 
      fullWidth={fullWidth} 
      noPadding={noPadding}
      {...props}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;