var AtomQuickAdd = React.createClass({
  handleAddAtom: function (e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.newItem).value.trim();

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
        <input type="text" ref="newItem" placeholder="New Item" className="input-minimal" autocomplete="off" />
      </form>
    )
  }
});
