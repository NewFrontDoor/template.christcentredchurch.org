import React from 'react';
import styled from '@emotion/styled';
import placeholder from '../static/placeholder-800x200.jpg';

const SermonOuter = styled('div')`
  display: grid;
  grid-template-columns: 15px 1fr 15px;
  margin-bottom: 4em;
  div,
  h2 {
    grid-column: 2/3;
    max-width: 100%;
    text-align: center;
    margin: 0.5em;
    img {
      width: 100%;
    }
  }
  ul {
    grid-column: 2/3;
    list-style: none;
    font-size: 0.8em;
    padding: 0;
    margin-top: 0;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
`;

const Actions = styled('section')`
  grid-column: 2/3;
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

export default function SermonBlock({title, date, preacher, series, book}) {
  return (
    <SermonOuter>
      <div>
        <img src={placeholder} alt={title} />
      </div>
      <h2>{title}</h2>
      <ul>
        <li>{date}</li>
        <li>{preacher}</li>
        <li>{series}</li>
        <li>{book}</li>
      </ul>
      <Actions>
        <button type="button">Details</button>
        <button type="button">Listen</button>
      </Actions>
    </SermonOuter>
  );
}
