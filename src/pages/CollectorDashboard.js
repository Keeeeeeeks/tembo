import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const DashboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const DashboardTitle = styled.h1`
  margin: 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.textLight};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ArtworkGrid = styled.div`
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

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const MarketplaceCard = styled(Card)`
  position: relative;
  
  .artwork-label {
    position: absolute;
    bottom: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const ProofBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.75rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const PriceTag = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: bold;
`;

const BlockchainIcon = styled.span`
  font-size: 1.25rem;
`;

// Mock featured artwork data
const featuredArtworks = [
  {
    id: 1,
    title: 'Digital Dreamscape',
    artist: 'Alex Rivera',
    image: 'https://picsum.photos/seed/art1/400/300',
    price: 0.5,
    blockchain: 'ethereum',
    verified: true
  },
  {
    id: 2,
    title: 'Future Horizons',
    artist: 'Maria Chen',
    image: 'https://picsum.photos/seed/art2/400/300',
    price: 0.75,
    blockchain: 'solana',
    verified: true
  },
  {
    id: 3,
    title: 'Abstract Reality',
    artist: 'Jordan Smith',
    image: 'https://picsum.photos/seed/art3/400/300',
    price: 0.3,
    blockchain: 'base',
    verified: true
  }
];

// Mock collection data
const collectionArtworks = [
  {
    id: 4,
    title: 'Geometric Harmony',
    artist: 'David Lee',
    image: 'https://picsum.photos/seed/art4/400/300',
    acquiredDate: '2023-10-15',
    blockchain: 'solana',
    verified: true
  },
  {
    id: 5,
    title: 'Digital Renaissance',
    artist: 'Emma Johnson',
    image: 'https://picsum.photos/seed/art5/400/300',
    acquiredDate: '2023-09-28',
    blockchain: 'base',
    verified: true
  }
];

const CollectorDashboard = () => {
  // In a real app, these would be fetched from an API and managed with state
  const activeTab = 'collection';
  const stats = {
    collected: 5,
    value: 2.35,
    authenticated: 5
  };
  
  const getBlockchainIcon = (blockchain) => {
    switch (blockchain) {
      case 'ethereum':
        return '⟠';
      case 'solana':
        return '◎';
      case 'base':
        return '🔵';
      default:
        return '💰';
    }
  };
  
  return (
    <Container>
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Collector Dashboard</DashboardTitle>
          <Button variant="primary" as={Link} to="/">
            Browse Marketplace
          </Button>
        </DashboardHeader>
        
        <StatsGrid>
          <StatCard>
            <StatValue color="primary">{stats.collected}</StatValue>
            <StatLabel>Artworks Collected</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="secondary">${stats.value} ETH</StatValue>
            <StatLabel>Collection Value</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="success">{stats.authenticated}</StatValue>
            <StatLabel>Authenticated Works</StatLabel>
          </StatCard>
        </StatsGrid>
        
        <TabsContainer>
          <Tab active={activeTab === 'collection'}>
            My Collection
          </Tab>
          <Tab active={activeTab === 'marketplace'}>
            Marketplace
          </Tab>
          <Tab active={activeTab === 'activity'}>
            Activity
          </Tab>
          <Tab active={activeTab === 'favorites'}>
            Favorites
          </Tab>
        </TabsContainer>
        
        <h2>Your Collection</h2>
        <ArtworkGrid>
          {collectionArtworks.map((artwork) => (
            <Card 
              key={artwork.id}
              image={artwork.image}
              title={artwork.title}
              description={`Artist: ${artwork.artist}`}
              footerContent={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button as={Link} to={`/artwork/${artwork.id}`} variant="text">
                    View Details
                  </Button>
                  <div>Acquired: {artwork.acquiredDate}</div>
                </div>
              }
            >
              {artwork.verified && (
                <ProofBadge>
                  <span>✓</span> Authenticated
                </ProofBadge>
              )}
            </Card>
          ))}
        </ArtworkGrid>
        
        <h2 style={{ marginTop: '48px' }}>Featured Artworks</h2>
        <ArtworkGrid>
          {featuredArtworks.map((artwork) => (
            <MarketplaceCard 
              key={artwork.id}
              image={artwork.image}
              title={artwork.title}
              description={`Artist: ${artwork.artist}`}
              footerContent={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Button as={Link} to={`/artwork/${artwork.id}`} variant="primary">
                    Collect
                  </Button>
                  <PriceTag>
                    <BlockchainIcon>{getBlockchainIcon(artwork.blockchain)}</BlockchainIcon>
                    {artwork.price}
                  </PriceTag>
                </div>
              }
            >
              {artwork.verified && (
                <ProofBadge>
                  <span>✓</span> Authenticated
                </ProofBadge>
              )}
            </MarketplaceCard>
          ))}
        </ArtworkGrid>
      </DashboardContainer>
    </Container>
  );
};

export default CollectorDashboard;