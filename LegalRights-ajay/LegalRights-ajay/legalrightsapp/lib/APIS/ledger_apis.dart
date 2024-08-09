
import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:legalrights/APIS/base_url.dart';

Dio dio = Dio();

enum LedgerEntryAPIsPAth { getLedgerEntry, addLedgerEntry }

extension LedgerEntryAPIsPAthExtension on LedgerEntryAPIsPAth {
  String get path {
    switch (this) {
      case LedgerEntryAPIsPAth.getLedgerEntry:
        return "/data-entry/get-ledger-entry";
      case LedgerEntryAPIsPAth.addLedgerEntry:
        return "/data-entry/create-ledger-entry";
    }
  }
}

Future<Map<String, dynamic>> getLedgerEntryApi() async {
  try {
    final response = await dio.get(
      baseUrl + LedgerEntryAPIsPAth.getLedgerEntry.path,
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

Future<Map<String, dynamic>> addLedgerEntryApi(
    Map<String, dynamic> data) async {
  try {
    final response = await dio
        .post(baseUrl + LedgerEntryAPIsPAth.addLedgerEntry.path, data: data);
    return {
      "status": true,
      "statusCode": response.statusCode,
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
