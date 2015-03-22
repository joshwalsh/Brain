var ConnectionDetail = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  getInitialState: function() {
    return {
      title: 'Loading...',
      id: '',
      parent: {
        slug: ''
      },
      child: {
        slug: ''
      },
      description: ''
    }
  },
  componentDidMount: function() {
    this.fetchComponent();
  },
  componentWillReceiveProps: function() {
    this.fetchComponent();
  },
  fetchComponent: function() {
    var url = '/connections/' + this.context.router.getCurrentParams().connectionID + '.json'

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
  render: function() {
    return (
      <div>
        <div className="mast">
          <h1 className="mast__title">{ this.state.title }</h1>
          <div className="mast__divider">
            <p>&nbsp;</p>
            <ul className="mast__actions">

            </ul>
          </div>
        </div>

        <ul>
          <li><Link to="atom" params={{atomSlug: this.state.parent.slug}}>{ this.state.parent.title }</Link></li>
          <li><Link to="atom" params={{atomSlug: this.state.child.slug}}>{ this.state.child.title }</Link></li>
        </ul>

        <MarkdownDescription html={this.state.description} />
      </div>
    )
  }
});
