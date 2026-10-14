import 'package:flutter/material.dart';

class NeonGradientCard extends StatefulWidget {
  final Widget child;

  const NeonGradientCard({super.key, required this.child});

  @override
  State<NeonGradientCard> createState() => _NeonGradientCardState();
}

class _NeonGradientCardState extends State<NeonGradientCard> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(seconds: 4))
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
      builder: (context, child) {
        return Container(
          width: 280,
          height: 170,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: SweepGradient(
              transform: GradientRotation(_controller.value * 6.283),
              colors: const [
                Color(0xFFC5FF35),
                Color(0xFF38DDF8),
                Color(0xFFA78BFA),
                Color(0xFFC5FF35),
              ],
            ),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFC5FF35).withOpacity(0.3),
                blurRadius: 18,
                spreadRadius: 1,
              ),
            ],
          ),
          padding: const EdgeInsets.all(2.5), // Border thickness
          child: Container(
            decoration: BoxDecoration(
              color: const Color(0xFF111111),
              borderRadius: BorderRadius.circular(14),
            ),
            child: widget.child,
          ),
        );
      },
    );
  }
}
