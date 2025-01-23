import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { MEALS } from '../data/dummy-data';
import MealDetail from '../components/MealDetail';
import { useLayoutEffect } from 'react';
import IconButton from '../components/IconButton';

function MealDetailScreen({ route, navigation }) {
  const mealId = route.params.mealId;

  const selectedMeal = MEALS.find(meal => meal.id === mealId);

  function headerButtonPressHandler() {
    console.log('kkkkk');
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton icon="star" color="white" onPress={headerButtonPressHandler} />;
      },
    });
  }, [navigation, headerButtonPressHandler]);

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
