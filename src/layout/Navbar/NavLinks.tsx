import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NavLinkData = [
  {
    title: "Category",
    path: "/category",
  },
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
      {NavLinkData.map((obj, i) => (
        <Text
          key={i}
          cursor="pointer"
          onClick={() => navigate(`${obj.path}`, { replace: true })}
          transition="0.2s cubic-bezier(0.47, 0, 0.745, 0.715)"
          _hover={{
            color: "teal.800",
            textShadow: "0.1rem 0.1rem 0.05rem #B2D8D8",
          }}
        >
          {obj.title}
        </Text>
      ))}
    </>
  );
};

export default NavLinks;
