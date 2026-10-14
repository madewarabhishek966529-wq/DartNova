import 'dart:math';
import 'package:flutter/material.dart';

class ParticleMotionCanvas extends StatefulWidget {
  final int count;

  const ParticleMotionCanvas({super.key, this.count = 28});

  @override
  State<ParticleMotionCanvas> createState() => _ParticleMotionCanvasState();
}

class _Particle {
  double x;
  double y;
  double vx;
  double vy;
  double radius;

  _Particle({
    required this.x,
    required this.y,
    required this.vx,
    required this.vy,
    required this.radius,
  });
}

class _ParticleMotionCanvasState extends State<ParticleMotionCanvas> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final List<_Particle> _particles = [];
  final Random _rnd = Random();

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < widget.count; i++) {
      _particles.add(_Particle(
        x: _rnd.nextDouble() * 300,
        y: _rnd.nextDouble() * 200,
        vx: (_rnd.nextDouble() - 0.5) * 1.5,
        vy: (_rnd.nextDouble() - 0.5) * 1.5,
        radius: _rnd.nextDouble() * 2 + 1.5,
      ));
    }

    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 1))
      ..repeat();
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
          size: const Size(double.infinity, 240),
          painter: _ParticlePainter(particles: _particles),
        );
      },
    );
  }
}

class _ParticlePainter extends CustomPainter {
  final List<_Particle> particles;

  _ParticlePainter({required this.particles});

  @override
  void paint(Canvas canvas, Size size) {
    final dotPaint = Paint()..color = const Color(0xFFC5FF35);
    final linePaint = Paint()..strokeWidth = 1.0;

    for (int i = 0; i < particles.length; i++) {
      final p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > size.width) p.vx *= -1;
      if (p.y < 0 || p.y > size.height) p.vy *= -1;

      canvas.drawCircle(Offset(p.x, p.y), p.radius, dotPaint);

      for (int j = i + 1; j < particles.length; j++) {
        final p2 = particles[j];
        final dist = sqrt(pow(p.x - p2.x, 2) + pow(p.y - p2.y, 2));
        if (dist < 65) {
          linePaint.color = Color.fromRGBO(197, 255, 53, 0.4 * (1 - dist / 65));
          canvas.drawLine(Offset(p.x, p.y), Offset(p2.x, p2.y), linePaint);
        }
      }
    }
  }

  @override
  bool shouldRepaint(covariant _ParticlePainter oldDelegate) => true;
}
