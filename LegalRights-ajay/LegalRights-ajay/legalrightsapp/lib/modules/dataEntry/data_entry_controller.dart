import 'package:flutter/material.dart';
import 'package:get/get.dart';

class DataEntryController extends GetxController {
  final List<TextEditingController> dataEntryControllers = List.generate(
    9,
    (index) {
      return TextEditingController();
    },
  );
  TextEditingController dateController = TextEditingController();
  TextEditingController regDateController = TextEditingController();

  checkIfAnyFieldIsEmpty() {
    for (var i = 0; i < dataEntryControllers.length; i++) {
      if (dataEntryControllers[i].text.trim().isEmpty) return true;
    }
    if (dateController.text.trim().isEmpty) return true;
    if (regDateController.text.trim().isEmpty) return true;
    return false;
  }

  clearstate() {
    for (var controller in dataEntryControllers) {
      controller.clear();
    }
    dateController.clear();
    regDateController.clear();
    update();
  }

  // final TextEditingController dateController = TextEditingController();
  // final TextEditingController slipNoController = TextEditingController();
  // final TextEditingController docController = TextEditingController();
  // final TextEditingController firstPartyController = TextEditingController();
  // final TextEditingController secondPartyController = TextEditingController();
  // final TextEditingController propDetailController = TextEditingController();
  // final TextEditingController regNoController = TextEditingController();
  // final TextEditingController bNoController = TextEditingController();
  // final TextEditingController volNoController = TextEditingController();
  // final TextEditingController pageNoController = TextEditingController();
  // final TextEditingController regDateController = TextEditingController();
}

final List<String> hintTexts = [
  'Slip No',
  'Doc',
  '1st Party',
  '2nd Party',
  'Prop. Detail',
  'Reg. No',
  'B. No',
  'Vol No',
  'Page No',
];
