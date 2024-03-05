export type Message = {
    text: string;
    type: MessageTypes;
    onClose?: () => void;
}

type MessageTypes = 'info' | 'success' | 'error' | 'warning' | 'loading';