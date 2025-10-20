import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { recipeStorage, Recipe } from '../lib/recipeStorage';
import { ChefHat, Clock, Users, TrendingUp, Plus } from 'lucide-react';

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState(''); 

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = () => {
    const data = recipeStorage.getAll();
    const sorted = [...data].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setRecipes(sorted);
    setLoading(false);
  };

  const filteredRecipes = recipes.filter(recipe =>
    (filter === 'all' || recipe.category === filter) &&
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  const categories = ['all', 'breakfast', 'lunch', 'dinner', 'dessert', 'appetizer', 'snack', 'other'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-orange-600 animate-bounce mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <ChefHat className="w-20 h-20 text-orange-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Recipe Collection</h1>
          <p className="text-xl text-gray-600 mb-8">Discover and share amazing recipes</p>

          <Link
            to="/submit"
            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Submit Your Recipe
          </Link>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition capitalize ${
                  filter === category
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-orange-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mb-8">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          />
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">No recipes found.</p>
            <Link
              to="/submit"
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              Be the first to submit one!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipe/${recipe.id}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium capitalize">
                      {recipe.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getDifficultyColor(recipe.difficulty)}`}>
                      {recipe.difficulty}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {recipe.title}
                  </h2>

                  {recipe.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {recipe.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{recipe.prep_time + recipe.cook_time} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{recipe.servings} servings</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-orange-600 font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    View Recipe
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
