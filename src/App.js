import React, {Fragment} from 'react';
import {Route, Switch} from "react-router";
import SearchPage from "./components/SearchPage/SearchPage";
import ShowInfo from "./components/ShowInfo/ShowInfo";
import {Container} from "reactstrap";

const App = () => {
  return (
      <Fragment>
        <Container>
          <Switch>
            <Route path='/shows/:id/' exact component={ShowInfo}/>
            <Route path='' exact component={SearchPage}/>
          </Switch>
        </Container>
      </Fragment>
  );
};

export default App;