import React from 'react';
import youtube from './api/youtube';
import { Grid, requirePropFactory } from '@material-ui/core';
import { SearchBar, VideoDetail, VideoList } from './components/index';



class App extends React.Component{
    state = {
        videos: [],
        selectedVideo: null,
    }


    handleSubmit = async (searchTerm) => {
        require('dotenv').config();

        const response = await youtube.get('search', {
            params: {
                part: 'snippet',
                maxResults: 5,
                key: process.env.REACT_APP_API_KEY,
                q: searchTerm
            }
        });
        
        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video })
    }


    render(){
        return(
            <Grid container justify='center' spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit}/>
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={this.state.selectedVideo}/>
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App;