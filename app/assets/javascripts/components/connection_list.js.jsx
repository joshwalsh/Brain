var ConnectionList = React.createClass({
  render: function() {
    var type = this.props.type;
    var connections = this.props.connections.map(function (connection) {
      return (
        <ConnectionListAtom connection={connection} key={connection.id} type={type} />
      );
    });
    return (
      <ul className="connections-list">
        {connections}
      </ul>
    )
  }
});
