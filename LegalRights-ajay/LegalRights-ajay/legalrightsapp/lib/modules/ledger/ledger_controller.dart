import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LedgerController extends GetxController {
  final TextEditingController snoCreditController = TextEditingController(text: "3");
  final TextEditingController dateCreditController = TextEditingController();
  DateTime dateCredit = DateTime.now();
  final TextEditingController phoneNumberCreditController =
      TextEditingController(text: "1234567890");
  final TextEditingController creditCreditController = TextEditingController(text: "1000");
  final TextEditingController balanceCreditController = TextEditingController(text: "1000");
  final TextEditingController dateDebitController = TextEditingController();
  DateTime dateDebit = DateTime.now();
  final TextEditingController debitDebitController = TextEditingController(text: "1000");
  final TextEditingController balanceDebitController = TextEditingController(text: "1000");
  final TextEditingController snoDebitController = TextEditingController(text: "3");

  checkIfAnyFieldIsEmpty() {
    final List<TextEditingController> ledgerEntryControllers = [
      snoCreditController,
      phoneNumberCreditController,
      creditCreditController,
      balanceCreditController,
      debitDebitController,
      balanceDebitController,
      snoDebitController,
    ];
    for (var i = 0; i < ledgerEntryControllers.length; i++) {
      if (ledgerEntryControllers[i].text.trim().isEmpty) return true;
    }
    if (dateCreditController.text.trim().isEmpty) return true;
    if (dateDebitController.text.trim().isEmpty) return true;
    return false;
  }

  clearstate() {
    final List<TextEditingController> ledgerEntryControllers = [
      snoCreditController,
      phoneNumberCreditController,
      creditCreditController,
      balanceCreditController,
      debitDebitController,
      balanceDebitController,
      snoDebitController,
    ];
    for (var controller in ledgerEntryControllers) {
      controller.clear();
    }
    dateCreditController.clear();
    dateDebitController.clear();
    update();
  }
}

final List<String> hintTexts = [
  'Sno Credit', // For 'snoCredit'
  'Phone Number Credit', // For 'phoneNumberCredit'
  'Credit Credit', // For 'creditCredit'
  'Balance Credit', // For 'balanceCredit'
  'Debit Debit', // For 'debitDebit'
  'Balance Debit', // For 'balanceDebit'
  'Sno Debit', // For 'snoDebit'
];
