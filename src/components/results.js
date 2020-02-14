import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';

const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  color: black;
`;

const Title = styled('h3')`
  color: red;
`;

const Preview = styled('p')`
  font-style: italic;
  width: 600px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function Results({data, searchArray}) {
  return (
    <Wrapper>
      <ul>
        {searchArray.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      {data.map(item => {
        const loc = item.body.indexOf(searchArray[0]);
        return (
          <div key={item.title}>
            <Title>
              <Link to={item.slug}>{item.title}</Link>
            </Title>
            <Preview>
              {loc >= 30 && '...'}
              {item.body.slice(loc < 30 ? 0 : loc - 30)}
            </Preview>
          </div>
        );
      })}
    </Wrapper>
  );
}
