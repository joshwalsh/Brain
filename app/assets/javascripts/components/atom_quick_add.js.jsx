var AtomQuickAdd = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();

    if (!title) {
      return;
    }
    this.props.onAtomSubmit({title: title});
    React.findDOMNode(this.refs.title).value = '';
    return;
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="title" placeholder="New Item" className="input-minimal" />
      </form>
    )
  }
});