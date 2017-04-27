import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class OneContact {
  constructor(name, phone, email, type, isfav){
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.type = type;
    this.isfav = isfav;
  }
}

class Showonecontact extends React.Component{
  render(){
    var isfav = this.props.isfav;
    var favtext= isfav ? "Favorited" : "Not Favorited"
    return (
      <div id="showUnit">
        <div id="showInfo">
          <span>{this.props.name}</span><span> - {this.props.type}</span><br/>
          <span>{this.props.phone}</span><br/>
          <span>{this.props.email}</span><br/>
          <span id="showFav">{favtext}</span><br/>
        </div>
        <div id="showButtons">
          <button id="favButton" onClick={this.props.methodFav}>{this.props.favText}</button>
          <button id="ediButton" onClick={this.props.methodEdi}>Edit</button>
          <button id="delButton" onClick={this.props.methodDel}>Delete</button>
        </div>
      </div>
    )
  }
}

class AddContact extends React.Component {
  render(){
    return (
      <div className="inputUnit">
        <label className="inputLabel">{this.props.name}: </label>
        <input type="text" name={this.props.name} value={this.props.value} onChange={this.props.method}/>
      </div>
    )
  }
}

class Contactlist extends React.Component {
  constructor(){
    super();
    this.state={
      contacts: [],
      current: {
        name: "",
        phone: "",
        email: "",
        type: "",
        isfav: false
      },
      readyToAddInfo: false,
      readyToEditIdx: null
    }
  }

  addOneContact(){
    var contact = new OneContact(this.state.current.name, this.state.current.phone, this.state.current.email, this.state.current.type, this.state.current.isfav);
    var contactsUpdated = this.state.contacts;
    contactsUpdated.push(contact);
    this.setState({
      contacts:contactsUpdated,
      readyToAddInfo: !this.state.readyToAddInfo
    })
  }

  editContact(idx){
    var contact = new OneContact(this.state.current.name, this.state.current.phone, this.state.current.email, this.state.current.type, this.state.current.isfav);
    var contactsUpdated = this.state.contacts;
    contactsUpdated[idx] = contact;
    this.setState({
      contacts:contactsUpdated,
      readyToAddInfo: !this.state.readyToAddInfo,
      readyToEditIdx: null
    })
  }

  deleteContact(idx){
    var contactsUpdated = this.state.contacts;
    contactsUpdated.splice(idx, 1);
    this.setState({
      contacts:contactsUpdated
    })
  }

  favoriteContact(idx){
    var contactsUpdated = this.state.contacts;
    contactsUpdated[idx].isfav = !contactsUpdated[idx].isfav;
    this.setState({
      contacts:contactsUpdated
    })
  }

  changeValue (stateName, event){
    let currentUpdated = this.state.current;
    currentUpdated[stateName] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      current: currentUpdated
    })
  }

  changeReadyToAddInfo (){
    this.setState({
      readyToAddInfo: !this.state.readyToAddInfo
    })
  }

  changeReadyToEdit(idx){
    this.setState({
      readyToAddInfo: !this.state.readyToAddInfo,
      readyToEditIdx: idx
    })
  }

  render(){
    var contacts = this.state.contacts;
    var inputCategories = [
      {
        name: "NAME",
        value: this.state.current.name,
        method: (event) => this.changeValue("name", event)
      },
      {
        name: "TYPE",
        value: this.state.current.type,
        method: (event) => this.changeValue("type", event)
      },
      {
        name: "PHONE",
        value: this.state.current.phone,
        method: (event) => this.changeValue("phone", event)
      },
      {
        name: "EMAIL",
        value: this.state.current.email,
        method: (event) => this.changeValue("email", event)
      }
    ]

    var submitButtonText = this.state.readyToEditIdx === null? "Add this contact" : "Edit this contact"

    var addContactForm = (
      <div id="addForm">
        {inputCategories.map((category, idx)=>
          <AddContact key={idx} name={category.name} value={category.value} method={category.method}/>
        )}
        <div id="checkboxDiv">
          <input type="checkbox" name="isfav" checked={this.state.current.isfav} onChange={(event) => this.changeValue("isfav", event)}/><label>Favorite this contact</label>
        </div>
        <button id="submitButton" onClick={()=>this.state.readyToEditIdx === null? this.addOneContact() : this.editContact(this.state.readyToEditIdx)}>{submitButtonText}</button>
      </div>
    )

    var addContactButton = (
      <button id="addButton" onClick={()=>this.changeReadyToAddInfo()}>add a contact</button>
    )

    return (
      <div id="wrapper">
        <div id="title">Your Contact Book</div>
        {this.state.readyToAddInfo ? null : addContactButton}
        {this.state.readyToAddInfo ? addContactForm : null}
        <div id="show">
          {contacts.length>0 ? contacts.map((contact, idx)=>
            <Showonecontact key={idx} name={contact.name} phone={contact.phone} email={contact.email} type={contact.type} isfav={contact.isfav} favText={contact.isfav ? "Unfavorite" : "Favorite"} methodFav={()=>this.favoriteContact(idx)} methodDel={()=>this.deleteContact(idx)} methodEdi={()=>this.changeReadyToEdit(idx)}/>
          ) : <p id="noContact">No contacts yet</p>}
        </div>
      </div>
    )
  }
}

ReactDOM.render( <Contactlist/>,
  document.getElementById('root')
);
