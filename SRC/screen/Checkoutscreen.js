import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { clearCart } from '../redux/cartSlice';

const countries = [
  { label: 'India', value: 'India' },
  { label: 'USA', value: 'USA' },
];

const stateData = {
  India: [
    { label: 'Tamil Nadu', value: 'Tamil Nadu' },
    { label: 'Kerala', value: 'Kerala' },
    { label: 'Karnataka', value: 'Karnataka' },
    { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
  ],

  USA: [
    { label: 'California', value: 'California' },
    { label: 'Texas', value: 'Texas' },
    { label: 'Florida', value: 'Florida' },
    { label: 'New York', value: 'New York' },
  ],
};

const CheckoutScreen = ({ navigation }) => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [city, setCity] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [isCountryFocus, setIsCountryFocus] = useState(false);
  const [isStateFocus, setIsStateFocus] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    let error = {};

    if (!name.trim()) {
      error.name = 'Name is required';
    }

    if (!phone.trim()) {
      error.phone = 'Phone Number is required';
    }

    if (!address.trim()) {
      error.address = 'Address is required';
    }

    if (!country) {
      error.country = 'Country is required';
    }

    if (!stateName) {
      error.state = 'State is required';
    }

    if (!city.trim()) {
      error.city = 'City is required';
    }

    setErrors(error);

    if (Object.keys(error).length === 0) {
      setSuccessModal(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="#0F52FF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Checkout</Text>

          <Icon name="cart-outline" size={28} color="#0F52FF" />
        </View>
        <View style={styles.stepContainer}>
          <View style={styles.stepItem}>
            <View style={styles.activeCircle}>
              <Text style={styles.circleText}>1</Text>
            </View>

            <Text style={styles.activeText}>Shipping</Text>
          </View>

          <View style={styles.line} />

          <View style={styles.stepItem}>
            <View style={styles.circle}>
              <Text style={styles.circleText2}>2</Text>
            </View>

            <Text style={styles.inactiveText}>Payment</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Delivery Details</Text>
          <Text style={styles.label}>Full Name *</Text>

          <TextInput
            placeholder="John Doe"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          <Text style={styles.label}>Email (Optional)</Text>

          <TextInput
            placeholder="john@gmail.com"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Phone Number *</Text>

          <TextInput
            placeholder="+91 9876543210"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />

          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
          <Text style={styles.label}>Street Address *</Text>

          <TextInput
            placeholder="123 Shopping Street"
            value={address}
            onChangeText={setAddress}
            multiline
            style={[
              styles.input,
              {
                height: 100,
                textAlignVertical: 'top',
              },
            ]}
          />

          {errors.address && <Text style={styles.error}>{errors.address}</Text>}
          <Text style={styles.label}>Country *</Text>

          <Dropdown
            style={[
              styles.dropdown,
              isCountryFocus && {
                borderColor: '#0F52FF',
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.searchInput}
            iconStyle={styles.iconStyle}
            data={countries}
            search
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Select Country"
            searchPlaceholder="Search Country..."
            value={country}
            onFocus={() => setIsCountryFocus(true)}
            onBlur={() => setIsCountryFocus(false)}
            onChange={item => {
              setCountry(item.value);
              setStateName(null);
              setIsCountryFocus(false);
            }}
          />

          {errors.country && <Text style={styles.error}>{errors.country}</Text>}
          <Text style={styles.label}>State *</Text>

          <Dropdown
            style={[
              styles.dropdown,
              isStateFocus && {
                borderColor: '#0F52FF',
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.searchInput}
            iconStyle={styles.iconStyle}
            data={country ? stateData[country] : []}
            search
            maxHeight={250}
            labelField="label"
            valueField="value"
            placeholder="Select State"
            searchPlaceholder="Search State..."
            value={stateName}
            onFocus={() => setIsStateFocus(true)}
            onBlur={() => setIsStateFocus(false)}
            onChange={item => {
              setStateName(item.value);
              setIsStateFocus(false);
            }}
          />

          {errors.state && <Text style={styles.error}>{errors.state}</Text>}

          <Text style={styles.label}>City *</Text>

          <TextInput
            placeholder="Enter City"
            value={city}
            onChangeText={setCity}
            style={styles.input}
          />

          {errors.city && <Text style={styles.error}>{errors.city}</Text>}
        </View>
        <View style={styles.totalCard}>
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Order Total</Text>

            <Text style={styles.totalPrice}>₹{totalAmount.toFixed(2)}</Text>
          </View>

          <Text style={styles.note}>
            By clicking "Confirm Order", you agree to our Terms of Service and
            Privacy Policy.
          </Text>
        </View>
        <TouchableOpacity style={styles.confirmBtn} onPress={validate}>
          <Text style={styles.confirmText}>Confirm Order →</Text>
        </TouchableOpacity>
        <Modal animationType="fade" transparent visible={successModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Icon name="checkmark-circle" size={90} color="#22C55E" />

              <Text style={styles.successTitle}>Order Successful</Text>

              <Text style={styles.successMsg}>
                Your order placed successfully, thank you for purchasing.
              </Text>

              <TouchableOpacity
                style={styles.goBackBtn}
                onPress={() => {
                  dispatch(clearCart());

                  setSuccessModal(false);

                  navigation.navigate('Productlist');
                }}
              >
                <Text style={styles.goBackText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },

  successTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
  },

  successMsg: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 15,
    lineHeight: 28,
  },

  goBackBtn: {
    marginTop: 30,
    width: '100%',
    height: 55,
    backgroundColor: '#0F52FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  goBackText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7FC',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0F52FF',
  },

  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 25,
  },

  stepItem: {
    alignItems: 'center',
  },

  activeCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#0F52FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DCE5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleText: {
    color: '#FFF',
    fontWeight: '700',
  },

  circleText2: {
    color: '#666',
    fontWeight: '700',
  },

  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#DCE5FF',
  },

  activeText: {
    marginTop: 8,
    color: '#0F52FF',
    fontWeight: '700',
  },

  inactiveText: {
    marginTop: 8,
    color: '#666',
  },

  card: {
    backgroundColor: '#FFF',
    margin: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D6DAE8',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    fontSize: 18,
    backgroundColor: '#FFF',
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: '#D6DAE8',
    borderRadius: 15,
    overflow: 'hidden',
  },

  error: {
    color: 'red',
    marginTop: 5,
  },

  totalCard: {
    backgroundColor: '#EEF2FF',
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 22,
    color: '#333',
  },

  totalPrice: {
    fontSize: 28,
    color: '#0F52FF',
    fontWeight: '700',
  },

  note: {
    marginTop: 15,
    color: '#555',
    fontSize: 15,
    lineHeight: 24,
  },

  confirmBtn: {
    margin: 20,
    height: 60,
    backgroundColor: '#0F52FF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '700',
  },
  dropdown: {
    height: 55,
    borderColor: '#D6DAE8',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    marginTop: 8,
  },

  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },

  selectedTextStyle: {
    fontSize: 16,
    color: '#111827',
  },

  searchInput: {
    height: 40,
    fontSize: 16,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
});
