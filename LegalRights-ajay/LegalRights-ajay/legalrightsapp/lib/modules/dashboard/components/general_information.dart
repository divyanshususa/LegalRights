import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_quill/quill_delta.dart';
import 'package:get/get.dart';
import 'package:legalrights/modules/dashboard/components/template_dropdown.dart';
import 'package:legalrights/modules/dashboard/dashboard_controller.dart';
import 'package:legalrights/utils/custom_widgets.dart';
import 'package:flutter_quill_delta_from_html/flutter_quill_delta_from_html.dart'
    as quill_html;

class GeneralInformation extends StatefulWidget {
  const GeneralInformation({super.key});

  @override
  State<GeneralInformation> createState() => _GeneralInformationState();
}

class _GeneralInformationState extends State<GeneralInformation> {
  List<TextEditingController> _controllers = [];
  @override
  void initState() {
    if (templateValues[Get.find<DashboardController>().templateValue!]!
        .isNotEmpty) {
      _controllers = List.generate(
          templateValues[Get.find<DashboardController>().templateValue!]!
              .length,
          (index) => TextEditingController());
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.sizeOf(context);
    return GetBuilder<DashboardController>(builder: (controller) {
      return templateValues[controller.templateValue!]!.isNotEmpty
          ? Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ListView.builder(
                    physics: const NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount:
                        templateValues[controller.templateValue!]!.length,
                    itemBuilder: (context, index) {
                      return CustomField4(
                          fieldName:
                              templateValues[controller.templateValue!]![index],
                          keyboardType: TextInputType.text,
                          controller: _controllers[index]);
                    }),
                const SizedBox(
                  height: 10,
                ),
                SizedBox(
                  width: size.width,
                  child: RoundedButtonWithTextAndBGColor(
                    text: "Submit",
                    onPressed: () {
                      replaceContent();
                    },
                  ),
                )
              ],
            )
          : const Text(
              "No General information available",
              style: TextStyle(color: Colors.black),
            );
    });
  }

  /// method to replace content
  void replaceContent() {
    DashboardController controller = Get.find<DashboardController>();
    String updatedContent = controller.currentTemplate!.template!.descriptions!;
    List<String> placeholders =
        templatePlaceholders[controller.templateValue] ?? [];
    for (var i = 0; i < _controllers.length; i++) {
      String value = _controllers[i].text.trim().isEmpty
          ? placeholders[i]
          : _controllers[i].text.trim();
      // Escape the placeholder for the regex
      String escapedPlaceholder =
          controller.templateValue == "BAYANA SAMPLE FINAL"
              ? RegExp.escape(placeholders[i])
              : RegExp.escape('\${**${placeholders[i]}**}');
      // Create the regex pattern to match the placeholder
      RegExp regex = RegExp(escapedPlaceholder);

      // Replace the placeholder with the actual value
      updatedContent = updatedContent.replaceAll(regex, value);
    }
    Delta deltaData = quill_html.HtmlToDelta(customBlocks: [PullquoteBlock()])
        .convert(updatedContent);
    controller.controller.document = Document.fromDelta(deltaData);
    controller.update();
    Navigator.pop(context);
  }
}

const Map<String, List<String>> templatePlaceholders = {
  "Sale Deed": [
    "Name of Colony",
    "Category of Colony",
    "Type of Property",
    "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.",
    "Cost of Construction notified by Government in Sq.Mtrs.",
    "Total Flat Area in Sq.Mtrs.",
    "Number of Floors",
    "Lift provided or not",
    "Year of Construction",
    "Age Factor",
    "Type of Colony",
    "Status of Building",
    "Use Factor",
  ],
  "Gift Deed": [
    "Name of Colony",
    "Category of Colony",
    "Type of Property",
    "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.",
    "Cost of Construction notified by Government in Sq.Mtrs.",
    "Total Plot Area in Sq.Mtrs.",
    "Land Share under Transfer in Sq.Mtrs/Percentage",
    "Total Plinth Area/FAR in Sq.Mtrs.",
    "Plinth Area under Transfer",
    "Parking Area under Transfer (wherever applicable)",
    "Number of Floors",
    "Lift provided or not (wherever applicable)",
    "Year of Construction",
    "Age Factor",
    "Type of Colony",
    "Status of Building",
    "Use Factor",
  ],
  "TWO PARTIES": [
    "Name of Colony",
    "Category of Colony",
    "Type of Property",
    "Minimum Rate of Land Notified by Govt.",
    "Cost of Construction notified by Government",
    "Total covered area with open land sq.mtrs.",
    "Plinth area in sq.mtrs.",
    "Total Flat Area in Sq.Mtrs.",
    "Number of Floors",
    "Covered area of F Floor",
    "Covered area of S.Floor",
    "Lift Provided or not",
    "Year of Construction",
    "Age Factor",
    "Type of Colony",
    "Status of Building",
    "Use Factor",
    "Location / Land Mark",
  ],
  "BAYANA SAMPLE FINAL": [
    "D1",
    "E1",
    "A1",
    "B2",
  ],
  "Will": [],
  "FAMILY WILL": [],
  "Rent Deed": [],
  "VEHICLE SALE AND PURTUESED-5": [],
};

const Map<String, List<String>> templateValues = {
  "Sale Deed": [
    "Name of Colony",
    "Category of Colony",
    "Type of Property",
    "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.",
    "Cost of Construction notified by Government in Sq.Mtrs.",
    "Total Flat Area in Sq.Mtrs.",
    "Number of Floors",
    "Lift provided or not",
    "Year of Construction",
    "Age Factor",
    "Type of Colony",
    "Status of Building",
    "Use Factor",
  ],
  "Gift Deed": [
    "Name of Colony",
    "Category of Colony",
    "Type of Property",
    "Minimum Rate of Land Notified by Govt. per Sq.Mtrs.",
    "Cost of Construction notified by Government in Sq.Mtrs.",
    "Total Plot Area in Sq.Mtrs.",
    "Land Share under Transfer in Sq.Mtrs/Percentage",
    "Total Plinth Area/FAR in Sq.Mtrs.",
    "Plinth Area under Transfer",
    "Parking Area under Transfer (wherever applicable)",
    "Number of Floors",
    "Lift provided or not (wherever applicable)",
    "Year of Construction",
    "Age Factor",
    "Type of Colony",
    "Status of Building",
    "Use Factor",
  ],
  "TWO PARTIES": [
    "Name of Colony",
    "Category of Colony",
    "Type of Property",
    "Minimum Rate of Land Notified by Govt.",
    "Cost of Construction notified by Government",
    "Total covered area with open land sq.mtrs.",
    "Plinth area in sq.mtrs.",
    "Total Flat Area in Sq.Mtrs.",
    "Number of Floors",
    "Covered area of F Floor",
    "Covered area of S.Floor",
    "Lift Provided or not",
    "Year of Construction",
    "Age Factor",
    "Type of Colony",
    "Status of Building",
    "Use Factor",
    "Location / Land Mark",
  ],
  "BAYANA SAMPLE FINAL": [
    "Date",
    "Ernst Amount",
    "Total Amount",
    "Balance Amount",
  ],
  "Will": [],
  "FAMILY WILL": [],
  "Rent Deed": [],
  "VEHICLE SALE AND PURTUESED-5": [],
};
