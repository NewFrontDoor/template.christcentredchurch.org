import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from '@emotion/styled';
import HamburgerMenu from 'react-hamburger-menu';
import SearchIcon from '../../static/search';
import Navlink from './nav-link';
import Navparent from './nav-parent';

const Nav = styled('ul')`
  flex: 0 1 auto;
  list-style: none;
  margin: 0;
  align-items: center;
  ${props => (props.isOpen ? `display: block;` : `display: none;`)}
  position: absolute;
  top: 70px;
  right: 0px;
  border: #efefef 1px solid;
  padding: 2px;
  border-radius: 2px;
  background-color: white;
  color: #444446;
  width: auto;
  @media screen and (min-width: 768px) {
    padding: 0;
    display: block;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: unset;
    border: none;
    color: inherit;
    background: none;
    width: initial;
  }
`;

const Search = styled('div')`
  height: 16px;
  width: 16px;
  color: #444446;
  height: 100%;
  margin: 0.5em 0 0 1.25em;
  padding: 0;
  vertical-align: center;
  @media screen and (min-width: 768px) {
    color: white;
  }
`;

const Vis = styled('div')`
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Navigation({navlinks, offset}) {
  const [isOpen, setOpen] = useState(false);
  function handleClick() {
    setOpen(!isOpen);
  }

  return (
    <>
      <Vis>
        <HamburgerMenu
          isOpen={isOpen}
          menuClicked={handleClick}
          width={27}
          height={22.5}
          strokeWidth={2}
          rotate={0}
          color="white"
          borderRadius={0}
          animationDuration={0.3}
        />
      </Vis>
      <Nav isOpen={isOpen} onClick={() => setOpen(false)}>
        {navlinks.map(link => {
          if (!link.childpages) {
            return null;
          }

          return link.childpages.length <= 1 ? (
            <Navlink
              key={link.text}
              link={'/' + link.childpages[0].slug.current}
              text={link.text}
            />
          ) : (
            <Navparent
              key={link.text}
              link={'/' + link.childpages[0].slug.current}
              text={link.text}
              childpages={link.childpages}
            />
          );
        })}
        <Search>
          <Link to="/">
            <SearchIcon color="white" />
          </Link>
        </Search>
      </Nav>
    </>
  );
}
