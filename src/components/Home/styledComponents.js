import styled from 'styled-components'

export const HomeContainer = styled.div`
  background-color: ${props => (props.isLight ? 'white' : 'black')};
  min-height: 90vh;
  width: 100vw;
  display: flex;
  padding-top: 30px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.input`
  background-color: transparent;
  border: 1px solid;
  width: 70%;
  max-width: 300px;
  height: 20px;
  border-radius: 5px;
  padding: 5px 10px;
  outline: none;
  cursor: text;
  border-color: ${props => (props.isLight ? 'black' : 'white')};
  color: ${props => (props.isLight ? 'black' : 'white')};
  margin: 10px;
`;

export const SearchButton = styled.button`
  background-color: ${props => (props.isLight ? 'black' : '#555')};
  color: #fff;
  border: none;
  height: 30px;
  width: 90px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.4s;

  &:hover {
    background-color: orange;
  }
`;

export const FailureH1 = styled.h1`
  font-size: 20px;
  text-align: center;
  color: ${props => (props.isLight ? 'black' : 'white')};
`;

export const FailurePara = styled.p`
  font-size: 20px;
  text-align: center;
  color: ${props => (props.isLight ? 'black' : 'white')};
`;
