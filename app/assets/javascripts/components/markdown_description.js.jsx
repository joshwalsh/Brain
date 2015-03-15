var MarkdownDescription = React.createClass({
  render: function() {
    var value;

    if (this.props.html.length > 0) {
      var converter = new Showdown.converter();

      var markdown = converter.makeHtml(this.props.html);

      value = <div className="document" dangerouslySetInnerHTML={{__html: markdown}}></div>
    }

    return (
      <div>
        {value}
      </div>
    );
  }
});
