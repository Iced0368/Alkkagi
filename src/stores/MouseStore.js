import { create } from 'zustand';

const useMouseStore = create((set, get) => ({
  mouseDown: false,
  startPos: { x: 0, y: 0 },
  endPos: { x: 0, y: 0 },

  setMouseDown: (startX, startY) => set({ mouseDown: true, startPos: { x: startX, y: startY } }),
  setMouseUp: (endX, endY) => set({ mouseDown: false, endPos: { x: endX, y: endY } }),

  getStartPos: () => get().startPos,
}));

export default useMouseStore;