export const useToken = () => {
  const token = localStorage.getItem("ACCESS_KEY");
  return token;
};
