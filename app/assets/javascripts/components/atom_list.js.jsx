var AtomList = React.createClass({
  getInitialState: function() {
    return {
      atoms: []
    };
  },
  componentDidMount: function() {
    this.fetchAtoms();
  },
  fetchAtoms: function() {
    $.ajax({
      url: 'api/v1/atoms.json',
      dataType: 'json',
      success: function(data) {
        this.setState({atoms: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('api/v1/atoms.json', status, err.toString());
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
      <div>
        <ol className="list-group">
          {atoms}
        </ol>
      </div>
    );
  }
});
