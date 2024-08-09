import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:get/get.dart';
import 'package:legalrights/models/template_model.dart';

class DashboardController extends GetxController {
  String? templateValue;
  TemplateModel? currentTemplate;
  final QuillController controller = QuillController(
      document: Document(),
      selection: const TextSelection.collapsed(offset: 0));

  updateQuillController(document) {
    controller.document = document;
    update();
  }
}
