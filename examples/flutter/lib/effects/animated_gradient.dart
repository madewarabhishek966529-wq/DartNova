import 'package:flutter/material.dart';

class AnimatedGradientMesh extends StatefulWidget {
  final Duration duration;

  const AnimatedGradientMesh({
    super.key,
    this.duration = const Duration(seconds: 10),
  });

  @override
  State<AnimatedGradientMesh> createState() => _AnimatedGradientMeshState();
}

class _AnimatedGradientMeshState extends State<AnimatedGradientMesh> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: widget.duration)
      ..repeat(reverse: true);
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
          width: double.infinity,
          height: 240,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            gradient: LinearGradient(
              begin: Alignment(-1.0 + _controller.value * 2, -1.0),
              end: Alignment(1.0 - _controller.value * 2, 1.0),
              colors: const [
                Color(0xFF0D0D0D),
                Color(0xFF1A0B2E),
                Color(0xFF03202E),
                Color(0xFF0E2908),
                Color(0xFF181818),
              ],
            ),
          ),
          child: child,
        );
      },
      child: const Center(
        child: Text(
          'Animated Gradient Mesh',
          style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
