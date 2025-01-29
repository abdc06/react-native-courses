import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useContext, useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';
import MealDetail from '../components/MealDetail';
import { MEALS } from '../data/dummy-data';
import { FavoritesContext } from '../store/context/favorites-context';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorities';

function MealDetailScreen({ route, navigation }) {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  // const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
  const mealIsFavorite = favoriteMealIds.includes(mealId);

  function changeFavoritesStatusHandler() {
    if (mealIsFavorite) {
      dispatch(removeFavorite({ id: mealId }));
      // favoriteMealsCtx.removeFavorite(mealId);
    } else {
      dispatch(addFavorite({ id: mealId }));
      // favoriteMealsCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color="white"
            onPress={changeFavoritesStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoritesStatusHandler]);

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetail {...selectedMeal} />
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Ingredtients</Text>
        {selectedMeal.ingredients.map(ingredient => (
          <Text key={ingredient}>{ingredient}</Text>
        ))}
      </View>
      <View style={styles.subTitleContainer}>
        <Text style={styles.subTitle}>Steps</Text>
        {selectedMeal.steps.map(step => (
          <Text key={step}>{step}</Text>
        ))}
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#e4e4db',
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
  },
  detailText: {
    color: 'white',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitleContainer: {
    margin: 4,
    padding: 6,
    marginHorizontal: 24,
    marginVertical: 6,
    borderBlockColor: 'black',
    borderBottomWidth: 2,
  },
});
