import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


function coverTime(unix_timestamp) {
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
  var hours = date.getHours();
// Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
  var formattedTime = date + ':' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return date.toString();
}

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
  // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  // const bull = <span className={classes.bullet}>•</span>;
  // console.log({ movie: dataElement });
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
          👍 {dataElement["_source"]["like_count"]} <br />
          📣 {dataElement["_source"]["retweet_count"]} <br />
          📅 {coverTime(dataElement["_source"]["created_at"])} <br />
        </Typography>
      </CardContent>
      <CardActions>
        <a href={dataElement["_source"]["url"]} target="_blank" rel="noopener noreferrer" ><Button size="small">Learn More</Button></a>
      </CardActions>
    </Card>
  );
};

export default SearchResult;
