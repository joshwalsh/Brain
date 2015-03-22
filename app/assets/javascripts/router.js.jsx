var Router = ReactRouter;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="atom" path="atoms/:atomSlug" handler={AtomDetail}/>
    <DefaultRoute handler={AtomList}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
