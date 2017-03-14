import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notesCard.js'

const config = {
	apiKey: "AIzaSyAgDokIDheSe7JvVbNZACK34G6oofowZ6c",
	authDomain: "noted-cf054.firebaseapp.com",
	databaseURL: "https://noted-cf054.firebaseio.com",
	storageBucket: "noted-cf054.appspot.com",
	messagingSenderId: "1029738664992"
 };
 firebase.initializeApp(config);

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			notes: []
		}
		this.showSidebar = this.showSidebar.bind(this);
		this.addNote =  this.addNote.bind(this);
		this.showCreate = this.showCreate.bind(this);
		this.createUser = this.createUser.bind(this);
		this.showLogin = this.showLogin.bind(this);
		this.loginUser = this.loginUser.bind(this);
	}
	componentDidMount() {
		firebase.database().ref().on('value', (res) => {
			const userData = res.val();
			const dataArray = [];
			for(let key in userData) {
				userData[key].key = key;
				dataArray.push(userData[key])
			}
			this.setState({
				notes:dataArray
			})
		})
	}
	showSidebar(e){
		e.preventDefault();
		this.sideBar.classList.toggle('show')
	}
	addNote(e) {
		e.preventDefault();
		const note = {
			title: this.noteTitle.value,
			text: this.noteText.value
		};
		
		const dbRef = firebase.database().ref();

		dbRef.push(note);
		
		this.noteTitle.value = "";
		this.noteText.value = "";
		this.showSidebar(e);
	}
	removeNote(noteId) {
		const dbRef = firebase.database().ref(noteId);
		dbRef.remove();
	}
	showCreate(e) {
		e.preventDefault();
		this.overlay.classList.toggle('show')
		this.createUserModal.classList.toggle('show')
	}
	createUser(e) {
		e.preventDefault();
		// Check the passwords match
		// if so we want to create user
		const email = this.createEmail.value;
		const password = this.createPassword.value;
		const confirm = this.confirmPassword.value;
		if (password === confirm){
			firebase.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				this.showCreate(e);
			})
			.catch((err) => {
				alert(err, message)
			})
		}
		else {
			alert('Passwords must match')
		}
	}
	showLogin(e) {
		e.preventDefault();
		this.overlay.classList.toggle('show')
		this.loginModal.classList.toggle('show')
	}
	loginUser(e) {
		e.preventDefault();
		const email = this.userEmail.value;
		const password = this.userPassword.value;
		firebase.auth()
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				this.showLogin(e);
			})
			.catch((err) => {
				aler(err.message);
			})
	}
	render() {
		return (
			<div>
				<header className="mainHeader">
					<h1>Noted</h1>
					<nav>
						<a href="" onClick={this.showSidebar}>Add New Notes</a>
						<a href="" onClick={this.showCreate}>Create Account</a>
						<a href="" onClick={this.showLogin}>Login</a>
					</nav>
				</header>
				<div className="overlay" ref={ref => this.overlay = ref}></div>
				<section className="notes">
					{this.state.notes.map((note, i) => {
						return (
							<NoteCard note={note} key={`note-${i}`} removeNote={this.removeNote}/>
						)
					}).reverse()}
				</section>
				<aside className="sidebar" ref={ref => this.sideBar = ref}>
					<form onSubmit={this.addNote}>
						<h3>Add New Notes</h3>
						<div className="close-btn" onClick={this.showSidebar}>
							<i className="fa fa-times"></i>
						</div>
						<label htmlFor="note-title">Title:</label>
						<input type="text" name="note-title" ref={ref => this.noteTitle = ref }/>
						<label htmlFor="note-text">Text:</label>
						<textarea name="note-text" ref={ref => this.noteText = ref}></textarea>
						<input type="submit" value="Add New Note"/>
					</form>
				</aside>

				<div className="loginModal modal" ref={ref => this.loginModal = ref}>
					<div className="close" onClick={this.showLogin} >
						<i className="fa fa-times"></i>
					</div>
				<form action="" onSubmit={this.loginUser}>
				<div>
					<input type="text" name="email" placeholder="Email Login" ref={ref => this.userEmail = ref}/>
				</div>
				<div>
					<input type="password" placeholder="Enter Password" ref={ref => this.userPassword = ref}/>
				</div>
				<div>
					<input type="submit" value="Login"/>
				</div>
				</form>
				</div>

				<div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
					<div className="close" onClick={this.showCreate}>
						<i className="fa fa-times"></i>
					</div>
					<form action="" onSubmit={this.createUser}>
					<div>
						<input type="text" name="createEmail" placeholder="Your Email" ref={ref => this.createEmail = ref}/>
					</div>
					<div>
						<input type="password" name="createPassword" placeholder="Create Password" ref={ref => this.createPassword = ref}/>
					</div>
					<div>
						<input type="password" name="confirmPassword" placeholder="Confirm Password" ref={ref => this.confirmPassword = ref}/>
					</div>
					<div>
						<input type="submit" value="Create"/>
					</div>
					</form>
				</div>
			</div>
			)
	}
}

ReactDom.render(<App/>,document.getElementById('app'))