
import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:legalrights/APIS/base_url.dart';

Dio dio = Dio();

enum HistoryAPIsPAth { getHistory }

extension HistoryAPIsPAthExtension on HistoryAPIsPAth {
  String get path {
    switch (this) {
      case HistoryAPIsPAth.getHistory:
        return "/api/getpostbyuserid/";
    }
  }
}

Future<Map<String, dynamic>> getHistoryApi({String? userId}) async {
  try {
    final response = await dio.get(
      baseUrl + HistoryAPIsPAth.getHistory.path + userId!,
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
