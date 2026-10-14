import 'package:flutter/material.dart';

class RadialGlowButton extends StatefulWidget {
  final String text;
  final VoidCallback? onPressed;
  final Color glowColor;
  final double glowRadius;

  const RadialGlowButton({
    super.key,
    required this.text,
    this.onPressed,
    this.glowColor = const Color(0xFFC5FF35),
    this.glowRadius = 140.0,
  });

  @override
  State<RadialGlowButton> createState() => _RadialGlowButtonState();
}

class _RadialGlowButtonState extends State<RadialGlowButton> {
  Offset? _pointerPosition;
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (e) => setState(() {
        _isHovered = true;
        _pointerPosition = e.localPosition;
      }),
      onHover: (e) => setState(() => _pointerPosition = e.localPosition),
      onExit: (_) => setState(() {
        _isHovered = false;
        _pointerPosition = null;
      }),
      child: GestureDetector(
        onTap: widget.onPressed,
        child: CustomPaint(
          painter: _isHovered && _pointerPosition != null
              ? _RadialGlowPainter(
                  pointerOffset: _pointerPosition!,
                  glowColor: widget.glowColor,
                  radius: widget.glowRadius,
                )
              : null,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 28, vertical: 14),
            decoration: BoxDecoration(
              color: const Color(0xFF121212),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(
                color: _isHovered ? widget.glowColor.withOpacity(0.5) : const Color(0xFF292929),
              ),
            ),
            child: Text(
              widget.text,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 15,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _RadialGlowPainter extends CustomPainter {
  final Offset pointerOffset;
  final Color glowColor;
  final double radius;

  _RadialGlowPainter({
    required this.pointerOffset,
    required this.glowColor,
    required this.radius,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final rrect = RRect.fromRectAndRadius(rect, const Radius.circular(10));
    canvas.clipRRect(rrect);

    final paint = Paint()
      ..shader = RadialGradient(
        center: Alignment(
          (pointerOffset.dx / size.width) * 2 - 1,
          (pointerOffset.dy / size.height) * 2 - 1,
        ),
        radius: radius / size.width,
        colors: [
          glowColor.withOpacity(0.35),
          Colors.transparent,
        ],
      ).createShader(rect);

    canvas.drawRRect(rrect, paint);
  }

  @override
  bool shouldRepaint(covariant _RadialGlowPainter oldDelegate) =>
      oldDelegate.pointerOffset != pointerOffset;
}
