export class User {

  constructor(
    name ?: string,
    firstName ?: string,
    secondName ?: string,
    email ?: string,
    roles ?: string[]
  ) {
    this.name = name;
    this.firstName = firstName;
    this.secondName = secondName;
    this.email = email;
    this.roles = roles;
  }

  public name: string;
  public firstName: string;
  public secondName: string;
  public email: string;
  public roles: string[];

}
