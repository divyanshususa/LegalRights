// ignore_for_file: file_names

import 'package:get_storage/get_storage.dart';

class GetStorageServices {
  static GetStorage getStorage = GetStorage();
  static String userEmail = 'userEmail';
  static String password = 'pass';
  static String accessToken = 'accessToken';

  setUserEmail(String tokenValue) async {
    await getStorage.write(userEmail, tokenValue);
  }

  getUserEmail() async {
    return await getStorage.read(userEmail);
  }

  setPassword(String passwordValue) async {
    await getStorage.write(password, password);
  }

  getPassword() async {
    return await getStorage.read(password);
  }

  setAccessToken(String tokenValue) async {
    await getStorage.write(accessToken, tokenValue);
  }

  getAccessToken() async {
    return await getStorage.read(accessToken);
  }

  saveLoginDataToStorage(
      {String? password, String? email, String? token}) async {
    setUserEmail(email!);
    setPassword(password!);
    if (token != null) {
      setAccessToken(token);
    }
  }

  removeDataFromStorage() async {
    await getStorage.remove(userEmail);
    await getStorage.remove(password);
    await getStorage.remove(accessToken);
  }

  Future<Map<String, String?>> getLoginDataFromStorage() async {
    return {
      "email": await getUserEmail(),
      "password": await getPassword(),
      "token": await getAccessToken(),
    };
  }
}
