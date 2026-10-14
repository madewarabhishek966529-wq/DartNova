import 'dart:math';
import 'package:flutter/material.dart';

class WaveAnimation extends StatefulWidget {
  final double amplitude;
  final double speed;

  const WaveAnimation({
    super.key,
    this.amplitude = 22.0,
    this.speed = 1.0,
  });

  @override
  State<WaveAnimation> createState() => _WaveAnimationState();
}

class _WaveAnimationState extends State<WaveAnimation> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 3),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return CustomPaint(
          size: const Size(double.infinity, 220),
          painter: _WavePainter(
            phase: _controller.value * 2 * pi * widget.speed,
            amplitude: widget.amplitude,
          ),
        );
      },
    );
  }
}

class _WavePainter extends CustomPainter {
  final double phase;
  final double amplitude;

  _WavePainter({required this.phase, required this.amplitude});

  @override
  void paint(Canvas canvas, Size size) {
    // Background wave
    final path1 = Path()..moveTo(0, size.height);
    for (double x = 0; x <= size.width; x += 4) {
      final y = size.height * 0.6 + sin((x * 0.015) + phase) * amplitude;
      path1.lineTo(x, y);
    }
    path1.lineTo(size.width, size.height);
    path1.close();
    canvas.drawPath(path1, Paint()..color = const Color(0x3338DDF8));

    // Foreground wave
    final path2 = Path()..moveTo(0, size.height);
    for (double x = 0; x <= size.width; x += 4) {
      final y = size.height * 0.65 + sin((x * 0.02) + phase * 1.2) * (amplitude * 0.8);
      path2.lineTo(x, y);
    }
    path2.lineTo(size.width, size.height);
    path2.close();
    canvas.drawPath(path2, Paint()..color = const Color(0x40C5FF35));
  }

  @override
  bool shouldRepaint(covariant _WavePainter oldDelegate) => true;
}
