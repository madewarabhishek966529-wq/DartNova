import 'dart:math';
import 'package:flutter/material.dart';

class SpringSpeedDialFAB extends StatefulWidget {
  final VoidCallback? onPrimaryTap;
  final List<IconData> actionIcons;
  final ValueChanged<int>? onActionTap;

  const SpringSpeedDialFAB({
    super.key,
    this.onPrimaryTap,
    this.actionIcons = const [Icons.bolt, Icons.code, Icons.share],
    this.onActionTap,
  });

  @override
  State<SpringSpeedDialFAB> createState() => _SpringSpeedDialFABState();
}

class _SpringSpeedDialFABState extends State<SpringSpeedDialFAB> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _expandAnimation;
  late Animation<double> _rotateAnimation;
  bool _isOpen = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );
    _expandAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.elasticOut,
      reverseCurve: Curves.easeInBack,
    );
    _rotateAnimation = Tween<double>(begin: 0.0, end: pi / 4).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutCubic),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  void _toggle() {
    setState(() {
      _isOpen = !_isOpen;
      if (_isOpen) {
        _controller.forward();
      } else {
        _controller.reverse();
      }
    });
    widget.onPrimaryTap?.call();
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 180,
      height: 220,
      child: Stack(
        alignment: Alignment.bottomCenter,
        clipBehavior: Clip.none,
        children: [
          ...List.generate(widget.actionIcons.length, (index) {
            final distance = 60.0 * (index + 1);
            return AnimatedBuilder(
              animation: _expandAnimation,
              builder: (context, child) {
                return Positioned(
                  bottom: _expandAnimation.value * distance,
                  child: Opacity(
                    opacity: _expandAnimation.value.clamp(0.0, 1.0),
                    child: Transform.scale(
                      scale: _expandAnimation.value,
                      child: GestureDetector(
                        onTap: () {
                          widget.onActionTap?.call(index);
                          _toggle();
                        },
                        child: Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            color: const Color(0xFF161616),
                            shape: BoxShape.circle,
                            border: Border.all(color: const Color(0xFF38DDF8), width: 1.5),
                            boxShadow: [
                              BoxShadow(
                                color: const Color(0xFF38DDF8).withValues(alpha: 0.3),
                                blurRadius: 12,
                              ),
                            ],
                          ),
                          child: Icon(
                            widget.actionIcons[index],
                            color: const Color(0xFF38DDF8),
                            size: 20,
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            );
          }),
          GestureDetector(
            onTap: _toggle,
            child: AnimatedBuilder(
              animation: _rotateAnimation,
              builder: (context, child) {
                return Transform.rotate(
                  angle: _rotateAnimation.value,
                  child: Container(
                    width: 58,
                    height: 58,
                    decoration: BoxDecoration(
                      color: const Color(0xFFC5FF35),
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFC5FF35).withValues(alpha: 0.45),
                          blurRadius: 20,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: const Icon(
                      Icons.add,
                      color: Color(0xFF080808),
                      size: 28,
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
