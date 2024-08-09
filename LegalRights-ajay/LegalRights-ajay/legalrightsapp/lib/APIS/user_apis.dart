
import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:legalrights/APIS/base_url.dart';

Dio dio = Dio();

enum UserApiPath { login, user, register }

extension UserApiPathExtension on UserApiPath {
  String get path {
    switch (this) {
      case UserApiPath.login:
        return "/login/auth";
      case UserApiPath.register:
        return "/user/register";
      case UserApiPath.user:
        return "/user";
    }
  }
}

Future<Map<String, dynamic>> loginUser(
    {String? email, String? password}) async {
  try {
    final response = await dio.post(
      baseUrl + UserApiPath.login.path,
      data: {
        "email": email,
        "password": password,
      },
    );
    final responseBody = response.data;
    return {
      "status": true,
      "statusCode": response.statusCode,
      "data": responseBody,
    };
  } catch (e) {
    if (e is DioException) {
      // Handle DioError and access the response
      final dioError = e;
      final response = dioError.response;
      if (response != null) {
        return {
          "status": false,
          "statusCode": response.statusCode ?? 0,
          "data": response.data?['message'],
        };
      }
    }

    // Handle other exceptions here
    if (kDebugMode) {
      log('Error: $e');
    }
    return {
      "status": false,
      "statusCode":
          0, // You can set a default status code or handle differently
      "data": 'An error occurred',
    };
  }
}

Future<Map<String, dynamic>> registerUser(
    Map<String, dynamic> userModel) async {
  try {
    final response = await dio.post(
      baseUrl + UserApiPath.register.path,
      data: userModel,
    );
    final responseBody = response.data;
    return {
      "status": true,
      "statusCode": response.statusCode,
      "data": responseBody,
    };
  } catch (e) {
    if (e is DioException) {
      // Handle DioError and access the response
      final dioError = e;
      final response = dioError.response;
      if (response != null) {
        return {
          "status": false,
          "statusCode": response.statusCode ?? 0,
          "data": response.data?['message'],
        };
      }
    }

    // Handle other exceptions here
    if (kDebugMode) {
      log('Error: $e');
    }
    return {
      "status": false,
      "statusCode":
          0, // You can set a default status code or handle differently
      "data": 'An error occurred',
    };
  }
}

Future<Map<String, dynamic>> getAllUsers() async {
  try {
    final response = await dio.get(
      baseUrl + UserApiPath.user.path,
    );
    final responseBody = response.data;
    return {
      "status": true,
      "statusCode": response.statusCode,
      "data": responseBody["users"],
    };
  } catch (e) {
    if (e is DioException) {
      // Handle DioError and access the response
      final dioError = e;
      final response = dioError.response;
      if (response != null) {
        return {
          "status": false,
          "statusCode": response.statusCode ?? 0,
          "data": response.data?['message'],
        };
      }
    }

    // Handle other exceptions here
    if (kDebugMode) {
      log('Error: $e');
    }
    return {
      "status": false,
      "statusCode":
          0, // You can set a default status code or handle differently
      "data": 'An error occurred',
    };
  }
}
