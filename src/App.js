import logo from './logo.svg';
import './App.css';
import React from "react";

// const testData = [
//   {image:"https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",name:"Sivashangari" , company:"Thoughtworks"},
//   {name:"Sivaranjini",company: "TCS",image:"https://images.unsplash.com/photo-1593642533144-3d62aa4783ec?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"}
// ];
const testData = [];

const AppIntro = () => {
  return (<h3>Enter Github name of user to retriev the information.</h3>)
}

const CardList = (props) => (
  <div>
  {props.data.map((data,index) => <Card key={index} {...data}></Card>)}
  </div>
)

class Form extends React.Component {
  state = {name : ''};
  handleSubmit = async (event) =>{
    event.preventDefault();
    const apiResponse = await fetch(`https://api.github.com/users/${this.state.name}`);
    const jsonResponse = await apiResponse.json();
    this.props.onSubmit(jsonResponse);
  }
  render() {
   return ( <form onSubmit={this.handleSubmit}>
      <input className="input-box" type="text" onChange={(event)=>{this.setState({name: event.target.value})}}value={this.state.name}placeholder="Github Name"></input>
      &nbsp;
      <button className="primary-button">Add User</button>
    </form>
   )
  }
}

class Card extends React.Component{
    render(){
      const data = this.props;
        return(<div className="profile-card" id="card">
          <img style={{width:"100px"}}src={data.avatar_url}/>
            <div id="info" className="profile-container">
            <div id="name" style={{fontSize:'125%'}}>Name : {data.name}</div>
            <div id="github_id">ID: {data.id}</div>
            <div id="company">Company: {data.company}</div>
            <div id="url">Github Url: {data.url}</div>
            </div>
        </div>);
    }
}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data : testData
    }
  }
   updateData = (profileData) => {
     console.log("profile data ==>",profileData);
     this.setState((prevState) => ({   
       data : [...prevState.data,profileData]
     }));
  }
  render(){
    return (<div style={{paddingLeft:'500px',paddingTop:'50px'}}><AppIntro/><Form onSubmit={this.updateData}/><CardList data={this.state.data}/></div>);
  }

}

 export default App;
