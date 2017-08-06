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
  updateAtom: function() {
    var url = '/atoms/' + this.context.router.getCurrentParams().atomSlug + '.json'
    var controller = this;

    delete this.state.isEditing; // Only to remove from state before sending to API

    $.ajax({
      url: url,
      type: 'PUT',
      data: {atom: this.state},
      success: function(data) {
        controller.context.router.transitionTo('atom', {atomSlug: data.slug});
      }
    });

    this.setState({isEditing: false});
  },
  deleteAtom: function() {
    if (confirm("Are you sure?")) {
      var url = '/atoms/' + this.context.router.getCurrentParams().atomSlug + '.json'

      $.ajax({
        url: url,
        dataType: 'json',
        type: 'DELETE',
        success: function(data) {
          this.context.router.transitionTo('/');
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(url, status, err.toString());
        }.bind(this)
      });
    }
  },
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleDescriptionChange: function(e) {
    this.setState({description: e.target.value});
  },
  toggleEditor: function(e) {
    this.setState({isEditing: !this.state.isEditing});
  },
  render: function() {
    var siblings = this.state.siblings.map(function (atom) {
      return (
        <AtomListItem atom={atom} key={atom.id} />
      );
    });

    return (
      <div>
        <div className="mast">
          <h1 className="mast__title"><input type="text" className="editableTitle" value={ this.state.title } onChange={ this.handleTitleChange } onBlur={ this.updateAtom } /></h1>
          <div className="mast__divider">
            <p>Influences <strong>{ this.state.influence }%</strong> of brain.</p>

            <ul className="mast__actions">
              <li><a className="icon icon--light icon__edit" onClick={this.toggleEditor}></a></li>
              <li><a className="icon icon--light icon__trash" onClick={this.deleteAtom}></a></li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <div className="l-section">
              <h2 className="list-header">Parents:</h2>
              <ConnectionList atom={this.state} connections={this.state.parents} onConnectionsUpdate={this.fetchAtom} type="parents" />
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
              <ConnectionList atom={this.state} connections={this.state.children} onConnectionsUpdate={this.fetchAtom} type="children" />
            </div>
          </div>
        </div>

        <MarkdownDescription html={this.state.description} />

        {this.state.isEditing ? <textarea value={ this.state.description } onChange={ this.handleDescriptionChange } onBlur={ this.updateAtom } /> : null }
      </div>
    );
  }
});
