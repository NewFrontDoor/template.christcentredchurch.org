import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import HomeBlock from '../components/home-block-text-serializer';
import Banner from '../components/banner';
import sanity from '../lib/sanity';

const Main = styled('article')`
  max-width: 700px;
  margin: auto;
  padding: 15px;
  font-size: 1.15em;
  line-height: 1.8;
  color: #444444;
`;

export default function Search({flexindex, pageData, slug, sermonflexindex}) {
  const [data, setData] = useState(pageData);
  const [dataFetched, setDataFetched] = useState(Boolean(pageData));
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState(null);

  const pageQuery = `
  *[_type == "page" && slug.current match '${slug}'] {
    ...,
    body[]{
      ...,
      _type == 'reference' => @-> {
        ...,
        blocks[] {
          ...,
          _type == 'reference' => @ ->
        }
      },
      markDefs[] {
        ...,
        _type == 'internalLink' => {
            'slug': @.reference->slug.current
        }
      }
    }
  }
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

  const handleChange = event => {
    const filter = event.target.value;
    const results = flexindex
      .search({
        query: filter,
        limit: 10,
        threshold: 5,
        depth: 3,
        field: ['title', 'searchbody']
      })
      .concat(
        sermonflexindex.search({
          query: filter,
          limit: 10,
          threshold: 5,
          depth: 3,
          field: ['title', 'preacher', 'book', 'series']
        })
      );
    console.log(results);
    setResults(results);
    setFilter(filter);
  };

  return (
    <>
      <Banner data={data} />
      <Main>
        <HomeBlock blocks={data ? data.body : ''} />
        <input type="text" value={filter} onChange={handleChange} />
        {results &&
          results.map(result => (
            <div key={result._id}>
              <Link
                to={result.pathname ? result.pathname : 'talks/' + result.slug}
              >
                <h1>{result.title}</h1>
              </Link>
              {result.searchbody ? (
                <p>{result.searchbody.slice(0, 100)}...</p>
              ) : (
                <p>
                  {result.series} - {result.preacher}
                  <br />
                  {result.book}
                </p>
              )}
            </div>
          ))}
      </Main>
    </>
  );
}

Search.propTypes = {
  slug: PropTypes.string.isRequired,
  pageData: PropTypes.object,
  flexindex: PropTypes.object.isRequired
};
