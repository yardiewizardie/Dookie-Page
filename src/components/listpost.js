import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';

class ListPosts extends Component {
	state = {
		open: false,
	};

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	componentDidMount() {
		this.props.FetchPosts();
	}

	renderPosts() {
		const posts = this.props.post;

		return Object.keys(posts).map((id) => {
			const post = posts[id];
			return (
				<Link to={`/posts/${post.id}`} key={post.id}>
					<li className="btn btn-danger list-group-item blogpost container-fluid" key={id}>
						<div className="titlefont">{post.title}</div>
					</li>
				</Link>
			);
		});
	}

	render() {
		const { open } = this.state;
		return (
			<div>
				<div>
					<button className=" btn-danger edit-btn container-fluid" onClick={this.onOpenModal}>
						<i className="fa fa-pencil fa-3x" aria-hidden="true" />
					</button>
					<Modal
						open={open}
						onClose={this.onCloseModal}
						classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}
						animationDuration={1000}
					>
						<h2>What you want to do</h2>
						<div className="text-xs-left">
							<Link className="btn btn-danger ctn-btn" to="/posts/new">
								Add Post
							</Link>
						</div>
					</Modal>
				</div>

				<ul className="list-group brown">{this.renderPosts()}</ul>
			</div>
		);
	}
}

function mapstate2props(state) {
	return { post: state.post };
}

export default connect(mapstate2props, { FetchPosts })(ListPosts);