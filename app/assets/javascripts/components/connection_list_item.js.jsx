var ConnectionListAtom = React.createClass({
  handleClickedRemove: function() {
    this.props.onRemoveConnection({connectionId: this.props.connection.id});
  },
  render: function () {
    var atom;
    if (this.props.type == "parents") {
      atom = this.props.connection.parent;
    } else {
      atom = this.props.connection.child;
    }

    return (
      <li>
        <Link to="atom" params={{atomSlug: atom.slug}}>{atom.title}</Link>
        <ul className="iconic-actions">
          <li><Link to="connection" params={{connectionId: this.props.connection.id}} className='icon icon--dark icon__connection'></Link></li>
          <li><a className='icon icon--dark icon__detach' onClick={this.handleClickedRemove}></a></li>
        </ul>
      </li>
    )
  }
});
