import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: "16",
    category: "genral",
  };
  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };

    
    document.title=`${this.props.category}-Daily Dose`
  }
   
  async componentDidMount() {
    this.props.setProgress(20)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=151764a39cf240c0ac931e8cddb1ac5d&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(50)
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100)
  }

  handlePrevClick = async () => {
    this.props.setProgress(20)
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=151764a39cf240c0ac931e8cddb1ac5d&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40)
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
    this.props.setProgress(100)
  };

  handleNextClick = async () => {
    this.props.setProgress(20)
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=151764a39cf240c0ac931e8cddb1ac5d&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      this.props.setProgress(40)
      let parsedData = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false,
      });
      this.props.setProgress(100)
    }
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center box3">Daily Dose-Top Headline on {this.props.category}</h1>
        {this.state.loading && <Spinner />}
        <div className="row text-center">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="container1 col-md-3 my-3" key={element.url}>
                  <NewsItem
                    imageUrl={element.urlToImage}
                    title={element.title ? element.title : ""}
                    description={element.description? element.description.slice(0, 80): "Not Provided by the Author"}
                    newsUrl={element.url}
                    author={element.author}
                    date = {element.publishedAt}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >  &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 15) } type="button"className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
export default News;
