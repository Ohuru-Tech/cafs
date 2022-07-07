export interface UserCredentials {
  email: string;
  password: string;
  [key: string]: string;
}

export interface User {
  user: {
    name: string;
    email: string;
    profilePic?: string;
    accountType: string;
    hasApps: boolean;
    appId?: number[];
  };
  key: string;
}

export interface UserProfile {
  name: string;
  email: string;
  profilePic?: string;
  accountType: string;
  hasApps: boolean;
  appId?: number[];
}

export interface SignupData {
  name: string;
  email: string;
  password1: string;
  password2: string;
  accountType?: string;
}
