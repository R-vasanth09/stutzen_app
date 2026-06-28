import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Productcard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.category}>{item.category}</Text>

      <Text numberOfLines={2} style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.price}>₹{item.price}</Text>

      {item.stock > 0 ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(addToCart(item))}
        >
          <Text style={styles.btnText}>Add To Cart</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.outStock}>Out Of Stock</Text>
      )}
    </View>
  );
};

export default Productcard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 10,
    elevation: 4,
  },

  image: {
    width: '100%',
    height: 170,
    borderRadius: 12,
  },

  category: {
    color: '#777',
    marginTop: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 5,
  },

  price: {
    fontSize: 24,
    color: '#0F52FF',
    fontWeight: '700',
    marginVertical: 10,
  },

  button: {
    backgroundColor: '#0F52FF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '600',
  },

  outStock: {
    color: 'red',
    textAlign: 'center',
    fontWeight: '700',
  },
});
