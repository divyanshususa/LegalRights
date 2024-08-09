class TemplateModel {
  Template? template;

  TemplateModel({this.template});

  TemplateModel.fromJson(Map<String, dynamic> json) {
    template =
        json['template'] != null ? Template.fromJson(json['template']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (template != null) {
      data['template'] = template!.toJson();
    }
    return data;
  }
}

class Template {
  String? sId;
  String? descriptions;
  bool? templeate;
  String? name;
  String? createdDate;
  int? iV;

  Template(
      {this.sId,
      this.descriptions,
      this.templeate,
      this.name,
      this.createdDate,
      this.iV});

  Template.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    descriptions = json['descriptions'];
    templeate = json['Templeate'];
    name = json['Name'];
    createdDate = json['CreatedDate'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['descriptions'] = descriptions;
    data['Templeate'] = templeate;
    data['Name'] = name;
    data['CreatedDate'] = createdDate;
    data['__v'] = iV;
    return data;
  }
}

class TemplateData {
  String? sId;
  String? uId;
  String? descriptions;
  bool? templeate;
  String? name;
  String? createdDate;
  int? iV;

  TemplateData(
      {this.sId,
      this.descriptions,
      this.uId,
      this.templeate,
      this.name,
      this.createdDate,
      this.iV});

  TemplateData.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    uId = json['userId'];
    descriptions = json['description'];
    templeate = json['Templeate'];
    name = json['Name'];
    createdDate = json['CreatedDate'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['userId'] = uId;
    data['description'] = descriptions;
    data['Templeate'] = templeate;
    data['Name'] = name;
    data['CreatedDate'] = createdDate;
    data['__v'] = iV;
    return data;
  }
}
