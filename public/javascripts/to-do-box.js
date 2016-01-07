// - ToDoView
//   - ToDoItemsTable
//    var ToDoBox = React.createClass({
//        render: function() {
//            return (
//                <div className="toDoBox">
//                    Hello, world! I am a ToDoBox.
//                </div>
//            );
//        }
//    })
var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          this.setState( {data: JSON.parse(req.response)});
        }
        else {
          console.error(this.props.url, req.status, req.statusText);
        }
      }
    }.bind(this);
    req.open('GET', this.props.url);
    req.send();
  },
  handleCommentSubmit: function(comment) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          this.setState( {data: JSON.parse(req.response)});
        }
        else {
          console.error(this.props.url, req.status, req.statusText);
        }
      }
    }.bind(this);
    req.open('POST', this.props.url);
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(comment));
  },
  // getInitialState() executes exactly once during the lifecycle of the component and sets up the initial state of the component.
  getInitialState: function() {
    return { data:[{id: 1, author: "Pete Hunt", text: "This is one comment"}] };
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});
var CommentList = React.createClass({
  render: function() {
    var commentNotes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNotes}
      </div>
    );
  }
});
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000}/>,
  document.getElementById('content')
);