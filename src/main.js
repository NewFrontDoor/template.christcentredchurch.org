/** @jsx jsx */
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {css, jsx} from '@emotion/core';
import Header from './components/header/header-fixed';
import Footer from './components/footer/footer';
import Home from './routes/home';
import Page from './routes/page';
import Search from './routes/search';
import AllSermons from './routes/all-sermons';
import Sermons from './routes/sermons';
import SermonPage from './routes/sermon-view';

const body = css`
  font-family: 'Rubik';
  color: white;
`;

export default function Main({
  mainData: {menuData, mainData, sermonData, def},
  pagesData,
  indexData,
  flexindex,
  sermonflexindex
}) {
  return (
    <BrowserRouter>
      <div css={body}>
        <Header navlinks={menuData.menuitems} />
        <Switch>
          <Route
            exact
            path={process.env.PUBLIC_URL + '/'}
            render={() => <Home content={mainData.content} />}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/search'}
            render={() => (
              <Search
                slug="flexsearch"
                pageData={pagesData ? pagesData.search : undefined}
                pagesData={pagesData}
                indexData={indexData}
                flexindex={flexindex}
                sermonflexindex={sermonflexindex}
              />
            )}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/talks'}
            render={() => (
              <Sermons
                slug="talks"
                pageData={pagesData ? pagesData.talks : undefined}
                sermonData={sermonData ? sermonData : undefined}
                def={def}
              />
            )}
          />
          <Route
            exact
            path={process.env.PUBLIC_URL + '/all-talks'}
            render={() => (
              <AllSermons
                slug="all-talks"
                pageData={pagesData ? pagesData['all-talks'] : undefined}
                sermonData={sermonData ? sermonData : undefined}
              />
            )}
          />
          <Route
            path="/talks/:slug"
            render={({match}) => (
              <SermonPage
                slug={match.params.slug}
                sermonData={sermonData.find(
                  ({slug}) => slug === match.params.slug
                )}
              />
            )}
          />
          <Route
            path="/:slug"
            render={({match}) => (
              <Page
                slug={match.params.slug}
                pageData={pagesData ? pagesData[match.params.slug] : undefined}
              />
            )}
          />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

Main.propTypes = {
  mainData: PropTypes.object.isRequired,
  pagesData: PropTypes.object,
  indexData: PropTypes.array
};
