import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
	render() {
		return (
			<div>
				<header className="mainHeader">
					<h1>Noted</h1>
					<nav>
						<a href="">Add New Notes</a>
					</nav>
				</header>
				<section className="notes">
				</section>
				<aside className="sidebar">
					<form action="">
						<h3>Add New Notes</h3>
						<div className="close-button">
							<i className="fa fa-times"></i>
						</div>
						<label htmlFor="note-title">Title:</label>
						<input type="text" name="note-title"/>
						<label htmlFor="note-text">Text:</label>
						<textarea name="note-text"></textarea>
						<input type="submit" value="Add New Note"/>
					</form>
				</aside>
			</div>
			)
	}
}

ReactDom.render(<App/>,document.getElementById('app'))