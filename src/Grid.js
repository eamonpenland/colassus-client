import { Grid } from "mauerwerk";
import { connectHits } from "react-instantsearch-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Cell } from "./Cell";

const CustomGrid = connectHits(({ hits }) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Grid
      className="grid"
      // Arbitrary data, should contain keys, possibly heights, etc.
      data={hits}
      // Key accessor, instructs grid on how to fet individual keys from the data set
      keys={(d) => d.objectID}
      // Can be a fixed value or an individual data accessor
      heights={200}
      // Number of columns
      columns={desktop ? 4 : 1}
      // Space between elements
      margin={20}
      // Removes the possibility to scroll away from a maximized element
      lockScroll={false}
      // Delay when active elements (blown up) are minimized again
      closeDelay={200}
    >
      {(data, maximized, toggle) => (
        <Cell {...data} maximized={maximized} toggle={toggle} />
      )}
    </Grid>
  );
});

export default CustomGrid;
