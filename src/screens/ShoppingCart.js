import { Text, FlatList, View, StyleSheet, Pressable, Image, useWindowDimensions } from 'react-native';
import CartListItem from '../components/CartListItem';
import { useSelector } from 'react-redux';
import {
  selectDeliveryPrice,
  selectSubtotal,
  selectTotal,
} from '../store/cartSlice';
import sadImage from '../../assets/sad.png';

const ShoppingCartTotals = () => {
  const subtotal = useSelector(selectSubtotal);
  const deliveryFee = useSelector(selectDeliveryPrice);
  const total = useSelector(selectTotal);

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{subtotal} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{deliveryFee} US$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{total} US$</Text>
      </View>
    </View>
  );
};

const ShoppingCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const { width } = useWindowDimensions();

  if (cartItems.length > 0)
  {

    return (
      <>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => <CartListItem cartItem={item} />}
          ListFooterComponent={ShoppingCartTotals}
        />
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Checkout</Text>
        </Pressable>
      </>
    );
  }else{
    return(
      <View style={{flex:1,justifyContent: "center",alignItems: "center",width: width}}>
          <Image source={require("../../assets/sad.png")} style={styles.emptyCart}/>
          <Text>Keranjang Masih kosong</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    fontWeight: '500',
  },
  emptyCart:{
    padding: 20,
    width: '100%',
    height: 300,
    aspectRatio: 1
  },
  button: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ShoppingCart;
