
import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:legalrights/APIS/base_url.dart';

Dio dio = Dio();

enum GetAllPostAPIsPAth { getAllPosts, updatePost, createPost }

extension GetAllPostAPIsPAthExtension on GetAllPostAPIsPAth {
  String get path {
    switch (this) {
      case GetAllPostAPIsPAth.getAllPosts:
        return "/api/GetAllposts";
      case GetAllPostAPIsPAth.updatePost:
        return "/api/UpdateByIdposts/";
      case GetAllPostAPIsPAth.createPost:
        return "/api/Createposts";
    }
  }
}

Future<Map<String, dynamic>> getAllPostsApi() async {
  try {
    final response = await dio.get(
      baseUrl + GetAllPostAPIsPAth.getAllPosts.path,
    );
    final responseBody = response.data;
    return {
      "status": true,
      "statusCode": response.statusCode,
      "data": responseBody["posts"],
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

Future<Map<String, dynamic>> updatePost(
    String postId, Map<String, dynamic> updatedData) async {
  try {
    final response = await dio.put(
        baseUrl + GetAllPostAPIsPAth.updatePost.path + postId,
        data: updatedData);
    final responseBody = response.data;
    return {
      "status": true,
      "statusCode": response.statusCode,
      "data": responseBody["posts"],
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

Future<Map<String, dynamic>> createPost(Map<String, dynamic> model) async {
  try {
    final response = await dio
        .post(baseUrl + GetAllPostAPIsPAth.createPost.path, data: model);
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
