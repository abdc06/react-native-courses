import { useLayoutEffect } from 'react';
import MealsList from '../components/MealsList/MealsList';
import { CATEGORIES, MEALS } from '../data/dummy-data';

function MealsOverviewScreen({ route, navigation }) {
  const { categoryId } = route.params;

  const displayMeals = MEALS.filter(mealItem => mealItem.categoryIds.includes(categoryId));

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(category => category.id === categoryId).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  return <MealsList items={displayMeals} />;
}

export default MealsOverviewScreen;
