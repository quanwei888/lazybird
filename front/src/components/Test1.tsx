import React, { useState, useEffect, useRef } from 'react';

const SelectableContainer = ({ children }) => {
    const [selectedElement, setSelectedElement] = useState(null);
    const [hoveredElement, setHoveredElement] = useState(null);
    const containerRef = useRef(null);
    const hoverDivRef = useRef(null);

    const handleClick = (event) => {
        if (event.target !== containerRef.current) {
            setSelectedElement(event.target);
        }
    };

    const handleMouseOver = (event) => {
        if (event.target !== containerRef.current) {
            setHoveredElement(event.target);
        }
    };

    const handleMouseOut = () => {
        setHoveredElement(null);
    };

    useEffect(() => {
        const updateSelection = () => {
            if (selectedElement) {
                const rect = selectedElement.getBoundingClientRect();
                const container = containerRef.current.getBoundingClientRect();

                const highlightDiv = document.getElementById('highlight-div');
                if (highlightDiv) {
                    highlightDiv.style.top = `${rect.top - container.top + containerRef.current.scrollTop}px`;
                    highlightDiv.style.left = `${rect.left - container.left}px`;
                    highlightDiv.style.width = `${rect.width}px`;
                    highlightDiv.style.height = `${rect.height}px`;
                }
            }
        };

        updateSelection();
        window.addEventListener('scroll', updateSelection);
        window.addEventListener('resize', updateSelection);

        return () => {
            window.removeEventListener('scroll', updateSelection);
            window.removeEventListener('resize', updateSelection);
        };
    }, [selectedElement]);

    useEffect(() => {
        if (hoveredElement) {
            const rect = hoveredElement.getBoundingClientRect();
            const container = containerRef.current.getBoundingClientRect();

            if (hoverDivRef.current) {
                hoverDivRef.current.style.top = `${rect.top - container.top + containerRef.current.scrollTop}px`;
                hoverDivRef.current.style.left = `${rect.left - container.left}px`;
                hoverDivRef.current.style.width = `${rect.width}px`;
                hoverDivRef.current.style.height = `${rect.height}px`;
            }
        }
    }, [hoveredElement]);

    return (
        <div
            ref={containerRef}
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            className="relative overflow-auto h-96 w-full border border-gray-300"
        >
            {children}
            {selectedElement && (
                <div
                    id="highlight-div"
                    className="absolute border-2 border-blue-500 pointer-events-none box-border z-50"
                />
            )}
            <div
                ref={hoverDivRef}
                id="hover-div"
                className="absolute border-2 border-green-500 pointer-events-none box-border z-50"
            />
        </div>
    );
};

const App = () => {
    return (
        <div className="p-5">
            <h1>可选择容器示例</h1>
            <SelectableContainer>
                <div className="p-5">
                    <h2>内容标题</h2>
                    <p>这是一段示例文本。点击任何元素来选中它。</p>
                    <button>点击我</button>
                    <ul>
                        <li>列表项 1</li>
                        <li>列表项 2</li>
                        <li>列表项 3</li>
                    </ul>
                    <div className="h-[1000px] bg-gradient-to-b from-gray-200 to-gray-300">
                        <p className="pt-12">这是一个很长的区域，用于测试滚动功能。</p>
                        <p className="pt-[900px]">滚动到这里，然后点击这段文字。</p>
                    </div>
                </div>
            </SelectableContainer>
        </div>
    );
};

export default App;