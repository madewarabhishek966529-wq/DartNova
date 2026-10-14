import 'package:flutter/material.dart';

class SpotlightEffect extends StatefulWidget {
  final double radius;
  final Widget child;

  const SpotlightEffect({
    super.key,
    this.radius = 180.0,
    required this.child,
  });

  @override
  State<SpotlightEffect> createState() => _SpotlightEffectState();
}

class _SpotlightEffectState extends State<SpotlightEffect> {
  Offset? _spotlightPos;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onHover: (e) => setState(() => _spotlightPos = e.localPosition),
      onExit: (_) => setState(() => _spotlightPos = null),
      child: CustomPaint(
        foregroundPainter: _spotlightPos != null
            ? _SpotlightPainter(center: _spotlightPos!, radius: widget.radius)
            : null,
        child: Container(
          width: double.infinity,
          height: 200,
          decoration: BoxDecoration(
            color: const Color(0xFF111111),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: const Color(0xFF292929)),
          ),
          child: widget.child,
        ),
      ),
    );
  }
}

class _SpotlightPainter extends CustomPainter {
  final Offset center;
  final double radius;

  _SpotlightPainter({required this.center, required this.radius});

  @override
  void paint(Canvas canvas, Size size) {
    final rect = Offset.zero & size;
    final rrect = RRect.fromRectAndRadius(rect, const Radius.circular(16));
    canvas.clipRRect(rrect);

    final paint = Paint()
      ..shader = RadialGradient(
        center: Alignment(
          (center.dx / size.width) * 2 - 1,
          (center.dy / size.height) * 2 - 1,
        ),
        radius: radius / size.width,
        colors: [
          const Color(0x40C5FF35),
          const Color(0x1538DDF8),
          Colors.transparent,
        ],
      ).createShader(rect);

    canvas.drawRRect(rrect, paint);
  }

  @override
  bool shouldRepaint(covariant _SpotlightPainter oldDelegate) =>
      oldDelegate.center != center;
}
