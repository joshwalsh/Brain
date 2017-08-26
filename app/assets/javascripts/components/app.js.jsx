var App = React.createClass({
  render: function () {
    return (
      <div>
        <nav className="navbar navbar-light bg-faded">
          <AtomQuickAdd onAtomSubmit={this.handleQuickAdd} />
        </nav>

        <RouteHandler />
      </div>
    );
  }
});
