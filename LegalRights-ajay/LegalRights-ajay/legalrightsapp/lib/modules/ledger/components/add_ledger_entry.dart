import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:legalrights/APIS/ledger_apis.dart';
import 'package:legalrights/models/ledger_entry_model.dart';
import 'package:legalrights/modules/ledger/ledger_controller.dart';
import 'package:legalrights/utils/custom_widgets.dart';

class AddLedgerEntry extends StatelessWidget {
  const AddLedgerEntry({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<LedgerController>(builder: (controller) {
      return SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.only(
              bottom: MediaQuery.of(context).viewInsets.bottom,
              left: 16,
              right: 16,
              top: 10),
          child: Column(
            children: [
              FormField(
                editingController: controller.snoCreditController,
                hintText: hintTexts[0],
              ),
              const SizedBox(
                height: 15,
              ),
              DateWidget(
                color: const Color.fromARGB(255, 0, 0, 0),
                title: "Date Credit",
                date: controller.dateCreditController.text,
                onTap: () async {
                  DateTime? pickedDate = await datePicker(context);
                  if (pickedDate != null) {
                    controller.dateCredit = pickedDate;
                    controller.dateCreditController.text =
                        "${pickedDate.year}-${pickedDate.month < 10 ? "0${pickedDate.month}" : pickedDate.month}-${pickedDate.day < 10 ? "0${pickedDate.day}" : pickedDate.day}";
                    controller.update();
                  }
                },
              ),
              const SizedBox(
                height: 15,
              ),
              FormField(
                editingController: controller.phoneNumberCreditController,
                hintText: hintTexts[1],
              ),
              const SizedBox(
                height: 15,
              ),
              FormField(
                editingController: controller.creditCreditController,
                hintText: hintTexts[2],
              ),
              const SizedBox(
                height: 15,
              ),
              FormField(
                editingController: controller.balanceCreditController,
                hintText: hintTexts[3],
              ),
              const SizedBox(
                height: 15,
              ),
              DateWidget(
                color: const Color.fromARGB(255, 0, 0, 0),
                title: "Date Debit",
                date: controller.dateDebitController.text,
                onTap: () async {
                  DateTime? pickedDate = await datePicker(context);
                  if (pickedDate != null) {
                    controller.dateDebit = pickedDate;
                    controller.dateDebitController.text =
                        "${pickedDate.year}-${pickedDate.month < 10 ? "0${pickedDate.month}" : pickedDate.month}-${pickedDate.day < 10 ? "0${pickedDate.day}" : pickedDate.day}";
                    controller.update();
                  }
                },
              ),
              const SizedBox(
                height: 15,
              ),
              FormField(
                editingController: controller.debitDebitController,
                hintText: hintTexts[4],
              ),
              const SizedBox(
                height: 15,
              ),
              FormField(
                editingController: controller.balanceDebitController,
                hintText: hintTexts[5],
              ),
              const SizedBox(
                height: 15,
              ),
              FormField(
                editingController: controller.snoDebitController,
                hintText: hintTexts[6],
              ),
              const SizedBox(
                height: 15,
              ),
              RoundedButtonWithTextAndBGColor(
                text: "Submit",
                onPressed: () async {
                  if (controller.checkIfAnyFieldIsEmpty()) {
                    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                      content: Text("Please fill all the fields"),
                    ));
                    return;
                  } else {
                    LedgerModel model = LedgerModel(
                      dateCredit: controller.dateCredit.toIso8601String(),
                      snoCredit:
                          int.parse(controller.snoCreditController.text.trim()),
                      phoneNumberCredit:
                          controller.phoneNumberCreditController.text.trim(),
                      creditCredit: int.parse(
                          controller.creditCreditController.text.trim()),
                      balanceCredit: int.parse(
                          controller.balanceCreditController.text.trim()),
                      debitDebit: int.parse(
                          controller.debitDebitController.text.trim()),
                      balanceDebit: int.parse(
                          controller.balanceDebitController.text.trim()),
                      snoDebit:
                          int.parse(controller.snoDebitController.text.trim()),
                      dateDebit: controller.dateDebit.toIso8601String(),
                    );
                    var res = await addLedgerEntryApi(model.toJson());
                    if (res["status"]) {
                      showTopSnackBar(context, "Ledger Entry Successful");
                      controller.clearstate();
                      return;
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                        content: Text("Failed to Add Ledger Entry"),
                        backgroundColor: Colors.red,
                      ));
                      return;
                    }
                  }
                },
              )
            ],
          ),
        ),
      );
    });
  }
}

class FormField extends StatelessWidget {
  final String hintText;
  final TextEditingController editingController;
  const FormField(
      {super.key, required this.editingController, required this.hintText});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CustomField4(
            fieldName: hintText,
            keyboardType: TextInputType.text,
            controller: editingController),
        const SizedBox(
          height: 15,
        ),
      ],
    );
  }
}
