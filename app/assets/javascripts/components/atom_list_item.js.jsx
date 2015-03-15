var AtomListItem = React.createClass({
  render: function() {
    return (
      <li><a href={'/atoms/' + this.props.atom.slug}>{this.props.atom.title}</a></li>
    );
  }
});
