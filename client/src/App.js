import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookDetailPage from './pages/BookDetailPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ReadingPage from './pages/ReadingPage'
import PublicNavbar from './components/PublicNarbar'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <PublicNavbar />
      <Switch>
        <Route exact path="/books/:id" component={BookDetailPage} />
        <Route exact path="/reading" component={ReadingPage} />
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

export default App;
