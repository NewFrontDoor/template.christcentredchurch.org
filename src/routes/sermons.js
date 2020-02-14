import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {SermonTable} from '@newfrontdoor/sermon';
import {SearchCollection as SermonFilter} from '@newfrontdoor/search';
import HomeBlock from '../components/home-block-text-serializer';
import Banner from '../components/banner';
import sanity from '../lib/sanity';
import SermonGrid from '../components/sermon-grid';

const headers = [
  {heading: 'Title', key: 'title', searchable: true},
  {heading: 'Series', key: 'series', searchable: true},
  {heading: 'Bible Passage(s)', key: 'book', searchable: true},
  {heading: 'Speaker', key: 'preacher', searchable: true},
  {heading: 'Date Preached', key: 'date', searchable: false}
];

const Main = styled('article')`
  max-width: 1200px;
  padding: 20px;
  margin: auto;
  font-size: 1.15em;
  line-height: 1.8;
  color: #444444;
`;

export default function Sermons({slug, pageData, sermonData, def}) {
  const [data, setData] = useState(pageData);
  const [dataFetched, setDataFetched] = useState(Boolean(pageData));
  const [sermonsFetched, setSermonsFetched] = useState(Boolean(sermonData));
  const [sermons, setSermons] = useState(sermonData);
  const [series, setSeries] = useState();
  const [seriesFetched, setSeriesFetched] = useState(false);
  const [sermonsSubset, setSubset] = useState(sermonData.slice(0, 10));
  const pageQuery = `
    *[_type == "page" && slug.current match '${slug}'] {
      ...,
      body[]{
        ...,
        _type == 'reference' => @->
      }
    }
  `;

  const sermonQuery = `
  *[_type == "sermons"] {
    "key": _id,
    title,
    _id,
    preachedDate,
    "preacher": preacher->name,
    "series": series->title,
    "book": passage,
    "url": file,
    "slug": slug.current,
    "image": series->image
  } | order(preachedDate desc)
  `;

  const seriesQuery = `
    *[_type == "series"] {
      ...,
      "id": _id,
      title,
      image,
      "link": ''
    }|order(_updatedAt desc)
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await sanity.fetch(pageQuery);
      setData(result[0]);
      setDataFetched(true);
    };

    if (dataFetched === false) {
      fetchData();
    } else {
      setData(pageData);
    }
  }, [dataFetched, pageData, pageQuery]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await sanity.fetch(sermonQuery);
      setSermons(result);
      setSubset(result.slice(0, 10));
      setSermonsFetched(true);
    };

    if (sermonsFetched === false) {
      fetchData();
    } else {
      setSermons(sermonData);
      setSubset(sermonData.slice(0, 10));
    }
  }, [sermonData, sermonQuery, sermonsFetched]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await sanity.fetch(seriesQuery);
      setSeries(result);
      setSeriesFetched(true);
    };

    if (seriesFetched === false) {
      fetchData();
    }
  }, [seriesFetched, seriesQuery]);

  return (
    dataFetched && (
      <>
        <Banner data={data} />
        <Main>
          <HomeBlock blocks={data.body} />
          {sermonsFetched && (
            <>
              {seriesFetched && (
                <SermonGrid sermons={sermons} series={series} def={def} />
              )}
              <SermonTable
                sermons={sermonsSubset}
                headers={headers}
                columnHide={[5]}
                sermonDirectory="talks"
              />
            </>
          )}
        </Main>
      </>
    )
  );
}

Sermons.propTypes = {
  slug: PropTypes.string.isRequired,
  pageData: PropTypes.array
};
