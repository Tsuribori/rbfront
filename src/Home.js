import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';

const styles = (theme) => ({
  textBox: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 5,
  },
  gridBox: {
    paddingTop: theme.spacing.unit * 3,
  },
})

function Home(props) {

  const classes = props.classes

  const facts = [
    'Respects your privacy.',
    'Free speech without an asterisk.',
    'Discuss anything.',
    'No rules.'
  ]

  return (
    <Container className={classes.textBox}>
    
      <Typography
        variant="h3"
        component="h3"
      >
        Anonymous private discussion.
      </Typography>

      <Typography
        variant="subtitle"
        component="h4"
      >
        Free speech as in freedom.
      </Typography>

      <Grid
        container
        justify="center"
        className={classes.gridBox}
      >
        <List>
          { facts.map((fact, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckCircleIcon />
              </ListItemIcon>
              <ListItemText>
                {fact}
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>

    </Container>
  )
}

export default withStyles(styles)(Home);
