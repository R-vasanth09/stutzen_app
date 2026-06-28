import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import ProductCard from '../component/Productcard';
import {Product} from '../data/Product';

const Productlist = ({navigation}) => {
  const [search, setSearch] = useState('');

  const cartItems = useSelector(
    state => state.cart.cartItems,
  );

  const cartCount = cartItems.length;

  const filteredProducts = Product.filter(
    item =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
     

      <View style={styles.header}>
        <Text style={styles.title}>
          Product List
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Cartscreen')
          }>
          <Icon
            name="cart-outline"
            size={30}
            color="#0F52FF"
          />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {cartCount}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

     

      <View style={styles.searchContainer}>
        <Icon
          name="search-outline"
          size={22}
          color="#888"
        />

        <TextInput
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

     

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item =>
          item.id.toString()
        }
        renderItem={({item}) => (
          <ProductCard item={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Productlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    paddingTop: 15,
  },

  header: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
  },

  badge: {
    position: 'absolute',
    top: -8,
    right: -8,

    width: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: 'red',

    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#fff',
    fontSize: 10,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#fff',

    margin: 15,
    borderRadius: 15,

    paddingHorizontal: 15,
  },

  searchInput: {
    flex: 1,
    height: 50,
    marginLeft: 10,
  },
});