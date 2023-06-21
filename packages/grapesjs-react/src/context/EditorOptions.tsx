import { createContext, useContext, useState } from 'react';

const EditorOptionsContext = createContext<EditorOptionsState | null>(null);

export interface EditorOptionsState {
    refCanvas?: HTMLElement;
    customModal?: boolean;
    customAssets?: boolean;
    customRte?: boolean;
    ready?: boolean;
    setRefCanvas: (ref: HTMLElement) => void;
    setCustomModal: (value: boolean) => void;
    setCustomAssets: (value: boolean) => void;
    setCustomRte: (value: boolean) => void;
    setReady: (value: boolean) => void;
}


export const EditorOptionsProvider = ({ children }: {
    children?: React.ReactNode,
}) => {
    const [state, setState] = useState<EditorOptionsState>({
        setRefCanvas: (refCanvas) => {
            setState({ ...state, refCanvas })
        },
        setCustomModal(customModal) {
            setState({ ...state, customModal })
        },
        setCustomAssets(customAssets) {
            setState({ ...state, customAssets })
        },
        setCustomRte(customRte) {
            setState({ ...state, customRte })
        },
        setReady(ready) {
            setState({ ...state, ready })
        },
    });

    console.log('EditorOptionsProvider ', state);

    return (
        <EditorOptionsContext.Provider value={state}>
            { children }
        </EditorOptionsContext.Provider>
    )
};

/**
 * Context used to keep the editor instance once initialized
 */
export const useEditorOptions = () => {
    const context = useContext(EditorOptionsContext);

    if (!context) {
        throw new Error('useEditorOptions must be used within EditorOptionsProvider');
    }

    return context;
};


// export const useEditor = () => {
//     // TODO ensure editor is used inside provider
//     return useEditorOptions().editor;
// }

export default EditorOptionsContext;