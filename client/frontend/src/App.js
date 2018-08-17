import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'nodejs + react sample',
      act: 0,
      index: '',
      datas: []
    }
  }
  componentDidMount() {
    this.getUsers()
    this.refs.Name.focus();
  }
  getUsers() {
    fetch('http://localhost:5300/api/users')
      .then(response => response.json())
      .then(users => {
        console.log(users)
        this.setState({ datas: users })
      });
  }
  handleClick = (e) => {
    e.preventDefault();
    let datas = this.state.datas;
    let Name = this.refs.Name.value;
    let Detail = this.refs.Detail.value;
    if (this.state.act === 0) {
      let data = {
        ID: datas.length,
        Name: Name,
        Detail: Detail
      }
      this.addUser(data);
      datas.push(data)
    }
    else {
      let index = this.state.index
      datas[index].Name = Name
      datas[index].Detail = Detail
      let ID = index
      let data = {
        ID: ID,
        Name: Name,
        Detail: Detail
      }
      this.editUser(data, ID)
    }
    this.setState({ datas: datas, act: 0 })
    this.refs.myform.reset();
    this.refs.Name.focus();
  }
  addUser(data) {
    console.log(data)
    fetch('http://localhost:5300/api/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error(error);
    });
  }
  editUser(data, id) {
    console.log(id)
    fetch('http://localhost:5300/api/users/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error(error);
    });
  }
  deleteUser(data) {
    fetch('http://localhost:5300/api/users/' + data.ID, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: data.ID }),
    }).catch((error) => {
      console.error(error);
    });
  }
  handleDelete = i => {
    let datas = this.state.datas;
    let data = datas[i]
    this.deleteUser(data)
    datas.splice(i, 1)
    this.setState({ datas })
    this.refs.myform.reset();
    this.refs.Name.focus();
  }
  handleEdit = i => {
    console.log(i)
    let data = this.state.datas[i]
    this.refs.Name.value = data.Name
    this.refs.Detail.value = data.Detail
    this.setState({
      act: 1,
      index: i
    })
    this.refs.Name.focus();
  }
  render() {
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        <form ref="myform" className="myform">
          <input type="text" ref="Name" placeholder="enter Name" className="formField" />
          <input type="text" ref="Detail" placeholder="enter detail" className="formField" />
          <hr />
          <button className="btn btn-primary" onClick={(e) => this.handleClick(e)}>Submit</button>
        </form>
        <pre>
          {this.state.datas.map((data, i) =>
            <li key={i} className="mylist">
              {i + 1} {data.Name} {data.Detail}
              <button className="listbtn" onClick={() => this.handleEdit(i)}>Edit</button>
              <button className="listbtn" onClick={() => this.handleDelete(i)}>Delete</button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
