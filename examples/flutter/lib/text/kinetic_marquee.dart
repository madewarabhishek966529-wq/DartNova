import 'package:flutter/material.dart';

class KineticMarquee extends StatefulWidget {
  final String text;
  final TextStyle? style;
  final double velocity;

  const KineticMarquee({
    super.key,
    required this.text,
    this.style,
    this.velocity = 50.0,
  });

  @override
  State<KineticMarquee> createState() => _KineticMarqueeState();
}

class _KineticMarqueeState extends State<KineticMarquee> with SingleTickerProviderStateMixin {
  late ScrollController _scrollController;
  late AnimationController _animationController;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    )..addListener(_scroll);

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _startScrolling();
    });
  }

  void _startScrolling() {
    _animationController.repeat();
  }

  void _scroll() {
    if (_scrollController.hasClients) {
      final maxScroll = _scrollController.position.maxScrollExtent;
      final current = _animationController.value * maxScroll;
      _scrollController.jumpTo(current);
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final textStyle = widget.style ??
        const TextStyle(
          color: Colors.white,
          fontSize: 22,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.2,
        );

    return MouseRegion(
      onEnter: (_) => _animationController.stop(),
      onExit: (_) => _animationController.repeat(),
      child: SingleChildScrollView(
        controller: _scrollController,
        scrollDirection: Axis.horizontal,
        physics: const NeverScrollableScrollPhysics(),
        child: Row(
          children: List.generate(10, (index) {
            return Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(widget.text, style: textStyle),
                const Padding(
                  padding: EdgeInsets.symmetric(horizontal: 16),
                  child: Text('•', style: TextStyle(color: Color(0xFFC5FF35), fontSize: 20)),
                ),
              ],
            );
          }),
        ),
      ),
    );
  }
}
