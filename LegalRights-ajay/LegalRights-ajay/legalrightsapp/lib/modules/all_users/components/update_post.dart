import 'package:flutter/material.dart';
import 'package:flutter_quill/flutter_quill.dart' as quill;
import 'package:legalrights/APIS/get_all_post_apis.dart';
import 'package:legalrights/models/template_model.dart';
import 'package:legalrights/modules/dashboard/components/template_dropdown.dart';
import 'package:legalrights/utils/app_loading_widget.dart';
import 'package:vsc_quill_delta_to_html/vsc_quill_delta_to_html.dart';
import 'package:flutter_quill_delta_from_html/flutter_quill_delta_from_html.dart'
    as quill_html;

class UpdatePostPage extends StatefulWidget {
  final TemplateData template;
  const UpdatePostPage({super.key, required this.template});

  @override
  State<UpdatePostPage> createState() => _UpdatePostPageState();
}

class _UpdatePostPageState extends State<UpdatePostPage> {
  bool isLoading = true;
  final quill.QuillController controller = quill.QuillController(
      document: quill.Document(),
      selection: const TextSelection.collapsed(offset: 0));

  @override
  void initState() {
    controller.document = quill.Document.fromDelta(
        quill_html.HtmlToDelta(customBlocks: [PullquoteBlock()])
            .convert(widget.template.descriptions!));
    isLoading = false;
    setState(() {});
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      backgroundColor: Colors.white,
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
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
                  final converter = QuillDeltaToHtmlConverter(
                    controller.document.toDelta().toJson(),
                    ConverterOptions.forEmail(),
                  );

                  final html = converter.convert();
                  TemplateData updatedTemplateData = TemplateData(
                      createdDate: widget.template.createdDate!,
                      sId: widget.template.sId!,
                      descriptions: html,
                      name: widget.template.name!,
                      uId: widget.template.uId!,
                      iV: widget.template.iV!,
                      templeate: widget.template.templeate!);
                  loadingWidget(context);
                  var res = await updatePost(
                      widget.template.sId!, updatedTemplateData.toJson());
                  if (res['status']) {
                    Navigator.pop(context);
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Update Success')));
                    Navigator.pop(context);
                  } else {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Update Failed')));
                  }
                },
                child: const Text("Update",
                    style: TextStyle(color: Colors.white))),
          ),
        ],
      ),
      body: SafeArea(
        child: isLoading
            ? const Center(child: CircularProgressIndicator())
            : Column(
                children: [
                  SingleChildScrollView(
                    child: SizedBox(
                      height: size.height - 84,
                      child: QuillEditor(controller: controller),
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}

class QuillEditor extends StatelessWidget {
  final quill.QuillController controller;
  const QuillEditor({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    ScrollController scrollController = ScrollController();
    // final QuillEditorController controller = QuillEditorController();
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
          controller: controller,
        )),
        SizedBox(
          height: MediaQuery.of(context).size.height - 126,
          child: SingleChildScrollView(
            child: quill.QuillEditor(
              // padding
              configurations: quill.QuillEditorConfigurations(
                autoFocus: false,
                scrollable: true,
                controller: controller,
              ),

              scrollController: scrollController,

              focusNode: FocusNode(),
            ),
          ),
        )
      ],
    );
  }
}
