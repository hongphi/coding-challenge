import { Router, Route, IndexRoute, browserHis } from 'react-router';

export default(
    <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="stuff" component={Stuff}>
        <Route path="i-want" component={StuffIWant} />
      </Route>
      <Route path="contact" component={Contact} />
    </Route>
  </Router>
);