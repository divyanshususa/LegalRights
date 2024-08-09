class CreatePostModel {
  final String name;
  final String description;
  final String userId;

  CreatePostModel({
    required this.name,
    required this.description,
    required this.userId,
  });

  // Method to convert the Dart object to a Map (useful for encoding to JSON)
  Map<String, dynamic> toJson() {
    return {
      'Name': name,
      'description': description,
      'userId': userId,
    };
  }

  // Factory constructor to create an instance of CreatePostModel from a Map (useful for decoding from JSON)
  factory CreatePostModel.fromJson(Map<String, dynamic> json) {
    return CreatePostModel(
      name: json['Name'],
      description: json['description'],
      userId: json['userId'],
    );
  }


}
