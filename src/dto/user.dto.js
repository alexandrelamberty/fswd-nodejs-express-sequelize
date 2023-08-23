class UserDTO {
  constructor({ id, username, email, firstName, lastName, fullName, Tracks }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = fullName;
    this.Tracks = Tracks;
  }
}

module.exports = { UserDTO };
