import React from "react";

const HomeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="newSidebarHome"
        style={{ width: 20, height: 20, display: "block", fill: "rgb(145, 145, 142)", flexShrink: 0 }}
        width="20"
        height="20"
    >
        <path
            d="M10.1416 3.77299C10.0563 3.71434 9.94368 3.71434 9.85837 3.77299L3.60837 8.06989C3.54053 8.11653 3.5 8.19357 3.5 8.2759V14.2499C3.5 14.9402 4.05964 15.4999 4.75 15.4999H7.5L7.5 10.7499C7.5 10.0595 8.05964 9.49987 8.75 9.49987H11.25C11.9404 9.49987 12.5 10.0595 12.5 10.7499L12.5 15.4999H15.25C15.9404 15.4999 16.5 14.9402 16.5 14.2499V8.2759C16.5 8.19357 16.4595 8.11653 16.3916 8.06989L10.1416 3.77299ZM9.00857 2.53693C9.60576 2.12636 10.3942 2.12636 10.9914 2.53693L17.2414 6.83383C17.7163 7.1603 18 7.69963 18 8.2759V14.2499C18 15.7687 16.7688 16.9999 15.25 16.9999H12.25C11.5596 16.9999 11 16.4402 11 15.7499L11 10.9999H9L9 15.7499C9 16.4402 8.44036 16.9999 7.75 16.9999H4.75C3.23122 16.9999 2 15.7687 2 14.2499V8.2759C2 7.69963 2.2837 7.1603 2.75857 6.83383L9.00857 2.53693Z"
            fill="#91918E"
        />
    </svg>
);

const ComposeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        className="compose"
        style={{ width: 22, height: 22, display: "block", fill: "rgb(55, 53, 47)", flexShrink: 0 }}
    >
        <path
            d="m16.774 4.341-.59.589-1.109-1.11.596-.594a.784.784 0 0 1 1.103 0c.302.302.302.8 0 1.102zM8.65 12.462l6.816-6.813-1.11-1.11-6.822 6.808a1.1 1.1 0 0 0-.236.393l-.289.932c-.052.196.131.38.315.314l.932-.288a.9.9 0 0 0 .394-.236"
            fill="#37352F"
        />
        <path
            d="M4.375 6.25c0-1.036.84-1.875 1.875-1.875H11a.625.625 0 1 0 0-1.25H6.25A3.125 3.125 0 0 0 3.125 6.25v7.5c0 1.726 1.4 3.125 3.125 3.125h7.5c1.726 0 3.125-1.4 3.125-3.125V9a.625.625 0 1 0-1.25 0v4.75c0 1.036-.84 1.875-1.875 1.875h-7.5a1.875 1.875 0 0 1-1.875-1.875z"
            fill="#37352F"
        />
    </svg>
);


const PlusSmallIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="plusSmall"
        style={{ width: 17, height: 17, display: "block", fill: "rgba(71, 70, 68, 0.6)", flexShrink: 0 }}
        width="17"
        height="17"
        aria-hidden="true"
        role="img"
    >
        <path
            d="M8 2.3a.7.7 0 0 0-.7.7v4.3H3a.7.7 0 1 0 0 1.4h4.3V13a.7.7 0 1 0 1.4 0V8.7H13a.7.7 0 1 0 0-1.4H8.7V3a.7.7 0 0 0-.7-.7"
            fillOpacity="0.6"
            fill="#474644"
        />
    </svg>
);

const EllipsisSmallIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="ellipsisSmall"
        style={{ width: 17, height: 17, display: "block", fill: "rgba(71, 70, 68, 0.6)", flexShrink: 0 }}
        width="17"
        height="17"
        aria-hidden="true"
        role="img"
    >
        <path
            d="M3.2 6.725a1.275 1.275 0 1 0 0 2.55 1.275 1.275 0 0 0 0-2.55m4.8 0a1.275 1.275 0 1 0 0 2.55 1.275 1.275 0 0 0 0-2.55m4.8 0a1.275 1.275 0 1 0 0 2.55 1.275 1.275 0 0 0 0-2.55"
            fillOpacity="0.6"
            fill="#474644"
        />
    </svg>
);


const EmojiIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 14"
        role="graphics-symbol"
        aria-hidden="true"
        className="addPage"
        width={14}
        height={14}
        style={{ width: 14, height: 14, display: "block", fill: "currentColor", flexShrink: 0, marginRight: 6 }}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 1 0 2.054 0 1.027 1.027 0 0 0-2.054 0zm5.557 1.027a1.027 1.027 0 1 1 0-2.054 1.027 1.027 0 0 1 0 2.054zm1.211 2.816a.77.77 0 0 0-.124-1.087.786.786 0 0 0-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 0 0-1.107-.135.786.786 0 0 0-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z"
            fillOpacity={0.5}
            fill="#37352F"
        />
    </svg>
)

const ImageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" role="graphics-symbol" aria-hidden="true"
        className="addPageCover" width={14} height={14} style={{
            width: 14, height: 14, display: "block",
            fill: "currentColor", flexShrink: 0, marginRight: 6
        }}>
        <path fillRule="evenodd" clipRule="evenodd"
            d="M2 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"
            fillOpacity={0.5} fill="#37352F" />
    </svg>
)

export const icons = {
    home: <HomeIcon />,
    compose: <ComposeIcon />,
    plus: <PlusSmallIcon />,
    ellipsis: <EllipsisSmallIcon />,
    emoji: <EmojiIcon />,
    image: <ImageIcon />
} as const;
