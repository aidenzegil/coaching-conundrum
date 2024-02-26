export type User = {
  id: string;
  phoneNumber: string;
  userType: UserType;
  bookedBlockIds: string[];
  createdBlockIds: string[];
};

export enum UserType {
  COACH = "COACH",
  STUDENT = "STUDENT",
}
