import React, { useState } from "react";
import { withRouter } from "next/router";
import { findResultsState } from "react-instantsearch-dom/server";
import App from "../src/App";
import {
  DEFAULT_PROPS,
  pathToSearchState,
  searchStateToURL,
  createURL,
  DEBOUNCE_TIME,
} from "../utils";

// https://codesandbox.io/s/nextjs-instantsearch-ohphp?file=/pages/index.js
// https://github.com/algolia/react-instantsearch/tree/master/examples/next

const Page = (props) => {
  const { router, page, seoProps, ...restProps } = props;

  const setStateId = React.useRef();
  const [searchState, setSearchState] = useState(
    pathToSearchState(router.asPath)
  );

  const onSearchStateChange = (nextSearchState) => {
    clearTimeout(setStateId);

    setStateId.current = setTimeout(() => {
      const href = searchStateToURL(searchState);

      router.push(href, href, {
        shallow: true,
      });
    }, DEBOUNCE_TIME);

    setSearchState(nextSearchState);
  };

  return (
    <>
      <App
        {...DEFAULT_PROPS}
        searchState={searchState}
        resultsState={restProps.resultsState}
        onSearchStateChange={onSearchStateChange}
        createURL={createURL}
      />
    </>
  );
};

Page.getInitialProps = async (context) => {
  const { req, res, query, ...restProps } = context;

  const searchState = pathToSearchState(restProps.asPath);
  const resultsState = await findResultsState(App, {
    ...DEFAULT_PROPS,
    searchState,
  });

  return {
    resultsState,
    searchState,
  };
};

export default withRouter(Page);
