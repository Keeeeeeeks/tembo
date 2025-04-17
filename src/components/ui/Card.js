import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.large};
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.heading};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.md};
`;

const CardFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = ({ 
  title, 
  description, 
  image, 
  children, 
  footerContent,
  ...props 
}) => {
  return (
    <CardContainer {...props}>
      {image && <CardImage src={image} />}
      <CardContent>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        {children}
      </CardContent>
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </CardContainer>
  );
};

export default Card;