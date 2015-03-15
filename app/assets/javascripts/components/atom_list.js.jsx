var AtomList = React.createClass({
  getInitialState: function() {
    return {
      atoms: []
    };
  },
  componentDidMount: function() {
    $.ajax({
      url: '/atoms.json',
      dataType: 'json',
      success: function(data) {
        this.setState({atoms: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var atoms = this.state.atoms.map(function (atom) {
      return (
        <AtomListItem atom={atom} key={atom.id} />
      );
    });
    return (
      <ol className="link-list">
        {atoms}
      </ol>
    );
  }
});
