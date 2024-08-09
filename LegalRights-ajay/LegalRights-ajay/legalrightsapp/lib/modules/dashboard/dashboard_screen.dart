import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:legalrights/APIS/get_all_post_apis.dart';
import 'package:legalrights/controllers/app_controller.dart';
import 'package:legalrights/models/create_post_model.dart';
import 'package:legalrights/modules/components/app_drawer.dart';
import 'package:legalrights/modules/dashboard/components/tabs.dart';
import 'package:legalrights/modules/dashboard/components/template_dropdown.dart';
import 'package:legalrights/modules/dashboard/dashboard_controller.dart';
import 'package:legalrights/utils/app_loading_widget.dart';
import 'package:legalrights/utils/app_textStyles.dart';
import 'package:vsc_quill_delta_to_html/vsc_quill_delta_to_html.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: false,
      drawer: const AppDrawer(),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 255, 255, 255),
        surfaceTintColor: Colors.white,
        title: const Text('Sale & Purchase'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 10),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                  backgroundColor: const Color.fromARGB(255, 33, 72, 243),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  )),
              onPressed: () async {
                if (Get.find<DashboardController>().templateValue == null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Please select a template"),
                    ),
                  );
                  return;
                }
                final converter = QuillDeltaToHtmlConverter(
                  Get.find<DashboardController>()
                      .controller
                      .document
                      .toDelta()
                      .toJson(),
                  ConverterOptions.forEmail(),
                );
                final html = converter.convert();
                CreatePostModel model = CreatePostModel(
                    name: Get.find<DashboardController>().templateValue!,
                    description: html,
                    userId: Get.find<AppController>().user.user!.sId!);
                loadingWidget(context);
                var res = await createPost(model.toJson());
                if (res["status"]) {
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Post created successfully"),
                    ),
                  );
                } else {
                  Navigator.pop(context);

                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text("Failed to create post"),
                    ),
                  );
                }
              },
              child: const Text(
                "Create Post",
                style: TextStyle(color: Colors.white),
              ),
            ),
          )
        ],
      ),
      body: Center(
        child: GetBuilder<DashboardController>(builder: (controller) {
          return SingleChildScrollView(
            child: Column(
              mainAxisAlignment: controller.templateValue != null
                  ? MainAxisAlignment.start
                  : MainAxisAlignment.center,
              children: [
                TextWithStyle(
                  text: "Choose a Template",
                  textStyle: TextStyle(
                      fontSize: controller.templateValue != null ? 16 : 20,
                      fontWeight: FontWeight.bold),
                ),
                SizedBox(
                  height: controller.templateValue != null ? 5 : 30,
                ),
                const TemplateDropDown(),
                controller.templateValue != null ? const Header() : Container()
              ],
            ),
          );
        }),
      ),
    );
  }
}
