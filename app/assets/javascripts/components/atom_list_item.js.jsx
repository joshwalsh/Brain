var AtomListItem = React.createClass({
  render: function() {
    return (
      <li>
        <Link to="atom" params={{atomSlug: this.props.atom.slug}}>{this.props.atom.title}</Link>
      </li>
    );
  }
});
