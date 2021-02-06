import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { fade, makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fab from "@material-ui/core/Fab";
import { KeyboardArrowUp, FilterList } from "@material-ui/icons";
import Zoom from "@material-ui/core/Zoom";
import {
  IconButton,
  useScrollTrigger,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Dialog,
} from "@material-ui/core";
import Search from "./Search";

import { connectRefinementList } from "react-instantsearch-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
  },
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 999,
  },
  title: {
    flexGrow: 1,
    display: "block",
    marginRight: theme.spacing(1),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
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
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const CustomRefinement = connectRefinementList(
  ({ items, refine, open, onClose, ...props }) => {
    const classes = useStyles();

    return (
      <Dialog onClose={onClose} open={open}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Filter By Season</FormLabel>
          <FormGroup>
            {items
              .sort((a, b) => a.label - b.label)
              .map((ele) => (
                <FormControlLabel
                  key={ele.label}
                  control={
                    <Checkbox
                      color="primary"
                      checked={ele.isRefined}
                      onChange={() => refine(ele.value)}
                      name={ele.label}
                    />
                  }
                  label={`Season ${ele.label}`}
                />
              ))}
          </FormGroup>
        </FormControl>
      </Dialog>
    );
  }
);

export default function Header({ children, ...props }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <div className={classes.title}>
            <img
              src="https://joincolossus.com/img/logo_white.14fcfdb2.png"
              style={{ height: 48, width: 48 }}
            />
          </div>
          <IconButton color="inherit" onClick={handleClick}>
            <FilterList />
          </IconButton>

          <CustomRefinement
            attribute="season"
            open={open}
            onClose={handleClose}
          />
          <Search />
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      {children}
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
