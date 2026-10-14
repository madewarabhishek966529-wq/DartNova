import 'package:flutter/material.dart';

class GlowPulseCard extends StatefulWidget {
  final Widget child;
  final Color pulseColor;
  final Duration duration;

  const GlowPulseCard({
    super.key,
    required this.child,
    this.pulseColor = const Color(0xFFC5FF35),
    this.duration = const Duration(seconds: 2),
  });

  @override
  State<GlowPulseCard> createState() => _GlowPulseCardState();
}

class _GlowPulseCardState extends State<GlowPulseCard> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _glowAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: widget.duration,
    )..repeat(reverse: true);
    _glowAnimation = Tween<double>(begin: 4.0, end: 24.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _glowAnimation,
      builder: (context, _) {
        return Container(
          width: 290,
          height: 180,
          decoration: BoxDecoration(
            color: const Color(0xFF131313),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: widget.pulseColor.withValues(alpha: 0.3 + (_controller.value * 0.5)),
              width: 1.5,
            ),
            boxShadow: [
              BoxShadow(
                color: widget.pulseColor.withValues(alpha: 0.2 + (_controller.value * 0.25)),
                blurRadius: _glowAnimation.value,
                spreadRadius: 1,
              ),
            ],
          ),
          child: widget.child,
        );
      },
    );
  }
}
