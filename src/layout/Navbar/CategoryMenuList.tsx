import { MenuDivider, MenuItem, MenuList } from "@chakra-ui/react";

const CategoryMenuList = () => {
  return (
    <>
      <MenuList>
        <MenuItem>Mens Shirts</MenuItem>
        <MenuItem>Mens Shoes</MenuItem>
        <MenuItem>Mens Shirts</MenuItem>
        <MenuItem>Mens Shoes</MenuItem>
        <MenuDivider />
        <MenuItem>Womens Shirts</MenuItem>
        <MenuItem>Womens Shoes</MenuItem>
        <MenuItem>Womens Shirts</MenuItem>
        <MenuItem>Womens Shoes</MenuItem>
      </MenuList>
    </>
  );
};

export default CategoryMenuList;
