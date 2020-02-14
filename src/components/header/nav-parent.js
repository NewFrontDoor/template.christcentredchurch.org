import React from 'react';
import styled from '@emotion/styled';
import {NavHashLink as NavLink} from 'react-router-hash-link';

const ListItem = styled('li')`
  position: relative;
  line-height: 1.6;
  transition-duration: 0.5s;
  &:hover > ul,
  ul li ul:hover {
    visibility: visible;
    opacity: 1;
    display: block;
  }
  color: #444446;
  @media screen and (min-width: 768px) {
    color: white;
    margin: 0.3125em 0 0 1.25em;
    padding-bottom: 1rem;
    margin-bottom: -1rem;
    line-height: initial;
  }
`;

const Anchor = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  font-family: 'Rubik';
  font-weight: 700;
  color: inherit;
  :hover {
    color: pink;
  }
`;
const Submenu = styled('ul')`
  list-style: none;
  margin: 0;
  padding-left: 0;
  visibility: hidden;
  opacity: 0;
  min-width: 5rem;
  position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
  left: 0;
  display: none;
  color: #444446;
  padding: 0.75em 0.5em 0.75em 0.625em;
  border-radius: 0.3125em;
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
`;

const ChildItem = styled('li')`
  padding-bottom: 0.5rem;
`;

export default function Navparent({link, text, childpages}) {
  return (
    <ListItem>
      <Anchor
        to={link}
        location={{
          pathname: document.location.pathname + document.location.hash
        }}
      >
        {text}
      </Anchor>
      <Submenu>
        {childpages.map(child => {
          return (
            <ChildItem>
              <Anchor
                to={child.slug.current}
                location={{
                  pathname: document.location.pathname + document.location.hash
                }}
              >
                {child.title}
              </Anchor>
            </ChildItem>
          );
        })}
      </Submenu>
    </ListItem>
  );
}
