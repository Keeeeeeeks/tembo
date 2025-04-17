import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  color: white;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  padding: 0 ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: white;
`;

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  color: #ccc;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  color: #ccc;
  border-top: 1px solid #444;
  margin-top: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.md};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <FooterTitle>Tembo Protocol</FooterTitle>
          <FooterText>
            Establishing a comprehensive digital art authentication and provenance system.
          </FooterText>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>For Artists</FooterTitle>
          <FooterLink to="/artist-dashboard">Dashboard</FooterLink>
          <FooterLink to="/upload">Upload Artwork</FooterLink>
          <FooterLink to="/">Monetization Guide</FooterLink>
          <FooterLink to="/">Artist Resources</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>For Collectors</FooterTitle>
          <FooterLink to="/collector-dashboard">Dashboard</FooterLink>
          <FooterLink to="/">Marketplace</FooterLink>
          <FooterLink to="/">Provenance Verification</FooterLink>
          <FooterLink to="/">Collector Guide</FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterTitle>For Enterprises</FooterTitle>
          <FooterLink to="/enterprise-dashboard">Dashboard</FooterLink>
          <FooterLink to="/">Document Authentication</FooterLink>
          <FooterLink to="/">Content Protection</FooterLink>
          <FooterLink to="/">Enterprise Solutions</FooterLink>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Tembo Protocol. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;