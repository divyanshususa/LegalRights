import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class TextWithStyle extends StatelessWidget {
  final String text;
  final TextStyle? textStyle;
  const TextWithStyle({super.key, required this.text, this.textStyle});

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style:
          GoogleFonts.ubuntu(textStyle: textStyle ?? const TextStyle()),
    );
  }
}
