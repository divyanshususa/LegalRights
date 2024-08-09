import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart' as quill;
import 'package:get/get.dart';
import 'package:legalrights/modules/dashboard/dashboard_controller.dart';

class QuillEditor extends StatelessWidget {
  const QuillEditor({super.key});

  @override
  Widget build(BuildContext context) {
    ScrollController scrollController = ScrollController();
    // final QuillEditorController controller = QuillEditorController();
    return GetBuilder<DashboardController>(builder: (dashboardController) {
      return Column(
        children: [
          quill.QuillToolbar.simple(
              configurations: quill.QuillSimpleToolbarConfigurations(
            sharedConfigurations: const quill.QuillSharedConfigurations(
                // extraConfigurations:
                ),
            multiRowsDisplay: false,
            showAlignmentButtons: true,
            color: Colors.white,
            showSmallButton: true,
            showLineHeightButton: true,
            controller: dashboardController.controller,
          )),
          SizedBox(
            height: MediaQuery.of(context).size.height - 280,
            child: SingleChildScrollView(
              child: quill.QuillEditor(
                // padding
                configurations: quill.QuillEditorConfigurations(
                  autoFocus: false,
                  scrollable: true,
                  // scrollPhysics: const NeverScrollableScrollPhysics(),
                  // docu
                  controller: dashboardController.controller,
                  // placeholder: dashboardController
                  //     .currentTemplate!.template!.descriptions!
                  // elementOptions: const quill.QuillEditorElementOptions(
                  //     orderedList: quill.QuillEditorOrderedListElementOptions(
                  //         customWidget: Text("hi"))),
                  // unknownEmbedBuilder:
                  //     quill.EmbedButtonBuilder(controller, 24)
                ),

                // if you want to control the scroll define a
                // scroll controller and pass it here
                scrollController: scrollController,
                // set true if you want the editor to be scrollable
                // when the keyboard appears or too much content
                // pass a focus node if you want to control
                // when the keyboard appears
                focusNode: FocusNode(),
                // if true the keyboard will appear
                // when the widget is rendered
                // set true if you want to disable editing
                // set true if you want the editor to expand and
                // occupy all the available space
                // if there is no content this
                // text will be displayed
              ),
            ),
          )

          // SingleChildScrollView(
          //   child:
          //       GetBuilder<DashboardController>(builder: (dashboardController) {
          //     return SizedBox(
          //       height: MediaQuery.of(context).size.height - 280,
          //       child: QuillHtmlEditor(
          //         text: dashboardController
          //             .currentTemplate!.template!.descriptions,
          //         hintText: 'Hint text goes here',
          //         controller: controller,
          //         isEnabled: true,
          //         minHeight: 300,
          //         // textStyle: _editorTextStyle,
          //         // hintTextStyle: _hintTextStyle,
          //         hintTextAlign: TextAlign.start,
          //         padding: const EdgeInsets.only(left: 10, top: 5, right: 10),
          //         hintTextPadding: EdgeInsets.zero,
          //         backgroundColor: Colors.white,
          //         onFocusChanged: (hasFocus) =>
          //             debugPrint('has focus $hasFocus'),
          //         onTextChanged: (text) =>
          //             debugPrint('widget text change $text'),
          //         onEditorCreated: () => debugPrint('Editor has been loaded'),
          //         onEditingComplete: (s) => debugPrint('Editing completed $s'),
          //         onEditorResized: (height) =>
          //             debugPrint('Editor resized $height'),
          //         onSelectionChanged: (sel) =>
          //             debugPrint('${sel.index},${sel.length}'),
          //         loadingBuilder: (context) {
          //           return const Center(
          //               child: CircularProgressIndicator(
          //             strokeWidth: 0.4,
          //           ));
          //         },
          //       ),
          //     );
          //   }),
          // ),
        ],
      );
    });
  }
}
