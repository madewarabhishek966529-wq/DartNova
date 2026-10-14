import 'package:flutter/material.dart';

class NovaShimmer extends StatefulWidget {
  final Widget child;
  final Duration duration;

  const NovaShimmer({
    super.key,
    required this.child,
    this.duration = const Duration(milliseconds: 2200),
  });

  @override
  State<NovaShimmer> createState() => _NovaShimmerState();
}

class _NovaShimmerState extends State<NovaShimmer> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: widget.duration)
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
        return ShaderMask(
          blendMode: BlendMode.srcATop,
          shaderCallback: (bounds) {
            return LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              stops: [
                _controller.value - 0.3,
                _controller.value,
                _controller.value + 0.3,
              ].map((s) => s.clamp(0.0, 1.0)).toList(),
              colors: const [
                Color(0xFF1E1E1E),
                Color(0xFF333333),
                Color(0xFF1E1E1E),
              ],
            ).createShader(bounds);
          },
          child: widget.child,
        );
      },
    );
  }
}
