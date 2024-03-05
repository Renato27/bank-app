// MessagePopup.tsx

import React, { useEffect } from 'react';
import { message as antMessage } from "antd";
import { useMessage } from '../../context/MessageContext';

const MessagePopup: React.FC = () => {
    const { message, hideMessage } = useMessage();

    useEffect(() => {
        if (message) {
            const hide = antMessage[message.type](message.text, 3);
            return () => {
                hide();
                hideMessage();
            };
        }
    }, [message, hideMessage]);

    return null;
};

export default MessagePopup;
