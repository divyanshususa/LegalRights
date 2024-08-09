import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:legalrights/APIS/data_entry_apis.dart';
import 'package:legalrights/models/data_entry_model.dart';
import 'package:legalrights/modules/dataEntry/data_entry_controller.dart';
import 'package:legalrights/utils/custom_widgets.dart';

class AddDataEntry extends StatelessWidget {
  const AddDataEntry({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<DataEntryController>(builder: (controller) {
      return SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.only(
              bottom: MediaQuery.of(context).viewInsets.bottom,
              left: 16,
              right: 16,
              top: 10),
          child: Column(
            children: [
              DateWidget(
                color: const Color.fromARGB(255, 0, 0, 0),
                title: "Date",
                date: controller.dateController.text,
                onTap: () async {
                  DateTime? pickedDate = await datePicker(context);
                  controller.dateController.text =
                      "${pickedDate!.year}-${pickedDate.month < 10 ? "0${pickedDate.month}" : pickedDate.month}-${pickedDate.day < 10 ? "0${pickedDate.day}" : pickedDate.day}";
                  controller.update();
                },
              ),
              const SizedBox(
                height: 15,
              ),
              Column(
                children: List.generate(
                  controller.dataEntryControllers.length,
                  (index) {
                    return FormField(
                      editingController: controller.dataEntryControllers[index],
                      hintText: hintTexts[index],
                    );
                  },
                ),
              ),
              DateWidget(
                color: const Color.fromARGB(255, 0, 0, 0),
                title: 'Reg. Date',
                date: controller.regDateController.text,
                onTap: () async {
                  DateTime? pickedDate = await datePicker(context);
                  controller.regDateController.text =
                      "${pickedDate!.year}-${pickedDate.month < 10 ? "0${pickedDate.month}" : pickedDate.month}-${pickedDate.day < 10 ? "0${pickedDate.day}" : pickedDate.day}";
                  controller.update();
                },
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
                    DataEntryModel model = DataEntryModel(
                      date: controller.dateController.text.trim(),
                      slipNo: controller.dataEntryControllers[0].text.trim(),
                      doc: controller.dataEntryControllers[1].text.trim(),
                      firstParty:
                          controller.dataEntryControllers[2].text.trim(),
                      secondParty:
                          controller.dataEntryControllers[3].text.trim(),
                      propDetail:
                          controller.dataEntryControllers[4].text.trim(),
                      regNo: controller.dataEntryControllers[5].text.trim(),
                      bNo: controller.dataEntryControllers[6].text.trim(),
                      volNo: controller.dataEntryControllers[7].text.trim(),
                      pageNo: controller.dataEntryControllers[8].text.trim(),
                      regDate: controller.regDateController.text.trim(),
                    );
                    var res = await adddataEntryApi(model.toJson());
                    if (res["status"]) {
                      showTopSnackBar(context, "Data Entry Successful");
                      controller.clearstate();
                      return;
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
                        content: Text("Failed to Add Data Entry"),
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
