import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const activeClass = "text-orange-600 font-semibold";
  const baseClass = "text-gray-700 hover:text-orange-600 transition";

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-600">RecipeApp</Link>
        <div className="flex gap-6">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : baseClass)}>Home</NavLink>
          <NavLink to="/browse" className={({ isActive }) => (isActive ? activeClass : baseClass)}>Browse</NavLink>
          <NavLink to="/submit" className={({ isActive }) => (isActive ? activeClass : baseClass)}>Submit</NavLink>
        </div>
      </div>
    </nav>
  );
}
