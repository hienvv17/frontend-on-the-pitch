interface BaseUser {
  fullName: string;
  phoneNumber: string;
  image: string;
}

interface Info extends BaseUser {
  email: string;
}

// interface Create extends BaseUser {
//     uid: string | null;
//     email: string;
//     picture: string | null;
// }

export type UserUpdateData = BaseUser;

export type UserInfo = Info;
