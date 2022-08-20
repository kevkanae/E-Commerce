import { Menu, MenuButton, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CategoryMenuList from "./CategoryMenuList";

const NavLinkData = [
  {
    title: "Shop",
    path: "/feed",
  },
  {
    title: "Contact Us",
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
          cursor="pointer"
          transition="0.2s cubic-bezier(0.47, 0, 0.745, 0.715)"
          _hover={{
            color: "teal.600",
          }}
        >
          Category
        </MenuButton>
        <CategoryMenuList />
      </Menu>
      {NavLinkData.map((obj, i) => (
        <Text
          key={i}
          cursor="pointer"
          onClick={() => navigate(`${obj.path}`, { replace: true })}
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
