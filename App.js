import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const handleFetch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch:" + response.statusText);

        return response.json()
      })
      .then(data => setRepositories(data.meals))
      .catch(err => console.error(err));
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={{ fontSize: 18, width: 200 }}
        placeholder='keyword'
        value={keyword}
        onChangeText={text => setKeyword(text)}
      />
      <Button title="Find" onPress={handleFetch} />
      <FlatList
        data={repositories}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) =>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.strMeal}
            </Text>
            <Image
              style={{ width: 250, height: 100 }}
              source={{ uri: item.strMealThumb }}
            />
          </View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
});
