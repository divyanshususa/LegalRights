
import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:legalrights/APIS/base_url.dart';

Dio dio = Dio();

enum DataEntryAPIsPAth { getdataEntry, addDataEntry }

extension DataEntryAPIsPAthExtension on DataEntryAPIsPAth {
  String get path {
    switch (this) {
      case DataEntryAPIsPAth.getdataEntry:
        return "/data-entry/get-entries";
      case DataEntryAPIsPAth.addDataEntry:
        return "/data-entry/create-entry";
    }
  }
}

Future<Map<String, dynamic>> getdataEntryApi() async {
  try {
    final response = await dio.get(
      baseUrl + DataEntryAPIsPAth.getdataEntry.path,
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

Future<Map<String, dynamic>> adddataEntryApi(Map<String, dynamic> data) async {
  try {
    final response = await dio
        .post(baseUrl + DataEntryAPIsPAth.addDataEntry.path, data: data);
    return {
      "status": true,
      "statusCode": response.statusCode,
    };
  } catch (e) {
    log("error adding data entry $e");
    if (e is DioException) {
      // Handle DioError and access the response
      final dioError = e;
      final response = dioError.response;
      if (response != null) {
        return {
          "status": false,
          "statusCode": response.statusCode ?? 0,
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
    };
  }
}
