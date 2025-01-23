import { CATEGORIES, MEALS } from '../data/dummy-data';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MealItem from '../components/MealItem';
import { useEffect, useLayoutEffect } from 'react';

function MealsOverviewScreen({ route, navigation }) {
  const { categoryId } = route.params;

  const displayMeals = MEALS.filter(mealItem => mealItem.categoryIds.includes(categoryId));

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(category => category.id === categoryId).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  function renderMealItem(itemData) {
    const item = itemData.item;

    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };

    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList data={displayMeals} renderItem={renderMealItem} />
      {/*<Text>MealsOverviewScreen - {categoryId}</Text>*/}
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e4e4db',
  },
});
