// models/user.model.ts

export type UserProfile = {
  id: string;
  username: string;
  isPhone: boolean;
  fName: string;
  lName: string;
  profilePicUrl: string;
  passwordExpireDate: Date | null;
  shouldChangePassword: boolean;
};

export type UserAuth = {
  accessToken: string;
  refreshToken: string;
};

//////////////////////////////////////////-- post_login
export type post_login_args = {
  username: string;
  password: string;
};
export type post_login_response = {
  profile: UserProfile;
  auth: UserAuth;
};

//////////////////////////////////////////-- post_refresh
export type post_refresh_args = {
  username: string;
  refreshToken: string;
};
export type post_refresh_response = {
  profile: UserProfile;
  auth: UserAuth;
};

//////////////////////////////////////////-- put_changePassword
export type put_changePassword_args = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type put_changePassword_response = {};
