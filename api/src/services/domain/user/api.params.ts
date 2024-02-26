export namespace params {
  export type GetUser = GetUserById;

  type GetUserById = {
    discriminator: "id";
    id: string;
  };
}
