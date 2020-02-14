/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import urlFor from '../lib/sanityImg';
import HomeBlock from './home-block-text-serializer';

const Actions = styled('section')`
  grid-column: 1/1;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
  button {
    background: none;
    text-transform: lowercase;
    font-size: 0.8em;
    padding: 10px 15px 10px 15px;
  }
`;

const action = css`
  text-decoration: none;
  padding: 10px 0;
  font-size: 0.8em;
  text-transform: uppercase;
  border: 1px solid;
  border-color: #444446;
  border-radius: 40px;
  grid-column-start: NaN;
  color: #444446;
  width: 7.25rem;
  :hover {
    background-color: #444446;
    color: white;
    cursor: pointer;
  }
  @media (min-width: 420px) {
    grid-column-start: ${props => props.column + 2};
  }
`;

const Header = styled('h3')`
  grid-column: 1/1;
  max-width: 100%;
  text-align: center;
  margin: 0.5em;
`;

const Image = styled.img`
  grid-column: 1/1;
  width: 100%;
`;

function InternalLink({url, children}) {
  return (
    <Link css={action} to={`/${url}`}>
      {children}
    </Link>
  );
}

function ExternalLink({url, children}) {
  return (
    <a css={action} href={`${url}`}>
      {children}
    </a>
  );
}

const regex = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

export default function Card({header, description, image, link, action}) {
  return (
    <div>
      {regex.test(link) ? (
        <Link to={`/${link}`}>
          <Image
            src={urlFor(image)
              .width(530)
              .height(135)
              .auto('format')
              .url()}
            alt={header}
          />
          <Header>{header}</Header>
        </Link>
      ) : (
        <a href={link}>
          <Image
            src={urlFor(image)
              .width(530)
              .height(135)
              .auto('format')
              .url()}
            alt={header}
          />
          <Header>{header}</Header>
        </a>
      )}
      <HomeBlock blocks={description} />
      {link && (
        <Actions>
          {regex.test(link) ? (
            <InternalLink url={link}>
              {action ? action : 'VIEW PAGE'}
            </InternalLink>
          ) : (
            <ExternalLink url={link}>
              {action ? action : 'VIEW PAGE'}
            </ExternalLink>
          )}
        </Actions>
      )}
    </div>
  );
}
