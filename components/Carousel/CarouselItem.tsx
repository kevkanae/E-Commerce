export const CarouselItem = ({
  children,
  width,
  height,
}: {
  children: any;
  width: number;
  height: number;
}) => {
  return (
    <div
      className="carousel-item"
      style={{ width: "100%", height: `${height}px` }}
    >
      {children}
    </div>
  );
};
