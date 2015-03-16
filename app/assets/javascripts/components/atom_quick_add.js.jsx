var AtomQuickAdd = React.createClass({
  handleAddAtom: function (e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();

    if (!title) {
      return;
    }
    this.props.onAtomSubmit({title: title});
    React.findDOMNode(this.refs.newItem).value = '';
    return;
  },
  render: function() {
    return (
      <form onSubmit={this.handleAddAtom}>
        <input type="text" ref="title" placeholder="New Item" className="input-minimal" />
      </form>
    )
  }
});
