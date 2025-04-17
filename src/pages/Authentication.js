import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const AuthCard = styled(Card)`
  width: 100%;
  max-width: 450px;
  box-shadow: ${({ theme }) => theme.boxShadow.large};
  
  &:hover {
    transform: none;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tab = styled.button`
  flex: 1;
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing.md};
  font-size: 1rem;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.textLight};
  border-bottom: 2px solid ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(48, 96, 255, 0.2);
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  margin: ${({ theme }) => theme.spacing.xs} 0 0;
`;

const AuthOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ForgetPasswordLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SocialAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const SocialButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

const SocialIcon = styled.span`
  font-size: 1.25rem;
`;

const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if the URL has a signup parameter
  const isSignupParam = new URLSearchParams(location.search).get('signup') === 'true';
  
  const [isSignup, setIsSignup] = useState(isSignupParam);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (isSignup && !name) {
      setError('Please provide your name');
      return;
    }
    
    // Mock authentication
    // In a real app, this would call an authentication API
    
    // Redirect based on the URL parameter or a default route
    const redirectURL = new URLSearchParams(location.search).get('redirect') || '/artist-dashboard';
    navigate(redirectURL);
  };
  
  return (
    <Container>
      <AuthContainer>
        <AuthCard>
          <TabsContainer>
            <Tab 
              active={!isSignup} 
              onClick={() => setIsSignup(false)}
            >
              Login
            </Tab>
            <Tab 
              active={isSignup} 
              onClick={() => setIsSignup(true)}
            >
              Sign Up
            </Tab>
          </TabsContainer>
          
          <Form onSubmit={handleSubmit}>
            {isSignup && (
              <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input 
                  type="text" 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your full name"
                />
              </FormGroup>
            )}
            
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Your email address"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Your password"
              />
            </FormGroup>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <Button type="submit" variant="primary">
              {isSignup ? 'Create Account' : 'Login'}
            </Button>
            
            {!isSignup && (
              <AuthOptions>
                <ForgetPasswordLink href="#">Forgot password?</ForgetPasswordLink>
              </AuthOptions>
            )}
            
            <SocialAuthContainer>
              <SocialButton variant="outlined">
                <SocialIcon>🌎</SocialIcon>
                Continue with World ID
              </SocialButton>
              <SocialButton variant="outlined">
                <SocialIcon>👻</SocialIcon>
                Continue with Phantom
              </SocialButton>
              <SocialButton variant="outlined">
                <SocialIcon>🦊</SocialIcon>
                Continue with MetaMask
              </SocialButton>
            </SocialAuthContainer>
          </Form>
        </AuthCard>
      </AuthContainer>
    </Container>
  );
};

export default Authentication;