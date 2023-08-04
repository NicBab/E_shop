import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { Navbar, Announcement, Footer } from "../components/index";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCartQty,
  addToCart,
  removeFromCart,
  clearCart,
  getTotals,
} from "../redux/cartRedux";
const KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const axios = require("axios").default;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 5px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: none;
  margin: 0px 10px;
  cursor: pointer;
`;

// const CartIsEmpty = styled.div`
// text-align: center;
// display: flex;
// align-items: center;
// justify-content: center;
// `;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.span`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ margin: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  display: flex;
  margin: 30px 0px;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const RemoveItem = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: teal;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
`;

const ClearCartButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #88d8c0;
  color: white;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [stripeToken, setStripeToken] = useState(null);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:6001/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        navigate("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart, navigate]);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleIncreaseCartQty = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleDecreaseCartQty = (cartItem) => {
    dispatch(decreaseCartQty(cartItem));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({ ...item }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Container>
      <Announcement />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <TopButton
            style={{ backgroundColor: "#88d8c0", borderRadius: "10px" }}
          >
            <Link to="/" className="link">
              Continue Shopping
            </Link>
          </TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Wishlist(0)</TopText>
          </TopTexts>
          <TopButton type="filled">Checkout</TopButton>
        </Top>
        <Bottom>
          {cart.cartItems.length === 0 ? (
            <span style={{ fontSize: "25px" }}>Your cart is empty</span>
          ) : (
            <>
              <Info>
                {cart.cartItems.map((item, idx) => (
                  <Product key={idx}>
                    <ProductDetail>
                      <Image src={item.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b>
                          {item.title}
                        </ProductName>
                        <ProductId>
                          <b>Id:</b>
                          {item._id}
                        </ProductId>
                        <ProductColor color={item.color} />
                        <ProductSize>
                          <b>Size:</b>
                          {item.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Remove
                          onClick={() => handleDecreaseCartQty(item)}
                          style={{ cursor: "pointer" }}
                        />
                        <ProductAmount>{item.cartQuantity}</ProductAmount>
                        <Add
                          onClick={() => handleIncreaseCartQty(item)}
                          style={{ cursor: "pointer" }}
                        />
                      </ProductAmountContainer>
                      <ProductPrice>
                        $ {item.price * item.cartQuantity}
                      </ProductPrice>
                      <RemoveItem onClick={() => handleRemoveItem(item)}>
                        Remove
                      </RemoveItem>
                    </PriceDetail>
                  </Product>
                ))}
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>Order Summary</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {cart.cartTotalAmount}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  Total
                  <SummaryItemText></SummaryItemText>
                  <SummaryItemPrice>$ {cart.cartTotalAmount}</SummaryItemPrice>
                </SummaryItem>

                {stripeToken ? (
                  <span>Processing...Please Wait!</span>
                ) : (
                  <StripeCheckout
                    name="My Shop"
                    image=""
                    billingAddress
                    shippingAddress
                    description={`Your total is $${cart.total}`}
                    amount={cart.total * 100}
                    token={onToken}
                    stripeKey={KEY}
                  >
                    <CheckoutButton>CHECKOUT NOW</CheckoutButton>
                  </StripeCheckout>
                )}
                <ClearCartButton onClick={() => handleClearCart()}>
                  CLEAR CART
                </ClearCartButton>
              </Summary>
            </>
          )}
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
