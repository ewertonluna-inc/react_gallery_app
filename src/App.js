import React, { Component } from 'react';
import MainNav from './Components/MainNav';
import { BrowserRouter, Route } from 'react-router-dom';
import SearchForm from './Components/SearchForm';
// import PhotoList from './Components/PhotoList';

import axios from 'axios';
import apiKey from './config';
import PhotoList from './Components/PhotoList';


class App extends Component {

  state = {
    searchedPhotos: [],
    dogPhotos: [],
    sportsPhotos: [],
    techPhotos: []
  }

  componentDidMount() {
    this.fetchDogPhotos();
    this.fetchSportsPhotos();
    this.fetchTechPhotos();
  }

  fetchData = (query) => {
    return axios
      .get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.data.photos.photo)
      .catch(error => console.log("Error fetching photos", error))
  }

  fetchDogPhotos = () => {
    this.fetchData('dogs')
      .then(photos => this.setState({dogPhotos: photos}))
  }

  fetchSportsPhotos = () => {
    this.fetchData('sports')
      .then(photos => this.setState({sportsPhotos: photos}))
  }

  fetchTechPhotos = () => {
    this.fetchData('tech')
      .then(photos => this.setState({techPhotos: photos}))
  }

  render() {
    return (
      <div className="container">
        <SearchForm submitHandler={this.handleSearchSubmit}/>

        <BrowserRouter>
          <MainNav />
          <Route path="/dogs" render={() => <PhotoList data={this.state.dogPhotos} topic="Dogs"/>} />
          <Route path="/sports" render={() => <PhotoList data={this.state.sportsPhotos} title="Sports"/>} />
          <Route path="/tech" render={() => <PhotoList data={this.state.techPhotos} title="Tech"/>} />
          <Route path="/search" render={() => <PhotoList data={this.state.searchedPhotos} title=""/>} />          
        </BrowserRouter>
    
      </div>
    );
  }
}

export default App;
