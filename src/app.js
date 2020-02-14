import React, {useState, useEffect} from 'react';
import {createTheme, ThemeProvider} from 'mineral-ui/themes';
import FlexSearch from 'flexsearch';
import sanity from './lib/sanity';
import Main from './main';

const mainQuery = `
*[_type == "main"][0] {
  content[]->{
    actions[]{
      "name": _type,
      "url": page->slug.current,
      label
    },
    background,
    blurb,
    details,
    heading,
    styling,
    location
  }
}
`;

const defQuery = `
*[_type == "config"] {
  "image": logo
}
`;

const menuQuery = `
*[_type == "main"][0] {
  menuitems[]{
    text,
    childpages[]->{
      title,
      slug,
      'pathname': '/' + slug.current
    }
  }
}
`;

const pagesQuery = `
*[_type == "page"] {
  ...,
    body[]{
      ...,
      _type == 'reference' => @-> {
        ...,
        blocks[] {
          ...,
          _type == 'reference' => @ ->,
          "image": image.asset->url,
          "link": link[0].url
        }
      },
      markDefs[] {
        ...,
        _type == 'internalLink' => {
            'slug': @.reference->slug.current
        }
      }
    },
    'mainImage': mainImage.asset->url,
    'id': _id,
  'pathname': '/' + slug.current
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
    "image": series->image,
    "url": "https://s3.us-west-2.amazonaws.com/sermons.onewaymargate.org/" + file,
    "slug": slug.current
  } | order(preachedDate desc)
  `;

const myTheme = createTheme({
  colors: {theme: 'red'},
  overrides: {
    fontFamily: 'Rubik'
  }
});

const coresearch = {
  encode: 'advanced',
  tokenize: 'forward',
  async: false,
  worker: false,
  depth: 10,
  stemmer: 'en',
  filter: 'en'
};

const sermonflex = new FlexSearch({
  coresearch,
  doc: {
    id: '_id',
    field: ['title', 'preacher', 'book', 'series']
  }
});

const flex = new FlexSearch({
  coresearch,
  doc: {
    id: '_id',
    field: ['title', 'searchbody', 'slug']
  }
});

export default function App() {
  const [flexindex, setFlexIndex] = useState();
  const [sermonflexindex, setSermonFlexIndex] = useState();
  const [indexData, setIndexData] = useState();
  const [mainData, setMainData] = useState();
  const [pagesData, setPagesData] = useState();
  const [mainFetch, setMainFetch] = useState(false);

  useEffect(() => {
    const allQuery = `
      {
        'menuData': ${menuQuery},
        'mainData': ${mainQuery},
        'sermonData': ${sermonQuery},
        'def': ${defQuery}
      }
    `;

    async function fetchData() {
      const result = await sanity.fetch(allQuery);
      setMainData(result);
      sermonflex.add(result.sermonData);
      setSermonFlexIndex(sermonflex);
      setMainFetch(true);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await sanity.fetch(pagesQuery);
      const idxdata = result.map(page => {
        return {
          ...page,
          slug: page.slug.current,
          searchbody: page.body
            .map(item => item.children)
            .flat()
            .map(child => (child ? child.text : ''))
            .join(' ')
        };
      });
      flex.add(idxdata);
      setIndexData(idxdata);
      setFlexIndex(flex);
      const arrayToObject = array =>
        array.reduce((obj, item) => {
          obj[item.slug.current] = item;
          return obj;
        }, {});

      const pagesObject = arrayToObject(result);
      setPagesData(pagesObject);
    }

    fetchData();
  }, [mainFetch]);

  return mainFetch === true ? (
    <ThemeProvider theme={myTheme}>
      <Main
        mainData={mainData}
        pagesData={pagesData}
        indexData={indexData}
        flexindex={flexindex}
        sermonflexindex={sermonflexindex}
      />
    </ThemeProvider>
  ) : (
    ''
  );
}
