import { signToken } from "./signToken";

export const setCookie = (email: string, res: any) => {
  const token = signToken(email);
  const cookieOptions = {
    expires: new Date(
      Date.now() + 2 * 60 * 60 * 1000 // 90days*24hours*60min*60sec*1000milsec*
    ),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  // if Prod ? cookieOptions.secure = true;

  res.cookie("yum", token, cookieOptions);
};
