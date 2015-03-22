var AtomDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      id: '',
      title: 'loading...',
      influence: '',
      slug: '',
      description: '',
      parents: [],
      children: [],
      siblings: []
    };
  },
  componentDidMount: function() {
    this.fetchAtom();
  },
  componentWillReceiveProps: function() {
    this.fetchAtom();
  },
  fetchAtom: function() {
    var url = '/atoms/' + this.context.router.getCurrentParams().atomSlug + '.json'

    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data) {
        this.setState(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },
  saveConnection: function(atom, connection) {
    connection.atom = atom;

    $.ajax({
      url: '/connections.json',
      dataType: 'json',
      type: 'POST',
      data: {connection: connection},
      success: function(data) {
        this.fetchAtom();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/atoms.json', status, err.toString());
      }.bind(this)
    });
  },
  handleNewParent: function(data) {
    var atom = { title: data.title };
    var connection = { child_atom_id: this.state.id };

    this.saveConnection(atom, connection);
  },
  handleNewChild: function(data) {
    var atom = { title: data.title };
    var connection = { parent_atom_id: this.state.id };

    this.saveConnection(atom, connection);
  },
  render: function() {
    var siblings = this.state.siblings.map(function (atom) {
      return (
        <AtomListItem atom={atom} key={atom.id} />
      );
    });

    return (
      <div>
      <ul className="top-bar">
        <li><a href="/atoms" className="button button--minimal">View All</a></li>
      </ul>
        <div className="mast">
          <h1 className="mast__title">{ this.state.title }</h1>
          <div className="mast__divider">
            <p>Influences <strong>{ this.state.influence }%</strong> of brain.</p>

            <ul className="mast__actions">
              
            </ul>
          </div>
        </div>

        <MarkdownDescription html={this.state.description} />

        <div className="row">
          <div className="col-4">
            <div className="l-section">
              <h2 className="list-header">Parents:</h2>
              <ConnectionList connections={this.state.parents} type="parents" />
              <ConnectionForm onAddConnection={this.handleNewParent} />
            </div>
          </div>
          <div className="col-4">
            <div className="l-section">
              <h2 className="list-header">Siblings:</h2>
              <ul className="connections-list">
                {siblings}
              </ul>
            </div>
          </div>
          <div className="col-4">
            <div className="l-section">
              <h2 className="list-header">Children:</h2>
              <ConnectionList connections={this.state.children} type="children" />
              <ConnectionForm onAddConnection={this.handleNewChild} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
