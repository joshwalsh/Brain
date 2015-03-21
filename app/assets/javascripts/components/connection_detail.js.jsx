var ConnectionDetail = React.createClass({
  getInitialState: function() {
    return {
      title: 'Loading...',
      id: '',
      parent: { },
      child: { },
      description: ''
    }
  },
  componentDidMount: function() {
    this.fetchComponent();
  },
  fetchComponent: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
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
              <li><a href={'/connections/' + this.state.id + '/edit'} className='icon icon--light icon__edit'></a></li>
              <li><a href={'/connections/' + this.state.id } className='icon icon--light icon__trash'></a></li>
            </ul>
          </div>
        </div>

        <ul>
          <li><a href={'/atoms/' + this.state.parent.slug }>{ this.state.parent.title }</a></li>
          <li><a href={'/atoms/' + this.state.child.slug }>{ this.state.child.title }</a></li>
        </ul>

        <MarkdownDescription html={this.state.description} />
      </div>
    )
  }
});
