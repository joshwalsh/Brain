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
      url: '/atoms.json',
      dataType: 'json',
      success: function(data) {
        this.setState({atoms: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/atoms.json', status, err.toString());
      }.bind(this)
    });
  },
  handleNewAtom: function(atom) {
    $.ajax({
      url: '/atoms.json',
      dataType: 'json',
      type: 'POST',
      data: {atom: atom},
      success: function(data) {
        this.fetchAtoms();
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
      <div>
        <ul className="top-bar">
          <li className="top-bar__action">
            <AtomQuickAdd onAtomSubmit={this.handleNewAtom} />
          </li>
        </ul>

        <ol className="link-list">
          {atoms}
        </ol>
      </div>
    );
  }
});
