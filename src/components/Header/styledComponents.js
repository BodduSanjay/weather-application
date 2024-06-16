import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  width: 100vw;
  border-bottom: 1px solid gray;
  background-color: ${props => (props.isLight ? 'white' : 'black')};
`;

export const LogoHeading = styled.h1`
  font-size: 20px;
  font-family: Unna;
  color: ${props => (props.isLight ? 'black' : 'white')};
`;