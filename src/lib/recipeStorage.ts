import { v4 as uuidv4 } from 'uuid';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  category: string;
  difficulty: string;
  created_at: string;
  updated_at: string;
}

const STORAGE_KEY = 'recipes';

function loadRecipes(): Recipe[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveRecipes(recipes: Recipe[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export const recipeStorage = {
  getAll(): Recipe[] {
    return loadRecipes();
  },

  getById(id: string): Recipe | null {
    return loadRecipes().find(r => r.id === id) || null;
  },

  create(recipeData: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>): Recipe {
    const recipes = loadRecipes();
    const newRecipe: Recipe = {
      id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      ...recipeData
    };
    recipes.push(newRecipe);
    saveRecipes(recipes);
    return newRecipe;
  },

  delete(id: string): boolean {
    const recipes = loadRecipes();
    const filtered = recipes.filter(r => r.id !== id);
    if (filtered.length === recipes.length) return false;
    saveRecipes(filtered);
    return true;
  }
};
