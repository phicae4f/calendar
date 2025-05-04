import { Layout } from "antd";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store/store";
import  "./index.css"
import { logout } from "../store/auth/authSlice";

interface LayoutComponentProps {
  children: ReactNode;
}

export const LayoutComponent = ({ children }: LayoutComponentProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch()

  return (
    <>
      <header className="header">
        <ul className="header__list"></ul>
        {isAuthenticated ? (
          <ul className="header__list">
            <li className="header__item">
              <span>Username</span>
            </li>
            <li className="header__item">
              <Link to="/login" onClick={() => dispatch(logout())}>Log out</Link>
            </li>
            <li className="header__item">
              <Link to="/event">Event</Link>
            </li>
          </ul>
        ) : (
          <ul className="header__list">
            <li className="header__item">
              <Link to="/login">Log in</Link>
            </li>
            <li className="header__item">
              <Link to="/event">Event</Link>
            </li>
          </ul>
        )}
      </header>
      <Layout.Content>{children}</Layout.Content>
      <footer className="footer">Footer</footer>
    </>
  );
};
