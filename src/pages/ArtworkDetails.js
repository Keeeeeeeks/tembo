import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const ArtworkContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
`;

const ArtworkDetailsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ArtworkImageContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.boxShadow.medium};
  position: relative;
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const AuthenticationBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.success};
  color: white;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-weight: bold;
`;

const ArtworkInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ArtworkTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ArtistInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ArtistName = styled.div`
  font-weight: 500;
`;

const ArtworkDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const MetadataSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MetadataTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MetadataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetadataLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MetadataValue = styled.div`
  font-weight: 500;
`;

const PriceContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tag = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.875rem;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProvenanceContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ProvenanceTimeline = styled.div`
  margin-left: ${({ theme }) => theme.spacing.lg};
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  padding-left: ${({ theme }) => theme.spacing.lg};
`;

const ProvenanceEvent = styled.div`
  position: relative;
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -${({ theme }) => theme.spacing.lg};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateX(-50%);
  }
`;

const ProvenanceDate = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProvenanceAction = styled.div`
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProvenanceDetails = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

// Mock artwork data
const mockArtwork = {
  id: 1,
  title: 'Digital Dreamscape',
  artist: 'Alex Rivera',
  artistId: 'alex123',
  image: 'https://picsum.photos/seed/art1/800/600',
  description: 'A mesmerizing digital landscape that explores the intersection of nature and technology. This piece is part of my "Digital Horizons" collection, which examines how our perception of natural environments is increasingly mediated through digital interfaces.',
  price: 0.5,
  currency: 'ETH',
  blockchain: 'ethereum',
  creationDate: '2023-10-05',
  authenticated: true,
  authenticationDate: '2023-10-07',
  edition: '1 of 1',
  dimensions: '4000 x 3000 px',
  medium: 'Digital Artwork',
  tags: ['landscape', 'digital', 'nature', 'technology'],
  storageLocation: 'Bundlr/Arweave',
  watermarkStrength: 'Standard',
  royaltyPercentage: 10,
  provenance: [
    {
      date: '2023-10-05',
      action: 'Created',
      details: 'Artwork created by Alex Rivera'
    },
    {
      date: '2023-10-07',
      action: 'Authenticated',
      details: 'Watermarked and authenticated on Tembo Protocol'
    },
    {
      date: '2023-10-07',
      action: 'Minted',
      details: 'Minted on Ethereum blockchain'
    }
  ]
};

const ArtworkDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('provenance');
  
  // In a real app, this would fetch the artwork data from an API
  const artwork = mockArtwork;
  
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
      <ArtworkContainer>
        <Breadcrumbs>
          <Link to="/">Home</Link>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <Link to="/artist-dashboard">Artworks</Link>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <span>{artwork.title}</span>
        </Breadcrumbs>
        
        <ArtworkDetailsLayout>
          <ArtworkImageContainer>
            <ArtworkImage src={artwork.image} alt={artwork.title} />
            {artwork.authenticated && (
              <AuthenticationBadge>
                <span>✓</span> Authenticated
              </AuthenticationBadge>
            )}
          </ArtworkImageContainer>
          
          <ArtworkInfo>
            <ArtworkTitle>{artwork.title}</ArtworkTitle>
            <ArtistInfo>
              <ArtistName>By {artwork.artist}</ArtistName>
            </ArtistInfo>
            
            <ArtworkDescription>
              {artwork.description}
            </ArtworkDescription>
            
            <TagsContainer>
              {artwork.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </TagsContainer>
            
            <PriceContainer>
              <Price>
                {getBlockchainIcon(artwork.blockchain)} {artwork.price} {artwork.currency}
              </Price>
            </PriceContainer>
            
            <ButtonContainer>
              <Button variant="primary">
                Purchase Artwork
              </Button>
              <Button variant="outlined">
                Make Offer
              </Button>
              <Button variant="outlined">
                Share
              </Button>
            </ButtonContainer>
            
            <MetadataSection>
              <MetadataTitle>Details</MetadataTitle>
              <MetadataGrid>
                <MetadataItem>
                  <MetadataLabel>Edition</MetadataLabel>
                  <MetadataValue>{artwork.edition}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Dimensions</MetadataLabel>
                  <MetadataValue>{artwork.dimensions}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Medium</MetadataLabel>
                  <MetadataValue>{artwork.medium}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Creation Date</MetadataLabel>
                  <MetadataValue>{artwork.creationDate}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Blockchain</MetadataLabel>
                  <MetadataValue>{artwork.blockchain}</MetadataValue>
                </MetadataItem>
                <MetadataItem>
                  <MetadataLabel>Royalty</MetadataLabel>
                  <MetadataValue>{artwork.royaltyPercentage}%</MetadataValue>
                </MetadataItem>
              </MetadataGrid>
            </MetadataSection>
          </ArtworkInfo>
        </ArtworkDetailsLayout>
        
        <TabsContainer>
          <Tab 
            active={activeTab === 'provenance'} 
            onClick={() => setActiveTab('provenance')}
          >
            Provenance
          </Tab>
          <Tab 
            active={activeTab === 'authentication'} 
            onClick={() => setActiveTab('authentication')}
          >
            Authentication Details
          </Tab>
          <Tab 
            active={activeTab === 'history'} 
            onClick={() => setActiveTab('history')}
          >
            Price History
          </Tab>
        </TabsContainer>
        
        {activeTab === 'provenance' && (
          <ProvenanceContainer>
            <ProvenanceTimeline>
              {artwork.provenance.map((event, index) => (
                <ProvenanceEvent key={index}>
                  <ProvenanceDate>{event.date}</ProvenanceDate>
                  <ProvenanceAction>{event.action}</ProvenanceAction>
                  <ProvenanceDetails>{event.details}</ProvenanceDetails>
                </ProvenanceEvent>
              ))}
            </ProvenanceTimeline>
          </ProvenanceContainer>
        )}
        
        {activeTab === 'authentication' && (
          <Card>
            <h3>Authentication Information</h3>
            <p>This artwork has been authenticated using Tembo Protocol's steganographic watermarking technology.</p>
            <MetadataGrid>
              <MetadataItem>
                <MetadataLabel>Authentication Date</MetadataLabel>
                <MetadataValue>{artwork.authenticationDate}</MetadataValue>
              </MetadataItem>
              <MetadataItem>
                <MetadataLabel>Watermark Strength</MetadataLabel>
                <MetadataValue>{artwork.watermarkStrength}</MetadataValue>
              </MetadataItem>
              <MetadataItem>
                <MetadataLabel>Storage Location</MetadataLabel>
                <MetadataValue>{artwork.storageLocation}</MetadataValue>
              </MetadataItem>
              <MetadataItem>
                <MetadataLabel>Verification Method</MetadataLabel>
                <MetadataValue>RiscZero Verifiable Computation</MetadataValue>
              </MetadataItem>
            </MetadataGrid>
          </Card>
        )}
        
        {activeTab === 'history' && (
          <Card>
            <h3>Price History</h3>
            <p>This artwork has not been sold previously.</p>
          </Card>
        )}
      </ArtworkContainer>
    </Container>
  );
};

export default ArtworkDetails;