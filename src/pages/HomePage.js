import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: white;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const UserJourneyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const UserJourneyCard = styled(Card)`
  text-align: center;
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const UserJourneyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
`;

const HomePage = () => {
  // Mock feature data
  const features = [
    {
      title: 'Authentication',
      description: 'Verify artwork authenticity through steganographic watermarking and cryptographic techniques.',
      icon: '🔐'
    },
    {
      title: 'Provenance Tracking',
      description: 'Maintain immutable record of artwork creation and ownership history.',
      icon: '📜'
    },
    {
      title: 'Blockchain Integration',
      description: 'Support for multiple blockchains including Solana, Base, and Ethereum.',
      icon: '⛓️'
    },
    {
      title: 'Content Protection',
      description: 'Implement robust copyright verification and content moderation.',
      icon: '🛡️'
    },
    {
      title: 'Sustainable Monetization',
      description: 'Enable tiered access models and ongoing revenue streams for artists.',
      icon: '💰'
    },
    {
      title: 'Enterprise Solutions',
      description: 'Document authentication and digital content protection for businesses.',
      icon: '🏢'
    }
  ];

  return (
    <>
      <HeroSection>
        <Container>
          <HeroTitle>Tembo Protocol</HeroTitle>
          <HeroSubtitle>
            A comprehensive digital art authentication and provenance system, leveraging 
            cryptographic techniques, verifiable computation, and blockchain technology.
          </HeroSubtitle>
          <HeroButtons>
            <Button as={Link} to="/artist-dashboard" variant="primary">
              For Artists
            </Button>
            <Button as={Link} to="/collector-dashboard" variant="secondary">
              For Collectors
            </Button>
            <Button as={Link} to="/enterprise-dashboard" variant="outlined">
              For Enterprises
            </Button>
          </HeroButtons>
        </Container>
      </HeroSection>

      <Section>
        <Container>
          <SectionTitle>Key Features</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <Card key={index} title={feature.title} description={feature.description}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{feature.icon}</div>
              </Card>
            ))}
          </FeaturesGrid>
        </Container>
      </Section>

      <Section style={{ background: '#f5f7fc' }}>
        <Container>
          <SectionTitle>User Journeys</SectionTitle>
          <UserJourneyContainer>
            <UserJourneyCard>
              <UserJourneyIcon>🎨</UserJourneyIcon>
              <h3>For Artists</h3>
              <p>Easily establish provenance for your artwork and set up sustainable monetization models without technical complexity.</p>
              <Button as={Link} to="/artist-dashboard" variant="primary">
                Artist Dashboard
              </Button>
            </UserJourneyCard>
            
            <UserJourneyCard>
              <UserJourneyIcon>🧐</UserJourneyIcon>
              <h3>For Collectors</h3>
              <p>Discover authenticated digital artwork with verifiable provenance and demonstrate authentic ownership.</p>
              <Button as={Link} to="/collector-dashboard" variant="primary">
                Collector Dashboard
              </Button>
            </UserJourneyCard>
            
            <UserJourneyCard>
              <UserJourneyIcon>🏢</UserJourneyIcon>
              <h3>For Enterprises</h3>
              <p>Implement traceable authentication for sensitive documents and protect valuable digital content.</p>
              <Button as={Link} to="/enterprise-dashboard" variant="primary">
                Enterprise Dashboard
              </Button>
            </UserJourneyCard>
          </UserJourneyContainer>
        </Container>
      </Section>
    </>
  );
};

export default HomePage;