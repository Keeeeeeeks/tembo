import React, { useState } from 'react';
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

const DashboardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    width: 100%;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
  -webkit-overflow-scrolling: touch;
  
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

const ArtworkCard = styled(Card)`
  position: relative;
`;

const ArtworkStatus = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'authenticated':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  }};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.75rem;
  font-weight: bold;
`;

const ArtworkDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const ArtworkMetrics = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.875rem;
`;

const MetricItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const NoArtwork = () => (
  <EmptyState>
    <h3>No Artwork Yet</h3>
    <p>Upload your first artwork to get started with the Tembo Protocol!</p>
    <Button as={Link} to="/upload" variant="primary">
      Upload Artwork
    </Button>
  </EmptyState>
);

// Mock artwork data
const mockArtworks = [
  {
    id: 1,
    title: 'Digital Dreamscape',
    image: 'https://picsum.photos/seed/art1/400/300',
    status: 'authenticated',
    views: 245,
    sales: 3
  },
  {
    id: 2,
    title: 'Future Horizons',
    image: 'https://picsum.photos/seed/art2/400/300',
    status: 'authenticated',
    views: 120,
    sales: 1
  },
  {
    id: 3,
    title: 'Abstract Reality',
    image: 'https://picsum.photos/seed/art3/400/300',
    status: 'pending',
    views: 56,
    sales: 0
  }
];

const ArtistDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // In a real app, these would be fetched from an API
  const stats = {
    artworks: 3,
    views: 421,
    sales: 4,
    earnings: 642
  };
  
  // Filter artworks based on active tab
  const filteredArtworks = mockArtworks.filter((artwork) => {
    if (activeTab === 'all') return true;
    return artwork.status === activeTab;
  });
  
  return (
    <Container>
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Artist Dashboard</DashboardTitle>
          <DashboardActions>
            <Button as={Link} to="/upload" variant="primary">
              Upload Artwork
            </Button>
            <Button variant="outlined">
              View Analytics
            </Button>
          </DashboardActions>
        </DashboardHeader>
        
        <StatsGrid>
          <StatCard>
            <StatValue color="primary">{stats.artworks}</StatValue>
            <StatLabel>Artworks</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="secondary">{stats.views}</StatValue>
            <StatLabel>Total Views</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="success">{stats.sales}</StatValue>
            <StatLabel>Sales</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="accent">${stats.earnings}</StatValue>
            <StatLabel>Earnings</StatLabel>
          </StatCard>
        </StatsGrid>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'all'} 
            onClick={() => setActiveTab('all')}
          >
            All Artworks
          </Tab>
          <Tab 
            active={activeTab === 'authenticated'} 
            onClick={() => setActiveTab('authenticated')}
          >
            Authenticated
          </Tab>
          <Tab 
            active={activeTab === 'pending'} 
            onClick={() => setActiveTab('pending')}
          >
            Pending Authentication
          </Tab>
          <Tab 
            active={activeTab === 'draft'} 
            onClick={() => setActiveTab('draft')}
          >
            Drafts
          </Tab>
        </TabsContainer>
        
        {filteredArtworks.length > 0 ? (
          <ArtworkGrid>
            {filteredArtworks.map((artwork) => (
              <ArtworkCard 
                key={artwork.id}
                image={artwork.image}
                title={artwork.title}
                footerContent={
                  <ArtworkDetails>
                    <Button as={Link} to={`/artwork/${artwork.id}`} variant="text">
                      Manage
                    </Button>
                    <ArtworkMetrics>
                      <MetricItem>
                        <span>👁️</span> {artwork.views}
                      </MetricItem>
                      <MetricItem>
                        <span>💰</span> {artwork.sales}
                      </MetricItem>
                    </ArtworkMetrics>
                  </ArtworkDetails>
                }
              >
                <ArtworkStatus status={artwork.status}>
                  {artwork.status === 'authenticated' ? 'Authenticated' : 'Pending'}
                </ArtworkStatus>
              </ArtworkCard>
            ))}
          </ArtworkGrid>
        ) : (
          <NoArtwork />
        )}
      </DashboardContainer>
    </Container>
  );
};

export default ArtistDashboard;