import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../redux/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.rightContainer}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>

            <Text style={styles.variant}>{item.category}</Text>
          </View>

          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
            <Icon name="trash-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch(decreaseQuantity(item.id))}
            >
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.count}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch(increaseQuantity(item.id))}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>
           ₹{(item.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 20,
    padding: 15,
    elevation: 4,
  },

  image: {
    width: 110,
    height: 110,
    borderRadius: 15,
  },

  rightContainer: {
    flex: 1,
    marginLeft: 15,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  variant: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },

  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    borderRadius: 15,
    paddingHorizontal: 8,
  },

  qtyButton: {
    width: 42,
    height: 42,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },

  qtyText: {
    fontSize: 24,
    color: '#0F52FF',
    fontWeight: '700',
  },

  count: {
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 12,
  },

  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F52FF',
  },
});
