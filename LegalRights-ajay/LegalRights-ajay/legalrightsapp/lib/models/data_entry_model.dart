class DataEntryModel {
  String? sId;
  String? date;
  String? slipNo;
  String? doc;
  String? firstParty;
  String? secondParty;
  String? propDetail;
  String? regNo;
  String? bNo;
  String? volNo;
  String? pageNo;
  String? regDate;
  String? createdAt;
  String? updatedAt;
  int? iV;

  DataEntryModel(
      {this.sId,
      this.date,
      this.slipNo,
      this.doc,
      this.firstParty,
      this.secondParty,
      this.propDetail,
      this.regNo,
      this.bNo,
      this.volNo,
      this.pageNo,
      this.regDate,
      this.createdAt,
      this.updatedAt,
      this.iV});

  DataEntryModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    date = json['date'];
    slipNo = json['slipNo'];
    doc = json['doc'];
    firstParty = json['firstParty'];
    secondParty = json['secondParty'];
    propDetail = json['propDetail'];
    regNo = json['regNo'];
    bNo = json['bNo'];
    volNo = json['volNo'];
    pageNo = json['pageNo'];
    regDate = json['regDate'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['date'] = date;
    data['slipNo'] = slipNo;
    data['doc'] = doc;
    data['firstParty'] = firstParty;
    data['secondParty'] = secondParty;
    data['propDetail'] = propDetail;
    data['regNo'] = regNo;
    data['bNo'] = bNo;
    data['volNo'] = volNo;
    data['pageNo'] = pageNo;
    data['regDate'] = regDate;
    return data;
  }
}
