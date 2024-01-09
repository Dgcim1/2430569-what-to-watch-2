import {Logo} from '../components/logo.tsx';
import {HeaderUserBlock} from '../components/header-user-block.tsx';
import {ROUTES} from '../routes/routes-data.ts';
import {Link, Navigate, useParams} from 'react-router-dom';
import {AddReviewForm} from '../components/add-review-form.tsx';
import {useAppDispatch, useAppSelector} from '../store/hooks.ts';
import {Spinner} from '../components/spinner.tsx';
import {ReducerName} from '../types/reducer-name.ts';
import {fetchFilm} from '../store/api-actions.ts';

export const AddReview = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const stateFilm = useAppSelector((state) => state[ReducerName.Film].film);
  const stateIsFilmLoading = useAppSelector((state) => state[ReducerName.Film].isLoading);

  if (id && id !== stateFilm?.id) {
    dispatch(fetchFilm(id));
  }

  if (stateIsFilmLoading) {
    return (<Spinner/>);
  }

  if (!stateFilm) {
    return (<Navigate to={ROUTES.NOT_FOUND}/>);
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={stateFilm.backgroundImage} alt={stateFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo/>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={ROUTES.FILM.replace(':id', stateFilm.id)} className="breadcrumbs__link">{stateFilm.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={ROUTES.REVIEW.replace(':id', stateFilm.id)} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>
          <HeaderUserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={stateFilm.posterImage} alt={stateFilm.name} width="218" height="327"/>
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm filmId={stateFilm.id}/>
      </div>

    </section>
  );
};
