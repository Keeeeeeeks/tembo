import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const UploadContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const PageTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    overflow-x: auto;
    padding-bottom: ${({ theme }) => theme.spacing.md};
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StepItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 24px;
    left: 50%;
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.border};
    z-index: 0;
  }
  
  &:last-child::after {
    display: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-width: 120px;
  }
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  background-color: ${({ active, completed, theme }) => {
    if (completed) return theme.colors.success;
    if (active) return theme.colors.primary;
    return theme.colors.border;
  }};
  color: ${({ active, completed, theme }) => {
    if (completed || active) return 'white';
    return theme.colors.textLight;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  z-index: 1;
`;

const StepLabel = styled.div`
  font-size: 14px;
  color: ${({ active, completed, theme }) => {
    if (completed) return theme.colors.success;
    if (active) return theme.colors.primary;
    return theme.colors.textLight;
  }};
  font-weight: ${({ active, completed }) => (active || completed ? 'bold' : 'normal')};
  text-align: center;
`;

const UploadCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  &:hover {
    transform: none;
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(48, 96, 255, 0.2);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(48, 96, 255, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(48, 96, 255, 0.2);
  }
`;

const DropZone = styled.div`
  border: 2px dashed ${({ theme, isDragOver }) => 
    isDragOver ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${({ theme, isDragOver }) => 
    isDragOver ? 'rgba(48, 96, 255, 0.05)' : theme.colors.background};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(48, 96, 255, 0.05);
  }
`;

const DropZoneIcon = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
`;

const DropZoneText = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
`;

const PreviewContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${({ src }) => src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    justify-content: ${({ align }) => align === 'right' ? 'flex-end' : 'flex-start'};
  }
`;

// Blockchain options
const blockchainOptions = [
  { value: 'solana', label: 'Solana' },
  { value: 'base', label: 'Base' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'megaeth', label: 'MegaETH' }
];

// Step 1: Upload Artwork
const UploadArtwork = ({ onNext, artworkData, setArtworkData }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewImage, setPreviewImage] = useState(artworkData.image || null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileChange(file);
    }
  };
  
  const handleFileChange = (file) => {
    // Only allow image files
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
      setArtworkData({
        ...artworkData,
        file,
        image: e.target.result
      });
    };
    reader.readAsDataURL(file);
  };
  
  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };
  
  const handleUploadClick = () => {
    // Trigger the hidden file input
    document.getElementById('file-upload').click();
  };
  
  const handleNext = () => {
    if (!previewImage) {
      alert('Please upload an artwork image');
      return;
    }
    
    onNext();
  };
  
  return (
    <UploadCard>
      <h2>Upload Your Artwork</h2>
      <p>Upload your digital artwork to begin the authentication process.</p>
      
      <FormGroup>
        <input 
          type="file" 
          id="file-upload" 
          onChange={handleFileInputChange} 
          style={{ display: 'none' }} 
          accept="image/*"
        />
        
        <DropZone 
          isDragOver={isDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          <DropZoneIcon>🖼️</DropZoneIcon>
          <DropZoneText>
            Drag and drop your artwork, or click to browse
          </DropZoneText>
          <Button variant="outlined">Select File</Button>
        </DropZone>
        
        {previewImage && (
          <PreviewContainer>
            <h3>Preview</h3>
            <ImagePreview src={previewImage} />
          </PreviewContainer>
        )}
      </FormGroup>
      
      <ActionButtons>
        <ButtonGroup>
          <Button variant="outlined" disabled>
            Back
          </Button>
        </ButtonGroup>
        
        <ButtonGroup align="right">
          <Button variant="primary" onClick={handleNext}>
            Next: Details
          </Button>
        </ButtonGroup>
      </ActionButtons>
    </UploadCard>
  );
};

// Step 2: Enter Artwork Details
const ArtworkDetails = ({ onNext, onBack, artworkData, setArtworkData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtworkData({
      ...artworkData,
      [name]: value
    });
  };
  
  const handleNext = () => {
    // Basic validation
    if (!artworkData.title || !artworkData.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    onNext();
  };
  
  return (
    <UploadCard>
      <h2>Artwork Details</h2>
      <p>Provide information about your artwork to help with authentication and discoverability.</p>
      
      <FormGroup>
        <Label htmlFor="title">Title *</Label>
        <Input 
          type="text" 
          id="title" 
          name="title"
          value={artworkData.title || ''}
          onChange={handleChange}
          placeholder="Enter artwork title"
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="description">Description *</Label>
        <Textarea 
          id="description" 
          name="description"
          value={artworkData.description || ''}
          onChange={handleChange}
          placeholder="Describe your artwork, its significance, and any relevant context"
          required
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input 
          type="text" 
          id="tags" 
          name="tags"
          value={artworkData.tags || ''}
          onChange={handleChange}
          placeholder="e.g. abstract, digital, landscape"
        />
      </FormGroup>
      
      <ActionButtons>
        <ButtonGroup>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </ButtonGroup>
        
        <ButtonGroup align="right">
          <Button variant="primary" onClick={handleNext}>
            Next: Authentication
          </Button>
        </ButtonGroup>
      </ActionButtons>
    </UploadCard>
  );
};

// Step 3: Authentication Settings
const AuthenticationSettings = ({ onNext, onBack, artworkData, setArtworkData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtworkData({
      ...artworkData,
      [name]: value
    });
  };
  
  const handleNext = () => {
    // Basic validation
    if (!artworkData.blockchain) {
      alert('Please select a blockchain');
      return;
    }
    
    onNext();
  };
  
  return (
    <UploadCard>
      <h2>Authentication Settings</h2>
      <p>Choose how your artwork will be authenticated and stored on the blockchain.</p>
      
      <FormGroup>
        <Label htmlFor="blockchain">Blockchain *</Label>
        <Select 
          id="blockchain" 
          name="blockchain"
          value={artworkData.blockchain || ''}
          onChange={handleChange}
          required
        >
          <option value="">Select Blockchain</option>
          {blockchainOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="watermarkStrength">Watermark Strength</Label>
        <Select 
          id="watermarkStrength" 
          name="watermarkStrength"
          value={artworkData.watermarkStrength || 'standard'}
          onChange={handleChange}
        >
          <option value="light">Light - Less visible</option>
          <option value="standard">Standard - Balanced</option>
          <option value="strong">Strong - More robust</option>
        </Select>
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="storageOption">Storage Option</Label>
        <Select 
          id="storageOption" 
          name="storageOption"
          value={artworkData.storageOption || 'bundlr'}
          onChange={handleChange}
        >
          <option value="bundlr">Bundlr (Recommended)</option>
          <option value="arweave">Arweave Direct</option>
          <option value="ipfs">IPFS</option>
        </Select>
      </FormGroup>
      
      <ActionButtons>
        <ButtonGroup>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </ButtonGroup>
        
        <ButtonGroup align="right">
          <Button variant="primary" onClick={handleNext}>
            Next: Monetization
          </Button>
        </ButtonGroup>
      </ActionButtons>
    </UploadCard>
  );
};

// Step 4: Monetization Options
const MonetizationOptions = ({ onNext, onBack, artworkData, setArtworkData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtworkData({
      ...artworkData,
      [name]: value
    });
  };
  
  const handleNext = () => {
    onNext();
  };
  
  return (
    <UploadCard>
      <h2>Monetization Options</h2>
      <p>Configure how you want to monetize your artwork.</p>
      
      <FormGroup>
        <Label htmlFor="price">Initial Sale Price (USD)</Label>
        <Input 
          type="number" 
          id="price" 
          name="price"
          value={artworkData.price || ''}
          onChange={handleChange}
          placeholder="e.g. 100"
          min="0"
          step="0.01"
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="royaltyPercentage">Royalty Percentage</Label>
        <Input 
          type="number" 
          id="royaltyPercentage" 
          name="royaltyPercentage"
          value={artworkData.royaltyPercentage || ''}
          onChange={handleChange}
          placeholder="e.g. 10"
          min="0"
          max="50"
        />
      </FormGroup>
      
      <FormGroup>
        <Label htmlFor="accessTiers">Access Tiers</Label>
        <Select 
          id="accessTiers" 
          name="accessTiers"
          value={artworkData.accessTiers || 'standard'}
          onChange={handleChange}
        >
          <option value="standard">Standard (Single Tier)</option>
          <option value="tiered">Tiered Access (Public/Premium)</option>
          <option value="exclusive">Exclusive (Collectors Only)</option>
        </Select>
      </FormGroup>
      
      <ActionButtons>
        <ButtonGroup>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </ButtonGroup>
        
        <ButtonGroup align="right">
          <Button variant="primary" onClick={handleNext}>
            Next: Review
          </Button>
        </ButtonGroup>
      </ActionButtons>
    </UploadCard>
  );
};

// Step 5: Review and Submit
const ReviewSubmit = ({ onBack, artworkData, onSubmit }) => {
  const formatBlockchain = (value) => {
    const option = blockchainOptions.find(opt => opt.value === value);
    return option ? option.label : value;
  };
  
  return (
    <UploadCard>
      <h2>Review and Submit</h2>
      <p>Please review your information before final submission.</p>
      
      <ImagePreview src={artworkData.image} />
      
      <div style={{ marginBottom: '24px' }}>
        <h3>Artwork Details</h3>
        <p><strong>Title:</strong> {artworkData.title}</p>
        <p><strong>Description:</strong> {artworkData.description}</p>
        {artworkData.tags && <p><strong>Tags:</strong> {artworkData.tags}</p>}
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <h3>Authentication Settings</h3>
        <p><strong>Blockchain:</strong> {formatBlockchain(artworkData.blockchain)}</p>
        <p><strong>Watermark Strength:</strong> {artworkData.watermarkStrength || 'Standard'}</p>
        <p><strong>Storage Option:</strong> {artworkData.storageOption || 'Bundlr'}</p>
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <h3>Monetization Options</h3>
        <p><strong>Initial Price:</strong> ${artworkData.price || '0'} USD</p>
        <p><strong>Royalty Percentage:</strong> {artworkData.royaltyPercentage || '0'}%</p>
        <p><strong>Access Tiers:</strong> {artworkData.accessTiers || 'Standard'}</p>
      </div>
      
      <ActionButtons>
        <ButtonGroup>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
        </ButtonGroup>
        
        <ButtonGroup align="right">
          <Button variant="primary" onClick={onSubmit}>
            Submit Artwork
          </Button>
        </ButtonGroup>
      </ActionButtons>
    </UploadCard>
  );
};

const ArtworkUpload = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [artworkData, setArtworkData] = useState({
    watermarkStrength: 'standard',
    storageOption: 'bundlr',
    accessTiers: 'standard'
  });
  
  const steps = [
    { number: 1, label: 'Upload' },
    { number: 2, label: 'Details' },
    { number: 3, label: 'Authentication' },
    { number: 4, label: 'Monetization' },
    { number: 5, label: 'Review' }
  ];
  
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleSubmit = () => {
    // In a real app, this would submit to an API
    console.log('Submitting artwork:', artworkData);
    
    // Redirect to artist dashboard
    navigate('/artist-dashboard');
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UploadArtwork 
            onNext={handleNext} 
            artworkData={artworkData} 
            setArtworkData={setArtworkData} 
          />
        );
      case 2:
        return (
          <ArtworkDetails 
            onNext={handleNext} 
            onBack={handleBack} 
            artworkData={artworkData} 
            setArtworkData={setArtworkData} 
          />
        );
      case 3:
        return (
          <AuthenticationSettings 
            onNext={handleNext} 
            onBack={handleBack} 
            artworkData={artworkData} 
            setArtworkData={setArtworkData} 
          />
        );
      case 4:
        return (
          <MonetizationOptions 
            onNext={handleNext} 
            onBack={handleBack} 
            artworkData={artworkData} 
            setArtworkData={setArtworkData} 
          />
        );
      case 5:
        return (
          <ReviewSubmit 
            onBack={handleBack} 
            artworkData={artworkData}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <Container>
      <UploadContainer>
        <PageTitle>Upload Artwork</PageTitle>
        
        <StepsContainer>
          {steps.map((step) => (
            <StepItem key={step.number}>
              <StepNumber 
                active={step.number === currentStep} 
                completed={step.number < currentStep}
              >
                {step.number < currentStep ? '✓' : step.number}
              </StepNumber>
              <StepLabel 
                active={step.number === currentStep} 
                completed={step.number < currentStep}
              >
                {step.label}
              </StepLabel>
            </StepItem>
          ))}
        </StepsContainer>
        
        {renderStep()}
      </UploadContainer>
    </Container>
  );
};

export default ArtworkUpload;