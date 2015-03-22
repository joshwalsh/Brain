var App = React.createClass({
  render: function () {
    return (
      <div>
        <ul className="top-bar">
          <li className="top-bar__action">
            <AtomQuickAdd onAtomSubmit={this.handleQuickAdd} />
          </li>
          <li><Link to="/" className="button button--minimal">View All</Link></li>
        </ul>

        <RouteHandler />
      </div>
    );
  }
});
