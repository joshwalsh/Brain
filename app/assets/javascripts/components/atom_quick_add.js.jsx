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
      url: 'api/v1/atoms.json',
      dataType: 'json',
      type: 'POST',
      data: {atom: atom},
      success: function(data) {
        this.context.router.transitionTo('atom', {atomSlug: data.slug});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/v1/atoms.json', status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <input className="form-control mr-sm-2" type="text" ref="title" placeholder="New Item" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Create</button>
      </form>
    )
  }
});
