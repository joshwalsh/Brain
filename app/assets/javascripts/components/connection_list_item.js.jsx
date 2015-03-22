var ConnectionListAtom = React.createClass({
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
          <li><a href={"/connections/" + this.props.connection.id} className='icon icon--dark icon__detach'></a></li>
        </ul>
      </li>
    )
  }
});
