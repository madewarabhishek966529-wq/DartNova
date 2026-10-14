import 'package:flutter/material.dart';

class CornerButton extends StatefulWidget {
  final String label;
  final VoidCallback? onPressed;
  final Color accentColor;
  final double notchSize;

  const CornerButton({
    super.key,
    required this.label,
    this.onPressed,
    this.accentColor = const Color(0xFFC5FF35),
    this.notchSize = 10.0,
  });

  @override
  State<CornerButton> createState() => _CornerButtonState();
}

class _CornerButtonState extends State<CornerButton> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTap: widget.onPressed,
        child: CustomPaint(
          painter: _BeveledBorderPainter(
            notch: widget.notchSize,
            borderColor: _isHovered ? widget.accentColor : const Color(0xFF383838),
            fillColor: _isHovered ? const Color(0xFF222222) : const Color(0xFF111111),
          ),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 14),
            child: Text(
              widget.label,
              style: TextStyle(
                color: _isHovered ? Colors.white : widget.accentColor,
                fontFamily: 'monospace',
                fontSize: 14,
                fontWeight: FontWeight.bold,
                letterSpacing: 1.5,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _BeveledBorderPainter extends CustomPainter {
  final double notch;
  final Color borderColor;
  final Color fillColor;

  _BeveledBorderPainter({
    required this.notch,
    required this.borderColor,
    required this.fillColor,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final path = Path()
      ..moveTo(notch, 0)
      ..lineTo(size.width, 0)
      ..lineTo(size.width, size.height - notch)
      ..lineTo(size.width - notch, size.height)
      ..lineTo(0, size.height)
      ..lineTo(0, notch)
      ..close();

    final fillPaint = Paint()
      ..color = fillColor
      ..style = PaintingStyle.fill;
    canvas.drawPath(path, fillPaint);

    final borderPaint = Paint()
      ..color = borderColor
      ..strokeWidth = 1.5
      ..style = PaintingStyle.stroke;
    canvas.drawPath(path, borderPaint);

    // Corner indicator
    final cornerPaint = Paint()..color = borderColor;
    canvas.drawCircle(Offset(size.width - 4, 4), 2.5, cornerPaint);
  }

  @override
  bool shouldRepaint(covariant _BeveledBorderPainter oldDelegate) =>
      oldDelegate.borderColor != borderColor || oldDelegate.fillColor != fillColor;
}
