var ConnectionList = React.createClass({
  handleAddConnection: function(data) {
    var atom = { title: data.title };

    if (this.props.type == "parents") {
      var connection = { child_atom_id: this.props.atom.id, atom: atom };
    } else {
      var connection = { parent_atom_id: this.props.atom.id, atom: atom };
    }

    $.ajax({
      url: '/connections.json',
      dataType: 'json',
      type: 'POST',
      data: {connection: connection},
      success: function(data) {
        this.props.onConnectionsUpdate();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/connections.json', status, err.toString());
      }.bind(this)
    });
  },
  handleRemoveConnection: function(data) {
    var url = '/connections/' + data.connectionId + '.json';
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'DELETE',
      success: function(data) {
        this.props.onConnectionsUpdate();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var type = this.props.type;
    var thisList = this;

    var connections = this.props.connections.map(function (connection) {
      return (
        <ConnectionListAtom connection={connection} key={connection.id} type={type} onRemoveConnection={thisList.handleRemoveConnection} />
      );
    });

    return (
      <div>
        <ul className="connections-list">
          {connections}
        </ul>
        <ConnectionForm onAddConnection={this.handleAddConnection} />
      </div>
    )
  }
});
