import React, { Component } from 'react';
import MainNav from './Components/MainNav';
import {
  BrowserRouter, 
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import SearchForm from './Components/SearchForm';
import PhotoList from './Components/PhotoList';
import NotFound from './Components/NotFound';

import axios from 'axios';
import apiKey from './config';



class App extends Component {

  state = {
    searchedPhotos: [],
    dogPhotos: [],
    sportsPhotos: [],
    techPhotos: [],
    loading: true
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
      .then(photos => this.setState({dogPhotos: photos, loading: false}))
  }

  fetchSportsPhotos = () => {
    this.fetchData('sports')
      .then(photos => this.setState({sportsPhotos: photos, loading: false}))
  }

  fetchTechPhotos = () => {
    this.fetchData('tech')
      .then(photos => this.setState({techPhotos: photos, loading: false}))
  }

  fetchSearchedPhotos = (query) => {
    this.setState({loading: true})
    this.fetchData(query)
      .then(photos => this.setState({searchedPhotos: photos, loading:false}))
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <SearchForm handleSearch={this.fetchSearchedPhotos} />
          <MainNav />
          {
            (this.state.loading) 
            ? <p>Loading...</p> 
            : 
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/dogs"/>} />
                <Route path="/dogs" render={() => <PhotoList data={this.state.dogPhotos} topic="Dogs"/>} />
                <Route path="/sports" render={() => <PhotoList data={this.state.sportsPhotos} topic="Sports"/>} />
                <Route path="/tech" render={() => <PhotoList data={this.state.techPhotos} topic="Tech"/>} />
                <Route exact path="/search" render={() => <h2>Please, submit something in the search field.</h2>} />
                <Route path="/search/:search" render={() => <PhotoList data={this.state.searchedPhotos} topic="Seached"/>} />
                <Route component={NotFound} />
              </Switch>
          }
          </BrowserRouter>
          
    
      </div>
    );
  }
}

export default App;
