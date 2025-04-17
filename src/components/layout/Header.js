import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.boxShadow.small};
  padding: ${({ theme }) => theme.spacing.md};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  
  a {
    color: ${({ theme }) => theme.colors.heading};
    text-decoration: none;
  }
`;

const MenuItems = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.cardBg};
    padding: ${({ theme }) => theme.spacing.md};
    z-index: 10;
  }
`;

const MenuItem = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock authentication state - would be replaced with actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogin = () => {
    navigate('/auth');
  };
  
  const handleSignup = () => {
    navigate('/auth?signup=true');
  };
  
  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <Link to="/">Tembo Protocol</Link>
        </Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          ☰
        </MobileMenuButton>
        
        <MenuItems isOpen={isMenuOpen}>
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/artist-dashboard">For Artists</MenuItem>
          <MenuItem to="/collector-dashboard">For Collectors</MenuItem>
          <MenuItem to="/enterprise-dashboard">For Enterprises</MenuItem>
          
          {isAuthenticated ? (
            <Button onClick={() => setIsAuthenticated(false)} variant="outlined">
              Logout
            </Button>
          ) : (
            <ButtonGroup>
              <Button onClick={handleLogin} variant="outlined">
                Login
              </Button>
              <Button onClick={handleSignup} variant="primary">
                Sign Up
              </Button>
            </ButtonGroup>
          )}
        </MenuItems>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;