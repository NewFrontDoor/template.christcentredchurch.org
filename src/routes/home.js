import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import HomeLayout from '../components/home-segment';
import MapLayout from '../components/map/map-layout';

export default function Home({content}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {content.map((segment, index) => {
        if (segment.location) {
          return (
            <MapLayout
              key={segment.heading}
              heading={segment.heading}
              actions={segment.actions}
              location={segment.location}
              details={segment.details}
            />
          );
        }

        return (
          <HomeLayout
            key={segment.heading}
            heading={segment.heading}
            blurb={segment.blurb}
            actions={segment.actions}
            background={segment.background}
            displaystyle={segment.styling}
            firstpage={index === 0}
          />
        );
      })}
    </>
  );
}

Home.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string.isRequired,
      blurb: PropTypes.string,
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired
};
