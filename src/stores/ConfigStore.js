import { create } from 'zustand';

const useConfigStore = create((set, get) => ({
    physicsEnabled: false,

    enablePhysics: () => set(() => ({physicsEnabled: true})),
    disablePhysics: () => set(() => ({physicsEnabled: false})),
}));

export default useConfigStore;