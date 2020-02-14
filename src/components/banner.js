import React from 'react';
import styled from '@emotion/styled';
import {readableColor} from 'polished';
import urlFor from '../lib/sanityImg';

const BannerWrapper = styled('div')`
  position: relative;
  width: 100%;
  background-color: #4c516d;
`;

const BannerImage = styled('div')`
  opacity: ${props => (props.image ? '0.25' : '0')};
  background-image: url(${props => urlFor(props.image).url()});
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #444446;
`;

const BannerInner = styled('div')`
  display: table;
  color: ${readableColor('#4c516d')};
  position: relative;
  height: 100%;
  padding-top: 12%;
  max-width: 980px;
  margin: auto;
  @media screen and (min-width: 768px) {
    padding: 8% 0 4% 0;
  }
  h1 {
    font-weight: 400;
    font-size: 36px;
    font-family: 'Noto serif';
    line-height: 1.2;
    @media screen and (min-width: 768px) {
      font-size: 58px;
    }
  }
`;

export default function Banner({data}) {
  const image = data.mainImage ? data.mainImage : null;
  return (
    <BannerWrapper>
      <BannerImage image={typeof image === 'string' ? image : ''} />
      <BannerInner>
        <h1>{data ? data.title : ''}</h1>
      </BannerInner>
    </BannerWrapper>
  );
}
