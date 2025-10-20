import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { recipeStorage, Recipe } from '../lib/recipeStorage';
import { Clock, Users, ChefHat, ArrowLeft, Trash2 } from 'lucide-react';

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = () => {
    if (!id) {
      setLoading(false);
      return;
    }
    const data = recipeStorage.getById(id);
    setRecipe(data);
    setLoading(false);
  };

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    setDeleting(true);
    if (id && recipeStorage.delete(id)) {
      navigate('/');
    } else {
      alert('Failed to delete recipe. Please try again.');
      setDeleting(false);
    }
  };

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
          <p className="text-gray-600 text-lg">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recipe Not Found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  const ingredientsList = recipe.ingredients.split('\n').filter(i => i.trim());
  const instructionsList = recipe.instructions.split('\n').filter(i => i.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Recipes
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full text-sm font-medium capitalize">
                    {recipe.category}
                  </span>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
                {recipe.description && (
                  <p className="text-lg text-gray-600">{recipe.description}</p>
                )}
              </div>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="ml-4 p-3 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                title="Delete recipe"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Prep Time</p>
                  <p className="text-lg font-semibold text-gray-900">{recipe.prep_time} min</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cook Time</p>
                  <p className="text-lg font-semibold text-gray-900">{recipe.cook_time} min</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="text-lg font-semibold text-gray-900">{recipe.servings}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Time</p>
                  <p className="text-lg font-semibold text-gray-900">{recipe.prep_time + recipe.cook_time} min</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-orange-600" />
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {ingredientsList.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {instructionsList.map((instruction, index) => (
                    <li key={index} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 pt-1">{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
