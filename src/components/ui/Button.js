import React from 'react';
import styled, { css } from 'styled-components';

const ButtonStyles = css`
  font-size: 14px;
  font-weight: 500;
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled.button`
  ${ButtonStyles};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  ${ButtonStyles};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  border: none;
  
  &:hover:not(:disabled) {
    opacity: 0.8;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.boxShadow.medium};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const OutlinedButton = styled.button`
  ${ButtonStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  
  &:hover:not(:disabled) {
    background-color: rgba(48, 96, 255, 0.05);
    transform: translateY(-2px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const TextButton = styled.button`
  ${ButtonStyles};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 8px;
  
  &:hover:not(:disabled) {
    background-color: rgba(48, 96, 255, 0.05);
  }
`;

const Button = ({ variant = 'primary', children, ...props }) => {
  switch (variant) {
    case 'secondary':
      return <SecondaryButton {...props}>{children}</SecondaryButton>;
    case 'outlined':
      return <OutlinedButton {...props}>{children}</OutlinedButton>;
    case 'text':
      return <TextButton {...props}>{children}</TextButton>;
    case 'primary':
    default:
      return <PrimaryButton {...props}>{children}</PrimaryButton>;
  }
};

export default Button;