import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.heading};
    margin-top: 0;
  }

  input, textarea, select {
    font-family: inherit;
    font-size: 16px;
  }
`;

export default GlobalStyle;