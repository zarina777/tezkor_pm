export type UserType = {
  id: Number;
  phone_number: String;
  role: "owner";
  email: String;
  first_name: String;
  last_name: String;
  image: String;
};
export type LoginResponse = {
  access: string;
  refresh: string;
  user: UserType;
};
