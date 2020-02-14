import React from 'react';
import {
  RenderSeriesComponent,
  CurrentSeries,
  RecentSeries,
  FeaturedSeries
} from '@newfrontdoor/sermon';
import imageUrlBuilder from '@sanity/image-url';
import styled from '@emotion/styled';
import sanityClient from '../lib/sanity';

const Grid = styled.div`
  display: grid;
  h2 {
    margin: 0;
  }
  img {
    width: 100%;
  }

  section {
    display: contents;
  }
  @media (min-width: 700px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 50px auto;
    grid-auto-flow: column;
    gap: 5px 20px;
    section:nth-of-type(3) {
      h2 {
        grid-column: 3/5;
      }
    }
  }
`;
const builder = imageUrlBuilder(sanityClient);

function urlFor(source) {
  return builder.image(source);
}

export default function SermonGrid({sermons, series, def}) {
  const latestSermon = {
    ...sermons[0],
    link: `talks/${sermons[0].slug}`,
    image: urlFor(sermons[0].image)
      .width(300)
      .height(300)
      .url()
  };
  const modseries = series.map(ind => {
    const hasImage =
      ind.hasOwnProperty('image') && ind.image.hasOwnProperty('asset');
    return {
      ...ind,
      image: urlFor(hasImage ? ind.image : def[0].image)
        .width(300)
        .height(300)
        .url()
    };
  });

  console.log(modseries);

  return (
    <Grid>
      <section>
        <h2>Latest Sermon</h2>
        <RenderSeriesComponent {...latestSermon} />
      </section>
      <CurrentSeries seriesData={modseries[0]} loading={!modseries} />
      <RecentSeries
        seriesData={[modseries[1], modseries[2]]}
        loading={!modseries}
      />
    </Grid>
  );
}
