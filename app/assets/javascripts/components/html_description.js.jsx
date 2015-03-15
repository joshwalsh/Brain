var HTMLDescription = React.createClass({
  render: function() {
    var value;

    if (this.props.html.length > 0) {
      value = <div className="document" dangerouslySetInnerHTML={{__html: this.props.html}}></div>
    }

    return (
      <div>
        {value}
      </div>
    );
  }
});
