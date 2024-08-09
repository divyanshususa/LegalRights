class RegisterUserModel {
  String? firstName;
  String? lastName;
  String? email;
  String? password;
  String? role;

  RegisterUserModel(
      {this.firstName, this.lastName, this.email, this.password, this.role});

  RegisterUserModel.fromJson(Map<String, dynamic> json) {
    firstName = json['firstName'];
    lastName = json['lastName'];
    email = json['email'];
    password = json['password'];
    role = json['role'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['firstName'] = firstName;
    data['lastName'] = lastName;
    data['email'] = email;
    data['password'] = password;
    data['role'] = role;
    return data;
  }
}
