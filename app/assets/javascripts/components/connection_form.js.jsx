var ConnectionForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();

    if (!title) {
      return;
    }

    this.props.onAddConnection({title: title});
    React.findDOMNode(this.refs.title).value = '';
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="title" className="input-list-add" />
      </form>
    )
  }
});
