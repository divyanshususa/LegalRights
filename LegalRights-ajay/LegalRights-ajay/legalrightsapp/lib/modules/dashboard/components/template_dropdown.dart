import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart';
import 'package:flutter_quill/quill_delta.dart';
import 'package:get/get.dart';
import 'package:legalrights/APIS/template_apis.dart';
import 'package:legalrights/models/template_model.dart';
import 'package:legalrights/modules/dashboard/dashboard_controller.dart';
import 'package:legalrights/utils/app_loading_widget.dart';
import 'package:legalrights/utils/app_textStyles.dart';
import 'package:flutter_quill_delta_from_html/flutter_quill_delta_from_html.dart'
    as quill_html;
import 'package:flutter_quill_delta_from_html/flutter_quill_delta_from_html.dart';
import 'package:html/dom.dart' as dom;

class TemplateDropDown extends StatelessWidget {
  const TemplateDropDown({super.key});

  @override
  Widget build(BuildContext context) {
    return GetBuilder<DashboardController>(builder: (controller) {
      return DropdownButton<String>(
        dropdownColor: Colors.white,
        value: controller.templateValue,
        hint: const TextWithStyle(text: 'Select a template'),
        items: const [
          DropdownMenuItem(
            value: 'Sale Deed',
            child: TextWithStyle(text: 'Sale Deed'),
          ),
          DropdownMenuItem(
            value: 'TWO PARTIES',
            child: TextWithStyle(text: 'TWO PARTIES'),
          ),
          DropdownMenuItem(
            value: 'Rent Deed',
            child: TextWithStyle(text: 'Rent Deed'),
          ),
          DropdownMenuItem(
            value: 'Will',
            child: TextWithStyle(text: 'Will'),
          ),
          DropdownMenuItem(
            value: 'FAMILY WILL',
            child: TextWithStyle(text: 'FAMILY WILL'),
          ),
          DropdownMenuItem(
            value: 'Gift Deed',
            child: TextWithStyle(text: 'Gift Deed'),
          ),
          DropdownMenuItem(
            value: 'VEHICLE SALE AND PURTUESED-5',
            child: TextWithStyle(text: 'VEHICLE SALE AND PURTUESED-5'),
          ),
          DropdownMenuItem(
            value: 'BAYANA SAMPLE FINAL',
            child: TextWithStyle(text: 'BAYANA SAMPLE FINAL'),
          ),
          // Add more items as needed
        ],
        onChanged: (value) async {
          loadingWidget(context);
          controller.templateValue = value;
          await handleTemplateChange(value!);
          controller.update();
          Navigator.pop(context);
        },
      );
    });
  }
}

Future<void> handleTemplateChange(String value) async {
  Map<String, dynamic> res = await getTemplateApi(template: value);
  if (res["status"]) {
    DashboardController controller = Get.find<DashboardController>();
    TemplateModel template = TemplateModel.fromJson(res["data"]);
    controller.currentTemplate = template;
    Delta deltaData = quill_html.HtmlToDelta(customBlocks: [PullquoteBlock()])
        .convert(controller.currentTemplate!.template!.descriptions!);
    controller.controller.document = Document.fromDelta(deltaData);
    controller.update();
  }
}

/// Custom block handler for <pullquote> elements.
class PullquoteBlock extends CustomHtmlPart {
  @override
  bool matches(dom.Element element) {
    //you can put here the validation that you want
    //
    // To detect a <p>, you just need to do something like:
    // element.localName == 'p'
    return element.localName == 'pullquote';
  }

  @override
  List<Operation> convert(dom.Element element,
      {Map<String, dynamic>? currentAttributes}) {
    final Delta delta = Delta();
    final Map<String, dynamic> attributes =
        currentAttributes != null ? Map.from(currentAttributes) : {};

    // Extract custom attributes from the <pullquote> element
    // The attributes represents the data into a html tag
    // at this point, <pullquote> should have these attributes
    //
    // <pullquote data-author="John Doe" data-style="italic">
    // These attributes can be optional, so do you need to ensure to not use "!"
    // to avoid any null conflict
    final author = element.attributes['data-author'];
    final style = element.attributes['data-style'];

    // Apply custom attributes to the Delta operations
    if (author != null) {
      delta.insert('Pullquote: "${element.text}" by $author', attributes);
    } else {
      delta.insert('Pullquote: "${element.text}"', attributes);
    }

    if (style != null && style.toLowerCase() == 'italic') {
      attributes['italic'] = true;
    }

    delta.insert('\n', attributes);

    return delta.toList();
  }
}
