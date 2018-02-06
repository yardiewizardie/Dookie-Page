import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FetchPosts2, deletePost } from '../actions';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class PostShow extends Component {
	componentDidMount() {
		//const posts = this.props.home;
		const { id } = this.props.match.params;
		this.props.FetchPosts2(id);
	}

	onDeleteClick() {
		const { id } = this.props.match.params;

		this.props.deletePost(id, () => {
			this.props.history.push('/posts');
		});
	}
	render() {
		const { post } = this.props;

		if (!post) {
			return <div className="cont titlefont">Loading...</div>;
		}

		return (
			<div>
				<Helmet>
					<style>
						{
							'body { background: url("https://cdn-images-1.medium.com/max/2000/1*7v_75ZGg1CTmWAw1rEgMHQ.jpeg"); }'
						}
					</style>
				</Helmet>
				<div className="cont">
					<h3 className="titlefont">{post.title}</h3>
					<p>Categories: {post.categories}</p>
					<p className="font-para">{post.content}</p>
				</div>
				<div className="col-md-6">
					<button
						className=" btn-danger edit-btn leftbtn container-fluid"
						onClick={this.onDeleteClick.bind(this)}
					>
						<i className="fa fa-trash-alt fa-2x" aria-hidden="true" />
					</button>
				</div>
				<div className="col-md-6">
					<Link className="btn-danger edit-btn rightbtn container-fluid" to="/posts">
						<i className="fa fa-arrow-left fa-2x" aria-hidden="true" />
					</Link>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ post }, ownProps) {
	return { post: post[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { FetchPosts2, deletePost })(PostShow);
