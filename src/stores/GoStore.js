import { create } from 'zustand';

const useGoStore = create((set, get) => ({
    selected: null,
    stoneInfos: [],

    setSelected: (value) => set(() => ({selected: value})),
    setStoneInfos: (value) => set(() => ({stoneInfos: value})),
    setStoneInfo: (index, newInfo) => set((state) => ({ stoneInfos: [...state.stoneInfos.slice(0, index), newInfo, ...state.stoneInfos.slice(index+1)] })),
    
    getStoneInfos: () => get().stoneInfos,
    getSelected: () => get().selected,
    getTeamCount: () => (get().stoneInfos.reduce((acc, val) => {
        if (val === null) return acc;
        acc[val.color] = (acc[val.color] || 0) + 1;
        return acc;
    }, {}))
}));

export default useGoStore;