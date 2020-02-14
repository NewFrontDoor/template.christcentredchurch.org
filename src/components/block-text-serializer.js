import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import Text from 'mineral-ui/Text';
import {css} from '@emotion/core';
import styled from '@emotion/styled';
import {NavHashLink as NavLink} from 'react-router-hash-link';

const serializers = {
  types: {
    block: CustomStyleSerializer
  },
  marks: {
    link: CustomLinkSerializer,
    internalLink: InternalLinkSerializer
  }
};

const Blockquote = css`
  position: relative;
  font-size: 1.1em;
  line-height: 1.3em;
  font-style: italic;
  z-index: 1;
  &::before {
    content: '\\201C';
    position: absolute;
    top: .12em;
    left: -.5em;
    color: #ebebeb;
    font-size: 5em;
    z-index: -1;
  }
`;

const Presentation = styled('pre')`
  font-size: 25px;
  max-width: 500px;
  text-align: center;
  margin: auto;
  @media (min-width: 420px) {
    font-size: 30px;
  }
`;

const normalStyle = props => css`
  flex: 1 0 auto;
  width: calc(100% - 40px);
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: 420px) {
    width: ${props.width};
  }
`;

const scrollWithOffset = (el, offset) => {
  const elementPosition = el.offsetTop - offset;
  window.scroll({
    top: elementPosition,
    left: 0,
    behavior: 'smooth'
  });
};

const CustomLinkSerializer = props => {
  if (props.mark.href.includes('#')) {
    return (
      <NavLink
        to={props.mark.href}
        location={{
          pathname: document.location.pathname + document.location.hash
        }}
        scroll={el => scrollWithOffset(el, 90)}
      >
        {props.children}
      </NavLink>
    );
  }
  return <a href={props.mark.href}>{props.children}</a>;
};


const InternalLinkSerializer = props => {
  return <a href={props.mark.slug}>{props.children}</a>;
};

const CustomStyleSerializer = props => {
  const style = props.node.style || 'normal';
  if (/^h\d/.test(style)) return <Text element={style}>{props.children}</Text>;
  switch (style) {
    case 'presentation':
      return (
        <Presentation className="presentation">{props.children}</Presentation>
      );
    case 'blockquote':
      return <blockquote className={Blockquote}>{props.children}</blockquote>;
    default:
      return (
        <Text appearance="prose" element="p">
          poop{props.children}
        </Text>
      );
  }
};

const SanityBlock = props => (
  <BlockContent
    blocks={props.blocks}
    serializers={serializers}
  />
);

export default SanityBlock;
