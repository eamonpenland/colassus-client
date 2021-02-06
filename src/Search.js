import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import SearchIcon from "@material-ui/icons/Search";
import { connectSearchBox } from "react-instantsearch-dom";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      fontFamily: theme.typography.fontFamily,
      position: "relative",
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      "& $inputInput": {
        transition: theme.transitions.create("width"),
        width: 120,
        "&:focus": {
          width: 170,
        },
      },
    },
    search: {
      width: theme.spacing(9),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 9),
    },
  }),
  { name: "AppSearch" }
);

const SearchInput = connectSearchBox(
  ({ classes, inputRef, refine, currentRefinement }) => {
    return (
      <div className={classes.root} style={{ display: "flex" }}>
        <div className={classes.search}>
          <SearchIcon />
        </div>
        <Input
          disableUnderline
          placeholder={`Search…`}
          inputProps={{
            "aria-label": "search",
          }}
          type="search"
          id="docsearch-input"
          inputRef={inputRef}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={currentRefinement}
          onChange={() => refine(inputRef.current.value)}
        />
      </div>
    );
  }
);

export default function Search() {
  const classes = useStyles();
  const inputRef = React.useRef(null);
  return <SearchInput classes={classes} inputRef={inputRef} />;
}
