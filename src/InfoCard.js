import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    left: 25,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function InfoCard({
  series,
  title,
  summary,
  airDate,
  url,
  season,
  number,
}) {
  const classes = useStyles();
  const [year, month, day] = airDate.split("-");

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {series}
        </Typography>
        <Typography variant="h5" component="h2">
          {title} - Season {season} - Episode {number}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {month}-{day}-{year}
        </Typography>
        <Typography variant="body2" component="p">
          {summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            window.open(url, "_blank");
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
