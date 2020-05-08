import React from 'react';
import logo from './logo.svg';
import './App.css';

const BASE_URL = "https://picsum.photos/v2/list";

class App extends React.Component {
  state={
    posts:[]
  }

  componentDidMount(){
    fetch(BASE_URL)
    .then(res => res.json())
    .then(posts =>{
      this.setState({posts});
    })
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wondr Image Fetch</h1>
       <img src="./logo.svg"></img>
      </header>
      <p>
          Images Grid
          </p>
          {this.state.posts.map(post=>(
            <>
            <img src={post.download_url} width={post.width/8} height={post.height/8}/>
            </>
          ))}
    </div>

  );
}
}

export default App;
