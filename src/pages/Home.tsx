import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex flex-col items-center justify-center text-center px-4">
      <ChefHat className="w-20 h-20 text-orange-600 mb-6" />
      <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome to RecipeApp</h1>
      <p className="text-gray-600 text-lg mb-8 max-w-2xl">
        Discover, share, and save your favorite recipes all in one place.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/browse"
          className="px-8 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition"
        >
          Browse Recipes
        </Link>
        <Link
          to="/submit"
          className="px-8 py-3 border-2 border-orange-600 text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition"
        >
          Submit a Recipe
        </Link>
      </div>
    </div>
  );
}
