import React from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import Users from "./Users";
import Exams from "./Exams";
import Home from "./Home";
import AdManager from "./AdManager";
import Interviews from "./Interviews";
import Settings from "./Settings";
import Students from "./Students";
import SuggestionManager from './SuggestionManager';

function Routing() {
  return (
    <div>
      <Switch>
        <Route exact path='/app'>
          <Redirect to="/app/dashboard"/>
        </Route>
        <Route path="/app/dashboard" component={Home} />
        <Route path="/app/ad" component={AdManager} />
        <Route path="/app/interviews" component={Interviews} />
        <Route path="/app/settings" component={Settings} />
        <Route path="/app/students" component={Students} />
        <Route path="/app/suggestion" component={SuggestionManager} />
        <Route path="/app/users" component={Users} />
        <Route path="/app/exams" component={Exams} />
        <Route path="*" component={Home} />
        <Redirect
          to={{
            state: { error: true },
          }}
        />
      </Switch>
    </div>
  );
}

export default withRouter(Routing)
