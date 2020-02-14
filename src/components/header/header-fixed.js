import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import useWindowScroll from '@react-hook/window-scroll';
import {ReactComponent as LogoImg} from '../../static/ChristCentredWhite.svg';
import Navigation from './navigation';

const Nav = styled('nav')`
  z-index: 1000;
  position: fixed;
  top: 0;
  width: 100vw;
  padding: 0;
  background-color: #4c516d;
  @media (min-width: 768px) {
    padding: 0.8em 0;
    ${props => (props.offset > 50 ? `background-color: #4c516d;` : '')}
  }
`;

const NavInner = styled('div')`
  max-width: 1170px;
  margin: auto;
  min-height: 2em;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 4px 10px;
  @media screen and (min-width: 768px) {
    margin: auto;
  }
`;

const Logo = styled(Link)`
  flex: 0 1 auto;
  max-width: 300px;
  max-height: 60px;
  #curve1,
  #curve2,
  #oneway,
  #christianchurch {
    fill: white;
  }
  svg {
    max-width: 100%;
    height: 60px;
    width: auto;
    display: inline-block;
  }
  @media screen and (min-width: 768px) {
    max-height: 100px;
    svg {
      height: 100px;
    }
  }
`;

export default function Header({navlinks}) {
  const offset = useWindowScroll(60);
  return (
    <Nav offset={offset}>
      <NavInner>
        <Logo offset={offset} to="/">
          <LogoImg />
        </Logo>
        <Navigation navlinks={navlinks} />
      </NavInner>
    </Nav>
  );
}
