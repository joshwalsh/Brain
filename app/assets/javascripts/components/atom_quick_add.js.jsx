var AtomQuickAdd = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var title = React.findDOMNode(this.refs.title).value.trim();

    if (!title) {
      return;
    }
    this.save({title: title});
    React.findDOMNode(this.refs.title).value = '';
    return;
  },
  save: function(atom) {
    $.ajax({
      url: '/atoms.json',
      dataType: 'json',
      type: 'POST',
      data: {atom: atom},
      success: function(data) {
        this.context.router.transitionTo('atom', {atomSlug: data.slug});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/atoms.json', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="title" placeholder="New Item" className="input-minimal" />
      </form>
    )
  }
});
