//component for liberal sources
import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ArticleTile from "./articleTile.js";
import ActionBar from "./actionbar.js";

const styles = theme => ({
  paper1: {
    height: 120,
    width: 800,
    padding: 8
  }
});

class LiberalSources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //output will hold the article results that will be rendered
      output: [],
      //sources holds the api abbreviations associated with each news outlet
      sources: [
        { abrv: "the-new-york-times" },
        { abrv: "the-washington-post" },
        { abrv: "politico" },
        { abrv: "cnn" },
        { abrv: "abc-news" },
        { abrv: "the-economist" },
        { abrv: "the-huffington-post" },
        { abrv: "msnbc" }
      ]
    };
  }

  //re-call componentDidMount to do a new search on results page
  refreshPage = e => {
    e.preventDefault();
    this.componentDidMount();
  };

  componentDidMount() {
    //desiredArticles stores the results pulled from the large array for each news outlet
    let desiredArticles = [];
    //iterate through each news outlet and make the api call
    for (let i = 0; i < this.state.sources.length; i++) {
      let outlet = this.state.sources[i];
      //api call to get articles with provided topic
      axios
        .get(
          "https://newsapi.org/v2/everything?q=" +
            this.props.topic.replace("#", "") +
            "&sources=" +
            outlet.abrv +
            "&apiKey=" +
            this.props.apiKey
        )
        .then(response => {
          //store array of all articles from an outlet
          let allOutletArt = response.data.articles;
          //return null if no articles are returned by api call
          if (allOutletArt[0] === undefined || allOutletArt[1] === undefined) {
            return null;
          }
          //push the first two articles for an outlet to desiredArticles array
          desiredArticles.push(allOutletArt[0]);
          desiredArticles.push(allOutletArt[1]);
          this.setState({ output: desiredArticles });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    return (
      <div>
        <ActionBar
          topic={this.props.topic}
          option={this.props.option}
          updateTopic={this.props.updateTopic}
          updateOption={this.props.updateOption}
          refreshPage={this.refreshPage}
        />
        <br />
        <center>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              {this.state.output.map(article => (
                <ArticleTile article={article} />
              ))}
            </Grid>
          </Grid>
        </center>
      </div>
    );
  }
}

export default withStyles(styles)(LiberalSources);
