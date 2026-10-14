import 'package:flutter/material.dart';

class TooltipAvatar extends StatefulWidget {
  final String name;
  final String role;
  final String avatarUrl;

  const TooltipAvatar({
    super.key,
    required this.name,
    required this.role,
    required this.avatarUrl,
  });

  @override
  State<TooltipAvatar> createState() => _TooltipAvatarState();
}

class _TooltipAvatarState extends State<TooltipAvatar> {
  bool _showTooltip = false;

  @override
  Widget build(BuildContext context) {
    return MouseRegion(
      onEnter: (_) => setState(() => _showTooltip = true),
      onExit: (_) => setState(() => _showTooltip = false),
      child: Stack(
        clipBehavior: Clip.none,
        alignment: Alignment.center,
        children: [
          GestureDetector(
            onTap: () => setState(() => _showTooltip = !_showTooltip),
            child: CircleAvatar(
              radius: 28,
              backgroundImage: NetworkImage(widget.avatarUrl),
            ),
          ),
          if (_showTooltip)
            Positioned(
              bottom: 64,
              child: AnimatedOpacity(
                duration: const Duration(milliseconds: 200),
                opacity: _showTooltip ? 1.0 : 0.0,
                child: Container(
                  width: 170,
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFF181818),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: const Color(0xFF292929)),
                    boxShadow: const [BoxShadow(color: Colors.black87, blurRadius: 16)],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        widget.name,
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
                      ),
                      Text(
                        widget.role,
                        style: const TextStyle(color: Color(0xFF38DDF8), fontSize: 11),
                      ),
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
