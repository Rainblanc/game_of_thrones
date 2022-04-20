import { AuthStatus } from 'constants/enums/auth-status';
import { AppLayout } from 'containers/layout';
import { Login } from 'pages/login';
import { ResourcesRoot } from 'pages/resources';
import { BookResource } from 'pages/resources/books';
import { SpecificBook } from 'pages/resources/books/specific';
import { CharacterResource } from 'pages/resources/characters';
import { SpecificCharacter } from 'pages/resources/characters/specific';
import { HouseResource } from 'pages/resources/houses';
import { SpecificHouse } from 'pages/resources/houses/specific';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const AppRouter = () => {
  const status = useSelector((state) => state.auth.status);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to={status === AuthStatus.Authorized ? '/resources' : '/login'} />} />
          <Route path="/resources">
            <Route index element={<ResourcesRoot />} />
            <Route path="books">
              <Route index element={<BookResource />} />
              <Route path=":id" element={<SpecificBook />} />
            </Route>
            <Route path="houses">
              <Route index element={<HouseResource />} />
              <Route path=":id" element={<SpecificHouse />} />
            </Route>
            <Route path="characters">
              <Route index element={<CharacterResource />} />
              <Route path=":id" element={<SpecificCharacter />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
