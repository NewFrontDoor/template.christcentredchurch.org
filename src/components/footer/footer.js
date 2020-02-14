import React from 'react';
import styled from '@emotion/styled';

const FooterWrapper = styled('footer')`
  z-index: 0;
  position: relative;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 2rem;
  background-color: #4c516d;
  color: white;
`;

const FooterInner = styled('div')`
  max-width: 1170px;
  margin: auto;
  min-height: 1em;
  font-size: 0.85rem;
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterInner>
        <p>© 2019 New Front Door</p>
      </FooterInner>
    </FooterWrapper>
  );
}
