var Router = ReactRouter;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="atom" path="atoms/:atomSlug" handler={AtomDetail}/>
    <Route name="connection" path="connections/:connectionId" handler={ConnectionDetail}/>
    <DefaultRoute handler={AtomList}/>
  </Route>
);

Router.run(routes, function (Handler) {
  ReactDOM.render(<Handler/>, document.body);
});
