import React, { Component } from "react";
import Gif from "./Gif"
import loader from "./images/loader.svg";

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

const Header = () => (
  <div className="header grid">
    <h1 className="title">Jiffy</h1>
  </div>
);

const UserHint = ({ loading, hintText }) => (
  <div className="user-hint">
    {loading ? (
      <img className="block mx-auto" src={loader} alt="loading state" />
    ) : (
      hintText
    )}
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      hintText: "",
      gif: null,
      gifs: []
    };
  }

  searchGiphy = async searchTerm => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=3n9MYXQNqASCZodNQ6fyqAtVgFLWop7I&q=${searchTerm}&limit=100&offset=0&rating=G&lang=en`
      );
      const { data } = await response.json();
      const randomGif = randomChoice(data);

      this.setState((prevState, props) => ({
        ...prevState,
        gif: randomGif,
        gifs: [...prevState.gifs, randomGif]
      }));
    } catch (error) {}
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: value,
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ""
    }));
  };

  handleKeyPress = event => {
    const { value } = event.target;
    if (value.length > 2 && event.key === "Enter") {
      this.searchGiphy(value);
    }
  };

  render() {
    // same as searchTerm = this.state.searchTerm
    const { searchTerm, gifs } = this.state;
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {gifs.map(gif => (
            <Gif {...gif} />
          ))}
          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={searchTerm}
          />
        </div>
        {/*Pass user hint everyhing in state using a spread */}
        <UserHint {...this.state} />
      </div>
    );
  }
}

export default App;
