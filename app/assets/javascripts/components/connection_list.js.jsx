var ConnectionList = React.createClass({
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
      <ul className="connections-list">
        {connections}
      </ul>
    )
  }
});
