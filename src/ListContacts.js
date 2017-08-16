import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from "escape-string-regexp"
import sortBy from "sort-by"
import {Link} from 'react-router-dom'

// function ListContacts (props){
//         return(
//             <ol className="contact-list">
//                 {this.props.contacts.map((contacts) => (
//                     <li key={contacts.id} className="contact-list-item">
//                         <div className="contact-avatar" style={
//                             {
//                                 backgroundImage: `url(${contacts.avatarURL})`
//                             }
//                         }/>
//
//                         <div className="contact-details">
//                             <p> {contacts.name} </p>
//                             <p> {contacts.email} </p>
//                         </div>
//
//                         <button onClick={() => this.props.onDeleteContact(contacts)} className="contact-remove">
//                             Remove
//                         </button>
//                     </li>
//                 ))}
//             </ol>
//         )
// }


class ListContacts extends Component{
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query:query.trim()})
    }

    clearQuery = () => {
        this.setState({query:''})
    }

    render(){
        const {contacts, onDeleteContact} = this.props
        const {query} = this.state

        let showingContacts
        if(query){
            const match = new RegExp(escapeRegExp(query),'i')
            showingContacts = contacts.filter((contact) => match.test(contact.name))
        }else{
            showingContacts = contacts
        }

        showingContacts.sort(sortBy('name'))

        return(
            <div className="list-contacts">
                {/*{JSON.stringify(this.state)}*/}
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        placeholder="Search contacts"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}/>

                    <Link
                        to="/create"
                        // onClick={this.props.onNavigate}
                        className="add-contact"
                    >add Contact</Link>
                </div>

                {showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now showing {showingContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}


                <ol className="contact-list">
                    {showingContacts.map((contacts) => (
                        <li key={contacts.id} className="contact-list-item">
                            <div className="contact-avatar" style={
                                {
                                    backgroundImage: `url(${contacts.avatarURL})`
                                }
                            }/>

                            <div className="contact-details">
                                <p> {contacts.name} </p>
                                <p> {contacts.email} </p>
                            </div>

                            <button onClick={() => onDeleteContact(contacts)} className="contact-remove">
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts