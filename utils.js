import algoliasearch from "algoliasearch/lite";
import qs from "qs";

export const indexName = "episodes";

export const searchClient = algoliasearch(
  "1YWI2BVQ37",
  "367a38b9547320528e4a4c3662b6c579"
);

export const pathToSearchState = (path) =>
  path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};

export const searchStateToURL = (searchState) =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : "";

export const createURL = (state) => `?${qs.stringify(state)}`;

export const DEFAULT_PROPS = {
  searchClient,
  indexName,
};

export const DEBOUNCE_TIME = 700;
