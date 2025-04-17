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

const SectionTitle = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SolutionCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SolutionIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
`;

const RecentActivitiesContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ActivityTable = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  overflow: hidden;
`;

const ActivityRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr auto;
    grid-row-gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const ActivityHeader = styled(ActivityRow)`
  background-color: ${({ theme }) => theme.colors.background};
  font-weight: bold;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const ActivityCell = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &:before {
      content: attr(data-label);
      font-weight: bold;
      margin-right: ${({ theme }) => theme.spacing.sm};
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 0.75rem;
  font-weight: bold;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case 'authenticated':
        return theme.colors.success;
      case 'pending':
        return theme.colors.warning;
      case 'suspicious':
        return theme.colors.error;
      default:
        return theme.colors.border;
    }
  }};
  color: white;
`;

// Mock data for enterprise solutions
const enterpriseSolutions = [
  {
    id: 1,
    title: 'Document Authentication',
    description: 'Protect sensitive documents with traceable watermarks that help identify potential leaks.',
    icon: '📄',
    url: '/document-authentication'
  },
  {
    id: 2,
    title: 'Content Protection',
    description: 'Safeguard valuable digital content with robust authentication and tracking systems.',
    icon: '🛡️',
    url: '/content-protection'
  },
  {
    id: 3,
    title: 'Deepfake Detection',
    description: 'Identify manipulated media with advanced authenticity verification techniques.',
    icon: '🔍',
    url: '/deepfake-detection'
  },
  {
    id: 4,
    title: 'Compliance Reporting',
    description: 'Maintain regulatory compliance with comprehensive verification and reporting tools.',
    icon: '📊',
    url: '/compliance-reporting'
  }
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    document: 'Q4 Financial Report.pdf',
    action: 'Authentication',
    date: '2023-11-10 09:45',
    status: 'authenticated'
  },
  {
    id: 2,
    document: 'Marketing Presentation.pptx',
    action: 'Distribution',
    date: '2023-11-09 14:30',
    status: 'authenticated'
  },
  {
    id: 3,
    document: 'Partnership Agreement.docx',
    action: 'Authentication',
    date: '2023-11-08 11:15',
    status: 'pending'
  },
  {
    id: 4,
    document: 'Product Roadmap.xlsx',
    action: 'Access Tracking',
    date: '2023-11-07 16:20',
    status: 'authenticated'
  },
  {
    id: 5,
    document: 'Internal Memo.pdf',
    action: 'Leak Detection',
    date: '2023-11-05 08:10',
    status: 'suspicious'
  }
];

const EnterpriseDashboard = () => {
  // In a real app, these would be fetched from an API
  const stats = {
    documents: 127,
    authenticated: 112,
    trackingEvents: 1458,
    suspiciousActivities: 3
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'authenticated':
        return 'Authenticated';
      case 'pending':
        return 'Pending';
      case 'suspicious':
        return 'Suspicious';
      default:
        return status;
    }
  };
  
  return (
    <Container>
      <DashboardContainer>
        <DashboardHeader>
          <DashboardTitle>Enterprise Dashboard</DashboardTitle>
          <DashboardActions>
            <Button variant="primary">
              Authenticate Document
            </Button>
            <Button variant="outlined">
              View Reports
            </Button>
          </DashboardActions>
        </DashboardHeader>
        
        <StatsGrid>
          <StatCard>
            <StatValue color="primary">{stats.documents}</StatValue>
            <StatLabel>Total Documents</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="success">{stats.authenticated}</StatValue>
            <StatLabel>Authenticated</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="secondary">{stats.trackingEvents}</StatValue>
            <StatLabel>Tracking Events</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="error">{stats.suspiciousActivities}</StatValue>
            <StatLabel>Suspicious Activities</StatLabel>
          </StatCard>
        </StatsGrid>
        
        <SectionTitle>Enterprise Solutions</SectionTitle>
        <SolutionsGrid>
          {enterpriseSolutions.map((solution) => (
            <SolutionCard key={solution.id}>
              <SolutionIcon>{solution.icon}</SolutionIcon>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <Button as={Link} to={solution.url} variant="primary">
                Learn More
              </Button>
            </SolutionCard>
          ))}
        </SolutionsGrid>
        
        <RecentActivitiesContainer>
          <SectionTitle>Recent Activities</SectionTitle>
          <ActivityTable>
            <ActivityHeader>
              <ActivityCell>Document</ActivityCell>
              <ActivityCell>Action</ActivityCell>
              <ActivityCell>Date</ActivityCell>
              <ActivityCell>Status</ActivityCell>
            </ActivityHeader>
            
            {recentActivities.map((activity) => (
              <ActivityRow key={activity.id}>
                <ActivityCell data-label="Document:">{activity.document}</ActivityCell>
                <ActivityCell data-label="Action:">{activity.action}</ActivityCell>
                <ActivityCell data-label="Date:">{activity.date}</ActivityCell>
                <ActivityCell data-label="Status:">
                  <StatusBadge status={activity.status}>
                    {getStatusLabel(activity.status)}
                  </StatusBadge>
                </ActivityCell>
              </ActivityRow>
            ))}
          </ActivityTable>
        </RecentActivitiesContainer>
      </DashboardContainer>
    </Container>
  );
};

export default EnterpriseDashboard;