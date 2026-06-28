import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';

import CartItem from '../component/CartItem';

const Cartscreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.cartItems);

  const cartCount = cartItems.length;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const renderEmptyCart = () => {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="cart-outline" size={90} color="#0F52FF" />

        <Text style={styles.emptyTitle}>Your Cart Is Empty</Text>

        <Text style={styles.emptySub}>Add products to continue</Text>

        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.shopBtnText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color="#0F52FF" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Cart List</Text>

        <View>
          <Icon name="cart-outline" size={30} color="#0F52FF" />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        </View>
      </View>

      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <CartItem item={item} />}
            contentContainerStyle={{
              paddingBottom: 200,
            }}
          />

         

          <View style={styles.bottomCard}>
            <View style={styles.row}>
              <Text style={styles.label}>Total Amount</Text>

              <Text style={styles.value}>₹{totalAmount.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkoutscreen')}
            >
              <Text style={styles.checkoutText}>Checkout →</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cartscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
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

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 15,
  },

  emptySub: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 10,
  },

  shopBtn: {
    backgroundColor: '#0F52FF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 20,
  },

  shopBtnText: {
    color: '#fff',
    fontWeight: '700',
  },

  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: '#fff',
    padding: 20,

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    elevation: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  label: {
    fontSize: 18,
    color: '#374151',
  },

  value: {
    fontSize: 22,
    color: '#0F52FF',
    fontWeight: '700',
  },

  checkoutBtn: {
    backgroundColor: '#0F52FF',
    height: 60,
    borderRadius: 15,

    justifyContent: 'center',
    alignItems: 'center',
  },

  checkoutText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
});
