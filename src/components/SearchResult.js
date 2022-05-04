import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const SearchResult = ({ dataElement }) => {
  const classes = useStyles();
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  // const bull = <span className={classes.bullet}>•</span>;
  console.log({ movie: dataElement });
  return (
    <Card style={{ margin: "10px 0" }} className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <a href={dataElement["_source"]["url"]}>Twitter</a>
        </Typography>
        <Typography variant="h5" component="h2">
          {dataElement.Title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {dataElement["_source"]["text"]}
        </Typography>
        <Typography variant="body2" component="p">
          👍 {dataElement["_source"]["like_count"]}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <a href={dataElement.Pageurl} target="_blank" rel="noopener noreferrer" ><Button size="small">Learn More</Button></a>
      </CardActions>
    </Card>
  );
};

export default SearchResult;
