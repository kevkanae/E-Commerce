import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CategoryMenuList from "./CategoryMenuList";

const NavLinkData = [
  {
    title: "SHOP",
    path: "/feed",
  },
  {
    title: "CONTACT US",
    path: "/contact",
  },
];

const NavLinks = () => {
  const navigate = useNavigate();
  return (
    <>
      <Menu>
        <MenuButton
          as={Text}
          fontWeight={800}
          fontSize=".9rem"
          cursor="pointer"
          transition="0.2s cubic-bezier(0.47, 0, 0.745, 0.715)"
          _hover={{
            color: "teal.600",
          }}
        >
          CATEGORY
        </MenuButton>
        <CategoryMenuList />
      </Menu>
      {NavLinkData.map((obj, i) => (
        <Text
          key={i}
          fontWeight={800}
          fontSize=".9rem"
          cursor="pointer"
          onClick={() => navigate(`${obj.path}`)}
          transition="0.2s cubic-bezier(0.47, 0, 0.745, 0.715)"
          _hover={{
            color: "teal.600",
          }}
        >
          {obj.title}
        </Text>
      ))}
    </>
  );
};

export default NavLinks;
