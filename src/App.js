import { lazy, Suspense } from 'react';
import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/header/Header';
import Spinner from './components/spinner/Spinner';
import SinglePage from './components/pages/SinglePage';

const MainPage = lazy(()=>import('./components/pages/MainPage'));
const ComicsPage = lazy(()=>import('./components/pages/ComicsPage'));
const SingleComicLayout = lazy(()=>import('./components/pages/SingleComic/SingleComicPage'));
const Page404 = lazy(()=>import('./components/pages/Page404'));
const SingleCharacterLayout = lazy(()=>import('./components/pages/SingleChar/SingleChar'))

const App = ()=>{
  
    return (
            <Router>
              <div className="app">
                <Header/>
                    <main>
                  <Suspense fallback={<Spinner/>}>
                        <Switch>
                          <Route exact path ="/">
                            <MainPage/> 
                          </Route>
                          <Route exact path ="/comics">   
                            <ComicsPage/>
                          </Route>
                          <Route exact path = "/comics/:id">
                            <SinglePage Component = {SingleComicLayout} dataType='comic'/>
                          </Route>
                          <Route exact path="/characters/:id">
                            <SinglePage Component = {SingleCharacterLayout} dataType='character'/>
                          </Route>
                          <Route path = '*'>
                            <Page404/>
                          </Route>
                        </Switch>
                  </Suspense>
                    </main>          
                  </div>
            </Router>      
      );
    }

export default App;
