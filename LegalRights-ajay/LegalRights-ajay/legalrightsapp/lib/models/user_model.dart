class UserModel {
  String? token;
  String? role;
  User? user;

  UserModel({this.token, this.role, this.user});

  UserModel.fromJson(Map<String, dynamic> json) {
    token = json['token'];
    role = json['role'];
    user = json['user'] != null ? User.fromJson(json['user']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['token'] = token;
    data['role'] = role;
    if (user != null) {
      data['user'] = user!.toJson();
    }
    return data;
  }
}

class User {
  String? sId;
  String? firstName;
  String? lastName;
  String? email;
  String? password;
  String? role;
  int? iV;

  User(
      {this.sId,
      this.firstName,
      this.lastName,
      this.email,
      this.password,
      this.role,
      this.iV});

  User.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    firstName = json['firstName'];
    lastName = json['lastName'];
    email = json['email'];
    password = json['password'];
    role = json['role'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['firstName'] = firstName;
    data['lastName'] = lastName;
    data['email'] = email;
    data['password'] = password;
    data['role'] = role;
    data['__v'] = iV;
    return data;
  }
}
