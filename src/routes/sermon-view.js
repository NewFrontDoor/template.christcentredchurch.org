import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {StyledPlayer} from '@newfrontdoor/audio-player';
import Banner from '../components/banner';
import sanity from '../lib/sanity';

const Main = styled('article')`
  max-width: ${props => (props.thing > 0 ? '1200px' : '700px')};
  margin: auto;
  padding: 15px;
  font-size: 1.15em;
  line-height: 1.8;
  color: #444444;
`;

const SermonWrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 20px;
`;

const InfoRow = styled('p')`
  font-size: 16px;
  line-height: 18px;
`;

function returnDay(number) {
  switch (number) {
    case 0:
      return 'Sunday';
    case 1:
      return 'Monday';
    case 2:
      return 'Tuesday';
    case 3:
      return 'Wednesday';
    case 4:
      return 'Thursday';
    case 5:
      return 'Friday';
    case 6:
      return 'Saturday';
    default:
      return null;
  }
}

function returnMonth(number) {
  switch (number) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    case 4:
      return 'May';
    case 5:
      return 'June';
    case 6:
      return 'July';
    case 7:
      return 'August';
    case 8:
      return 'September';
    case 9:
      return 'October';
    case 10:
      return 'November';
    case 11:
      return 'December';
    default:
      return null;
  }
}

export default function SermonPage({slug, sermonData}) {
  const [data, setData] = useState(sermonData);
  const [dataFetched, setDataFetched] = useState(Boolean(sermonData));
  const [datePreached, setDatePreached] = useState(
    new Date(sermonData.preachedDate)
  );

  const sermonQuery = `
    *[_type == "sermons" && slug.current == '${slug}'] {
      "key": _id,
      title,
      _id,
      preachedDate,
      "preacher": preacher -> name,
      "series": series -> title,
      "book": passage,
      "url": "https://s3.us-west-2.amazonaws.com/sermons.onewaymargate.org/" + file,
      "slug": slug.current
    }
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await sanity.fetch(sermonQuery);
      setData(result[0]);
      setDataFetched(true);
      setDatePreached(new Date(result[0].preachedDate));
    };

    if (dataFetched === false) {
      fetchData();
    }
  }, [dataFetched, slug, sermonQuery]);

  return (
    dataFetched && (
      <>
        <Banner data={data} />
        <Main thing={0}>
          <SermonWrapper>
            <div>
              <h3>{data.title}</h3>
              <StyledPlayer
                hasPlaybackSpeed
                hasBorder
                isInvert
                highlight="#c4dbf6"
                background="#4c516d"
                base="#4c516d"
                audio={data.url}
                width="300px"
              />
              <a download href={data.url}>
                Download
              </a>
              <InfoRow>Speaker - {data.preacher}</InfoRow>
              <InfoRow>Series - {data.series}</InfoRow>
              {datePreached && (
                <InfoRow style={{fontStyle: 'italic'}}>
                  {`${returnDay(datePreached.getDay())}, ${returnMonth(
                    datePreached.getMonth()
                  )} ${datePreached.getDate()}, ${datePreached.getFullYear()}`}
                </InfoRow>
              )}
            </div>
          </SermonWrapper>
        </Main>
      </>
    )
  );
}

SermonPage.propTypes = {
  slug: PropTypes.string.isRequired,
  pageData: PropTypes.object
};
