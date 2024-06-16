import React, { useContext } from 'react';
import { FaMoon } from 'react-icons/fa';
import { CiLight } from "react-icons/ci";
import { TiWeatherPartlySunny } from "react-icons/ti";
import themeContext from '../../context/themeContext';
import { HeaderContainer, LogoHeading } from './styledComponents';
import './index.css';

const Header = () => {
  const { isLight, changeTheme } = useContext(themeContext);

  const onChangeTheme = () => {
    changeTheme(); 
  };

  return (
    <HeaderContainer isLight={isLight}>
        <div className='logo-cont'>
            <TiWeatherPartlySunny color={`${isLight ? 'black': "white"}`} size={"50px"}/>
            <LogoHeading isLight={isLight}>
                Weather<br/><span className="heading-part">Finder</span>
            </LogoHeading>
        </div>
      <button className="theme-button" onClick={onChangeTheme}>
        {isLight ? <FaMoon size={30} /> : <CiLight color='white' size={30} />}
      </button>
    </HeaderContainer>
  );
};

export default Header;
