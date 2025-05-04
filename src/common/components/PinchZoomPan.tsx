import React, { useEffect, useRef } from "react";
import { create } from "pinch-zoom-pan";

import clsx from "clsx";

interface PinchZoomPanProps {
  min?: number;
  max?: number;
  captureWheel?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const PinchZoomPan = React.memo(function PinchZoomPan({
  min,
  max,
  captureWheel,
  className,
  style,
  children,
}: PinchZoomPanProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rootElement = rootRef.current;
    const canvasElement = canvasRef.current;
    if (!rootElement || !canvasElement) return;
    const canvas = create({
      element: rootElement,
      minZoom: min,
      maxZoom: max,
      captureWheel,
    });

    canvas.update({
      z: Math.min(
        rootElement.clientWidth / canvasElement.clientWidth,
        rootElement.clientHeight / canvasElement.clientHeight,
      ),
    });

    return canvas.destroy;
  }, [min, max, captureWheel]);

  return (
    <div
      ref={rootRef}
      className={clsx(className, "overflow-hidden relative")}
      style={{
        transform: "translateZ(0)",
        ...style,
      }}
    >
      <div
        className="absolute w-0 h-0"
        style={{
          transform: "translate(0, 0) scale(1)",
          transformOrigin: "center",
          willChange: "transform",
        }}
      >
        <div
          ref={canvasRef}
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
});
