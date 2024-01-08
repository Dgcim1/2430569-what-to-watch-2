import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes-data.ts';
import {Main} from '../pages/main.tsx';
import {SignIn} from '../pages/signIn.tsx';
import {MyList} from '../pages/my-list.tsx';
import {MoviePage} from '../pages/movie-page.tsx';
import {AddReview} from '../pages/add-review.tsx';
import {Player} from '../pages/player.tsx';
import {NotFoundPage} from '../pages/not-found-page.tsx';
import {PrivateRoute} from './private-route.tsx';
import {Film} from '../mocks/films.ts';

export const AppRouter = ({films}: {films: Film[]}) => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.MAIN} element={<Main films={films}/>}/>
      <Route path={ROUTES.SING_IN} element={<SignIn/>}/>
      <Route path={ROUTES.MY_LIST} element={<PrivateRoute><MyList films={films}/></PrivateRoute>}/>
      <Route path={ROUTES.FILMS}>
        <Route path={ROUTES.FILM} element={<MoviePage films={films}/>}/>
        <Route path={ROUTES.REVIEW} element={<PrivateRoute><AddReview films={films}/></PrivateRoute>}/>
      </Route>
      <Route path={ROUTES.PLAYER} element={<Player/>}/>
      <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage/>}/>
    </Routes>
  </BrowserRouter>
);
