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
        <a href={'/atoms/' + atom.slug}>{atom.title}</a>
        <ul className="iconic-actions">
          <li><a href={"/connections/" + this.props.connection.id} className='icon icon--dark icon__connection'></a></li>
          <li><a href={"/connections/" + this.props.connection.id} className='icon icon--dark icon__detach'></a></li>
        </ul>
      </li>
    )
  }
});
