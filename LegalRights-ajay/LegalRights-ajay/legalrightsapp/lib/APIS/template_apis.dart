import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:legalrights/APIS/base_url.dart';

Dio dio = Dio();

enum TemplateAPIsPAth { getTemplate }

extension TemplateAPIsPAthExtension on TemplateAPIsPAth {
  String get path {
    switch (this) {
      case TemplateAPIsPAth.getTemplate:
        return "/templates/templates/name/";
    }
  }
}

Future<Map<String, dynamic>> getTemplateApi({String? template}) async {
  try {
    final response = await dio.get(
      baseUrl + TemplateAPIsPAth.getTemplate.path + template!,
    );
    final responseBody = response.data;
    log("responseBody: $responseBody");
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
