import React from "react";
import { InstantSearch } from "react-instantsearch-dom";
import Header from "./Header";
import Grid from "./Grid";

const SearchApp = ({
  indexName,
  searchClient,
  searchState,
  resultsState,
  ...restProps
}) => {
  return (
    <div className="main">
      <InstantSearch
        indexName={indexName}
        searchClient={searchClient}
        searchState={searchState}
        resultsState={restProps.resultsState}
        onSearchParameters={restProps.onSearchParameters}
        onSearchStateChange={restProps.onSearchStateChange}
        createURL={restProps.createURL}
        {...restProps}
      >
        <Header>
          <Grid />
        </Header>
      </InstantSearch>
    </div>
  );
};

export default SearchApp;
