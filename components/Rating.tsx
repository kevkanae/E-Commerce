import { RatingProps } from "../interfaces/Rating";
import { Box, Text } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

const Rating = ({ rating, numReviews, flag }: RatingProps) => {
  return (
    <Box d="flex" align="center" color="gamma">
      {Array(5)
        .fill(7)
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return <BsStarFill key={i} style={{ marginLeft: "1" }} />;
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
          }
          return <BsStar key={i} style={{ marginLeft: "1" }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {flag ? <Text>{numReviews}</Text> : <Text>{numReviews} Reviews</Text>}
      </Box>
    </Box>
  );
};

export default Rating;
