
import 'package:flutter/material.dart';
import 'package:legalrights/APIS/get_all_post_apis.dart';
import 'package:legalrights/APIS/user_apis.dart';
import 'package:legalrights/models/template_model.dart';
import 'package:legalrights/models/user_model.dart';
import 'package:legalrights/modules/all_users/components/update_post.dart';
import 'package:legalrights/modules/components/admin_app_drawer.dart';
import 'package:legalrights/utils/app_textStyles.dart';

import 'package:syncfusion_flutter_datagrid/datagrid.dart';
import 'package:flutter_html/flutter_html.dart';

class AllUsersPage extends StatefulWidget {
  const AllUsersPage({super.key});

  @override
  _AllUsersPageState createState() => _AllUsersPageState();
}

class _AllUsersPageState extends State<AllUsersPage> {
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

  List<TemplateData> getUserSpecificPosts(
      List<TemplateData> allPosts, String userId) {
    List<TemplateData> data =
        allPosts.where((post) => post.uId == userId).toList();

    return data;
  }

  getDocuments() async {
    var res = await getAllUsers();
    if (res["status"]) {
      List<User> data = [];
      for (var i = 0; i < res["data"].length; i++) {
        data.add(User.fromJson(res["data"][i]));
      }
      var postRes = await getAllPostsApi();
      if (postRes["status"]) {
        List<TemplateData> posts = [];
        for (var i = 0; i < postRes["data"].length; i++) {
          posts.add(TemplateData.fromJson(postRes["data"][i]));
        }
        List<Map<User, List<TemplateData>>> finalData = [];
        for (var i = 0; i < data.length; i++) {
          finalData.add({data[i]: getUserSpecificPosts(posts, data[i].sId!)});
        }
        _documentDataSource =
            DocumentDataSource(documents: finalData, context: context);
        if (mounted) {
          setState(() {
            isLoading = false;
          });
        }
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
      drawer: const AdminAppDrawer(),
      appBar: AppBar(
        backgroundColor: Colors.white,
        surfaceTintColor: Colors.white,
        title: const Text('All Users'),
      ),
      body: isLoading
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : isError
              ? const Center(
                  child: TextWithStyle(
                    text: "Something went wrong",
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
                                  columnName: 'First Name',
                                  width: size.width / 3 - 12,
                                  label: Container(
                                      padding: const EdgeInsets.all(8.0),
                                      alignment: Alignment.center,
                                      child: const Text(
                                        'First Name',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ))),
                              GridColumn(
                                  columnName: 'Last Name',
                                  width: size.width / 3 - 12,
                                  label: Container(
                                      padding: const EdgeInsets.all(8.0),
                                      alignment: Alignment.center,
                                      child: const Text(
                                        'Last Name',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ))),
                              GridColumn(
                                  columnName: 'Email',
                                  width: size.width / 3 - 12,
                                  label: Container(
                                      padding: const EdgeInsets.all(8.0),
                                      alignment: Alignment.center,
                                      child: const Text(
                                        'Email',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ))),
                              GridColumn(
                                  columnName: 'Role',
                                  width: size.width / 3 - 12,
                                  label: Container(
                                      padding: const EdgeInsets.all(8.0),
                                      alignment: Alignment.center,
                                      child: const Text(
                                        'Role',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold),
                                      ))),
                              GridColumn(
                                  width: size.width / 3 - 12,
                                  columnName: 'Posts',
                                  label: Container(
                                      padding: const EdgeInsets.all(8.0),
                                      alignment: Alignment.center,
                                      child: const Text(
                                        'Posts',
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
      {required List<Map<User, List<TemplateData>>> documents,
      required this.context}) {
    _documents = documents
        .map<DataGridRow>((doc) => DataGridRow(cells: [
              DataGridCell<String>(
                  columnName: 'First Name', value: doc.keys.first.firstName),
              DataGridCell<String>(
                  columnName: 'Last Name', value: doc.keys.first.lastName),
              DataGridCell<String>(
                  columnName: 'Email', value: doc.keys.first.email),
              DataGridCell<String>(
                  columnName: 'Role', value: doc.keys.first.role),
              DataGridCell<List<TemplateData>>(
                  columnName: 'Posts', value: doc.values.first),
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
      for (final cell in row.getCells().sublist(0, 4))
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Text(cell.value.toString()),
        ),
      Container(
        padding: const EdgeInsets.all(8.0),
        child: ElevatedButton(
          style: ElevatedButton.styleFrom(
              padding: EdgeInsets.zero,
              backgroundColor: const Color.fromARGB(255, 33, 100, 243)),
          onPressed: () {
            List<TemplateData> document = row.getCells()[4].value;
            showDialog(
              context: context,
              builder: (context) => PaginatedDialog(document: document),
            );
          },
          child: const TextWithStyle(
            text: 'Posts',
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

class PaginatedDialog extends StatefulWidget {
  final List<TemplateData> document;

  const PaginatedDialog({super.key, required this.document});

  @override
  _PaginatedDialogState createState() => _PaginatedDialogState();
}

class _PaginatedDialogState extends State<PaginatedDialog> {
  int _currentPage = 0;
  bool isLoading = true;

  final List<Widget> _pages = [];
  @override
  void initState() {
    for (int i = 0; i < widget.document.length; i++) {
      setState(() {
        _pages.add(SingleChildScrollView(
          child: Column(
            children: [
              const SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const SizedBox(
                    width: 10,
                  ),
                  TextWithStyle(
                    text: widget.document[i].name!,
                    textStyle: const TextStyle(
                        fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  Container(
                    padding: const EdgeInsets.only(right: 10),
                    width: 40,
                    height: 30,
                    child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            padding: EdgeInsets.zero,
                            backgroundColor:
                                const Color.fromARGB(255, 0, 74, 135)),
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => UpdatePostPage(
                                        template: widget.document[i],
                                      )));
                        },
                        child: const Center(
                          child: Icon(
                            Icons.edit,
                            size: 20,
                            color: Colors.white,
                          ),
                        )),
                  )
                ],
              ),
              const SizedBox(
                height: 10,
              ),
              widget.document[i].descriptions != null
                  ? Html(data: widget.document[i].descriptions)
                  : Container(
                      child: const Text("no Data"),
                    ),
              const SizedBox(
                height: 10,
              ),
            ],
          ),
        ));
      });
    }
    isLoading = false;
    super.initState();
  }

  void _nextPage() {
    if (_currentPage < _pages.length - 1) {
      setState(() {
        _currentPage++;
      });
    }
  }

  void _prevPage() {
    if (_currentPage > 0) {
      setState(() {
        _currentPage--;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.sizeOf(context);

    return Dialog(
      backgroundColor: Colors.white,
      surfaceTintColor: Colors.white,
      insetPadding: const EdgeInsets.all(8),
      child: SizedBox(
        height: size.height - 70,
        child: isLoading
            ? const Center(child: CircularProgressIndicator())
            : _pages.isEmpty
                ? Center(
                    child: Container(
                      child: const Text("no Data"),
                    ),
                  )
                : Column(
                    children: [
                      SizedBox(
                        height: size.height - 124,
                        width: size.width - 16,
                        child: PageView.builder(
                          itemCount: _pages.length,
                          controller: PageController(
                              viewportFraction: 1, initialPage: _currentPage),
                          onPageChanged: (int index) {
                            setState(() {
                              _currentPage = index;
                            });
                          },
                          itemBuilder: (context, index) {
                            return _pages[_currentPage];
                          },
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 10),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            ElevatedButton(
                              onPressed: _prevPage,
                              style: ElevatedButton.styleFrom(
                                  backgroundColor:
                                      const Color.fromARGB(255, 0, 56, 135)),
                              child: const Text(
                                'Previous',
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                            ElevatedButton(
                              onPressed: _nextPage,
                              style: ElevatedButton.styleFrom(
                                  backgroundColor:
                                      const Color.fromARGB(255, 0, 56, 135)),
                              child: const Text(
                                'Next',
                                style: TextStyle(color: Colors.white),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
      ),
    );
  }
}

class DocumentPreviewDialog extends StatelessWidget {
  final List<Template> document;

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
            child: const Column(
              children: [
                SizedBox(
                  height: 10,
                ),
                // TextWithStyle(
                //   text: document.name!,
                //   textStyle: const TextStyle(
                //       fontSize: 20, fontWeight: FontWeight.bold),
                // ),
                SizedBox(
                  height: 10,
                ),
                // Html(data: document.description),
                SizedBox(
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
