import 'package:flutter/material.dart';

class AvatarGroup extends StatefulWidget {
  final List<String> imageUrls;
  final double size;
  final double overlap;

  const AvatarGroup({
    super.key,
    required this.imageUrls,
    this.size = 46.0,
    this.overlap = 14.0,
  });

  @override
  State<AvatarGroup> createState() => _AvatarGroupState();
}

class _AvatarGroupState extends State<AvatarGroup> {
  int? _hoveredIndex;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: List.generate(widget.imageUrls.length, (index) {
        final isHovered = _hoveredIndex == index;
        return MouseRegion(
          onEnter: (_) => setState(() => _hoveredIndex = index),
          onExit: (_) => setState(() => _hoveredIndex = null),
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 200),
            curve: Curves.easeOutBack,
            margin: EdgeInsets.only(left: index == 0 ? 0 : -widget.overlap),
            transform: Matrix4.diagonal3Values(
              isHovered ? 1.2 : 1.0,
              isHovered ? 1.2 : 1.0,
              1.0,
            )..setTranslationRaw(0.0, isHovered ? -4.0 : 0.0, 0.0),
            width: widget.size,
            height: widget.size,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              border: Border.all(
                color: isHovered ? const Color(0xFFC5FF35) : const Color(0xFF080808),
                width: 2,
              ),
              boxShadow: isHovered
                  ? const [BoxShadow(color: Colors.black87, blurRadius: 12)]
                  : null,
              image: DecorationImage(
                image: NetworkImage(widget.imageUrls[index]),
                fit: BoxFit.cover,
              ),
            ),
          ),
        );
      }),
    );
  }
}
