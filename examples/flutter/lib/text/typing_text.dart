import 'dart:async';
import 'package:flutter/material.dart';

class TypingText extends StatefulWidget {
  final String text;
  final Duration speed;
  final Color cursorColor;
  final TextStyle? style;

  const TypingText({
    super.key,
    required this.text,
    this.speed = const Duration(milliseconds: 45),
    this.cursorColor = const Color(0xFFC5FF35),
    this.style,
  });

  @override
  State<TypingText> createState() => _TypingTextState();
}

class _TypingTextState extends State<TypingText> {
  String _displayedText = '';
  Timer? _timer;
  int _charIndex = 0;

  @override
  void initState() {
    super.initState();
    _startTyping();
  }

  @override
  void didUpdateWidget(covariant TypingText oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.text != widget.text || oldWidget.speed != widget.speed) {
      _startTyping();
    }
  }

  void _startTyping() {
    _timer?.cancel();
    _displayedText = '';
    _charIndex = 0;
    _timer = Timer.periodic(widget.speed, (timer) {
      if (_charIndex < widget.text.length) {
        setState(() {
          _displayedText += widget.text[_charIndex];
          _charIndex++;
        });
      } else {
        timer.cancel();
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final textStyle = widget.style ??
        const TextStyle(
          color: Colors.white,
          fontSize: 24,
          fontWeight: FontWeight.bold,
          fontFamily: 'monospace',
        );

    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(_displayedText, style: textStyle),
        _BlinkingCursor(color: widget.cursorColor),
      ],
    );
  }
}

class _BlinkingCursor extends StatefulWidget {
  final Color color;
  const _BlinkingCursor({required this.color});

  @override
  State<_BlinkingCursor> createState() => _BlinkingCursorState();
}

class _BlinkingCursorState extends State<_BlinkingCursor> with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _controller,
      child: Container(
        width: 3,
        height: 28,
        margin: const EdgeInsets.only(left: 4),
        color: widget.color,
      ),
    );
  }
}
