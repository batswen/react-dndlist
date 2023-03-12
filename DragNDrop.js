import PropTypes from 'prop-types'

/**
 * Enables Drag and Drop
 * @param {ReactElement[]} list - THe array of list
 */
export function DragNDrop({ list, setList }) {
    /**
     * Start
     * @param {HTMLEvent} event 
     */
    function handleDragStart(event) {
        event.dataTransfer.setData("index", event.target.closest(".___drag-div").dataset.index)
    }
    /**
     * Allow dropping
     * @param {HTMLEvent} event 
    */
    function handleDragOver(event) {
       event.preventDefault()
    }
    
    /**
     * Create new list order
     * @param {HTMLEvent} event 
    */
   function handleDrop(event) {
        const indexStart = parseInt(event.dataTransfer.getData("index"))
        const indexEnd = parseInt(event.target.closest(".___drag-div").dataset.index)
        const listCopy = [...list]
        const temp = listCopy[indexStart]
        listCopy[indexStart] = listCopy[indexEnd]
        listCopy[indexEnd] = temp
        setList(listCopy)
    }
    return <div onDrop={handleDrop} onDragOver={handleDragOver}>
    {
    list.map((item, index) => 
        <div style={{ display: "flex"}} className="___drag-div" key={`draggable${index}`} draggable="true" data-index={index} onDragStart={handleDragStart} onDrop={handleDrop}>
            {item}
        </div>
    )
    }
    </div>
}

// React type checking
DragNDrop.propTypes = {
    list: PropTypes.array
}
