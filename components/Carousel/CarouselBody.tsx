import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import { useSwipeable } from "react-swipeable";

export const CarouselBody = ({ children }: { children: any }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const updateIndex = (newIndex: number) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
          // return <div>{child}</div>;
        })}
      </div>
      <div className="indicators">
        <IconButton
          aria-label="forward"
          icon={<ArrowLeftIcon />}
          variant={"solid"}
          borderRadius={"100%"}
          bg={"alpha"}
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </IconButton>
        {React.Children.map(children, (child, index) => {
          return (
            <button
              className={`${
                index === activeIndex ? "active" : ""
              } indicators__list`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}
        <IconButton
          aria-label="backward"
          icon={<ArrowRightIcon />}
          borderRadius={"100%"}
          variant={"solid"}
          bg={"alpha"}
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </IconButton>
      </div>
    </div>
  );
};

// export const Carousel = () => {
//   return (
//     <Box className="carousel">
//       <section className="carousel" aria-label="Gallery">
//         <ol className="carousel__viewport">
//           <li id="carousel__slide1" tabIndex={0} className="carousel__slide">
//             <div className="carousel__snapper">
//               <a href="#carousel__slide4" className="carousel__prev">
//                 Go to last slide
//               </a>
//               <a href="#carousel__slide2" className="carousel__next">
//                 Go to next slide
//               </a>
//             </div>
//           </li>
//           <li id="carousel__slide2" tabIndex={0} className="carousel__slide">
//             <div className="carousel__snapper"></div>
//             <a href="#carousel__slide1" className="carousel__prev">
//               Go to previous slide
//             </a>
//             <a href="#carousel__slide3" className="carousel__next">
//               Go to next slide
//             </a>
//           </li>
//           <li id="carousel__slide3" tabIndex={0} className="carousel__slide">
//             <div className="carousel__snapper"></div>
//             <a href="#carousel__slide2" className="carousel__prev">
//               Go to previous slide
//             </a>
//             <a href="#carousel__slide4" className="carousel__next">
//               Go to next slide
//             </a>
//           </li>
//           <li id="carousel__slide4" tabIndex={0} className="carousel__slide">
//             <div className="carousel__snapper"></div>
//             <a href="#carousel__slide3" className="carousel__prev">
//               Go to previous slide
//             </a>
//             <a href="#carousel__slide1" className="carousel__next">
//               Go to first slide
//             </a>
//           </li>
//         </ol>
//         <aside className="carousel__navigation">
//           <ol className="carousel__navigation-list">
//             <li className="carousel__navigation-item">
//               <a
//                 href="#carousel__slide1"
//                 className="carousel__navigation-button"
//               >
//                 Go to slide 1
//               </a>
//             </li>
//             <li className="carousel__navigation-item">
//               <a
//                 href="#carousel__slide2"
//                 className="carousel__navigation-button"
//               >
//                 Go to slide 2
//               </a>
//             </li>
//             <li className="carousel__navigation-item">
//               <a
//                 href="#carousel__slide3"
//                 className="carousel__navigation-button"
//               >
//                 Go to slide 3
//               </a>
//             </li>
//             <li className="carousel__navigation-item">
//               <a
//                 href="#carousel__slide4"
//                 className="carousel__navigation-button"
//               >
//                 Go to slide 4
//               </a>
//             </li>
//           </ol>
//         </aside>
//       </section>
//     </Box>
//   );
// };
