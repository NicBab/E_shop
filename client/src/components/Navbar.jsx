import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
// import { getTotals } from "../redux/cartRedux"

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  border-radius: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center", marginRight: "20px" })}
`;

const MenuItem = styled.div`
text-decoration: none;
color: black;
  font-size: 14ps;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px" })}
`;

const Navbar = () => {
  const dispatch = useDispatch()
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout())
  }

  // useEffect(() => {
  //   dispatch(getTotals())
  // }, [dispatch, cartTotalQuantity])

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "grey", fontSize: "14px" }} />
          </SearchContainer>
        </Left>

        <Center>
          <Link to="/" className="link">
          <Logo>MERN</Logo>
          </Link>
        </Center>

        <Right>
          {user ? (
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          ) : (
            <>
              <Link to="/register" className="link">
               <MenuItem>Register</MenuItem>
              </Link>
              <Link to="/login" className="link">
               <MenuItem>Sign In</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={cartTotalQuantity} color="secondary">
                <ShoppingCartOutlined color="action" />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
