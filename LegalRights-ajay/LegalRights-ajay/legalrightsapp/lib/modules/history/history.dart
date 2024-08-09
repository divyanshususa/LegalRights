
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:legalrights/APIS/history_apis.dart';
import 'package:legalrights/controllers/app_controller.dart';
import 'package:legalrights/modules/components/app_drawer.dart';
import 'package:legalrights/utils/app_textStyles.dart';

import 'package:syncfusion_flutter_datagrid/datagrid.dart';
import 'package:flutter_html/flutter_html.dart';

class HistoryPage extends StatefulWidget {
  const HistoryPage({super.key});

  @override
  _HistoryPageState createState() => _HistoryPageState();
}

class _HistoryPageState extends State<HistoryPage> {
  late DocumentDataSource _documentDataSource;
  final TextEditingController _searchController = TextEditingController();
  bool isLoading = true;
  bool isError = false;
  @override
  void initState() {
    super.initState();
    getDocuments();
    _searchController.addListener(_onSearchChanged);
  }

  void _onSearchChanged() {
    _documentDataSource.updateSearch(_searchController.text);
  }

  getDocuments() async {
    var res =
        await getHistoryApi(userId: Get.find<AppController>().user.user!.sId!);
    if (res["status"]) {
      List<Document> data = [];
      for (var i = 0; i < res["data"].length; i++) {
        data.add(Document.fromJson(res["data"][i]));
      }
      _documentDataSource =
          DocumentDataSource(documents: data, context: context);
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
    } else {
      if (mounted) {
        setState(() {
          isLoading = false;
          isError = true;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.sizeOf(context);
    return Scaffold(
      resizeToAvoidBottomInset: false,
      backgroundColor: Colors.white,
      drawer: const AppDrawer(),
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        title: const Text('History'),
      ),
      body: isLoading
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : isError
              ? const Center(
                  child: TextWithStyle(
                    text: "No data or something went wrong",
                  ),
                )
              : SingleChildScrollView(
                  child: Padding(
                    padding: const EdgeInsets.only(
                      left: 16,
                      right: 16,
                      top: 16,
                    ),
                    child: Column(
                      children: [
                        TextField(
                          controller: _searchController,
                          decoration: const InputDecoration(
                            labelText: 'Search',
                            border: OutlineInputBorder(),
                            prefixIcon: Icon(Icons.search),
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        SizedBox(
                          height: size.height - 154,
                          child: SfDataGrid(
                            source: _documentDataSource,
                            columns: <GridColumn>[
                              GridColumn(
                                  columnName: 'Name',
                                  width: size.width / 3 - 12,
                                  label: Container(
                                      padding: const EdgeInsets.all(8.0),
                                      alignment: Alignment.center,
                                      child: const Text(
                                        'Name',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ))),
                              GridColumn(
                                  columnName: 'Created Date',
                                  width: size.width / 3 - 12,
                                  label: Container(
                                      padding: const EdgeInsets.all(8.0),
                                      alignment: Alignment.center,
                                      child: const Text(
                                        'Created Date',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ))),
                              GridColumn(
                                  width: size.width / 3 - 12,
                                  columnName: 'Preview',
                                  label: Container(
                                      padding: const EdgeInsets.all(8.0),
                                      alignment: Alignment.center,
                                      child: const Text(
                                        'Preview',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ))),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
    );
  }
}

class DocumentDataSource extends DataGridSource {
  DocumentDataSource(
      {required List<Document> documents, required this.context}) {
    _documents = documents
        .map<DataGridRow>((doc) => DataGridRow(cells: [
              DataGridCell<String>(columnName: 'Name', value: doc.name),
              DataGridCell<String>(
                  columnName: 'Created Date',
                  value: (DateFormat.yMMMd()
                      .format(DateTime.parse(doc.createdDate!)))),
              DataGridCell<Document>(columnName: 'Preview', value: doc),
            ]))
        .toList();
    _filteredData = _documents;
  }
  final BuildContext context;
  List<DataGridRow> _documents = [];
  List<DataGridRow> _filteredData = [];

  @override
  List<DataGridRow> get rows => _filteredData;

  @override
  DataGridRowAdapter buildRow(DataGridRow row) {
    return DataGridRowAdapter(cells: [
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(row.getCells()[0].value.toString()),
      ),
      Padding(
        padding: const EdgeInsets.all(8.0),
        child: Text(row.getCells()[1].value),
      ),
      Container(
        padding: const EdgeInsets.all(8.0),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
              padding: EdgeInsets.zero,
              backgroundColor: const Color.fromARGB(255, 33, 100, 243)),
          onPressed: () {
            Document document = row.getCells()[2].value;

            showDialog(
              context: context,
              builder: (context) => DocumentPreviewDialog(document: document),
            );
          },
          child: const TextWithStyle(
            text: 'Preview',
            textStyle: TextStyle(fontSize: 12, color: Colors.white),
          ),
        ),
      ),
    ]);
  }

  void updateSearch(String query) {
    if (query.isEmpty) {
      _filteredData = _documents;
    } else {
      _filteredData = _documents.where((dataGridRow) {
        return dataGridRow.getCells().any((dataGridCell) {
          return dataGridCell.value
              .toString()
              .toLowerCase()
              .contains(query.toLowerCase());
        });
      }).toList();
    }
    notifyListeners();
  }
}

class DocumentPreviewDialog extends StatelessWidget {
  final Document document;

  const DocumentPreviewDialog({super.key, required this.document});

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.sizeOf(context);
    return Dialog(
      backgroundColor: Colors.white,
      surfaceTintColor: Colors.white,
      insetPadding: const EdgeInsets.all(8),
      child: SingleChildScrollView(
        child: SizedBox(
            width: size.width - 10,
            child: Column(
              children: [
                const SizedBox(
                  height: 10,
                ),
                TextWithStyle(
                  text: document.name!,
                  textStyle: const TextStyle(
                      fontSize: 20, fontWeight: FontWeight.bold),
                ),
                const SizedBox(
                  height: 10,
                ),
                Html(data: document.description),
                const SizedBox(
                  height: 10,
                ),
              ],
            )),
      ),
    );
  }
}

class Document {
  String? sId;
  String? description;
  String? userId;
  bool? templeate;
  String? name;
  String? createdDate;
  int? iV;

  Document(
      {this.sId,
      this.description,
      this.userId,
      this.templeate,
      this.name,
      this.createdDate,
      this.iV});

  Document.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    description = json['description'];
    userId = json['userId'];
    templeate = json['Templeate'];
    name = json['Name'];
    createdDate = json['CreatedDate'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['description'] = description;
    data['userId'] = userId;
    data['Templeate'] = templeate;
    data['Name'] = name;
    data['CreatedDate'] = createdDate;
    data['__v'] = iV;
    return data;
  }
}
