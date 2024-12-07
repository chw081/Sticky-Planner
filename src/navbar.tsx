import { NavLink } from "react-router-dom";
import { dummyLists } from "./constant";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          end
        >
          Home
        </NavLink>
        {Object.keys(dummyLists).map((listName) => (
          <NavLink
            key={listName}
            to={`/todolist/${listName}`}
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            {`${listName.charAt(0).toUpperCase() + listName.slice(1)} To Do List`}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
