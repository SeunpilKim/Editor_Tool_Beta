import { Fragment } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector"
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
    const cellItems = useTypedSelector(({ cells: { order, data } }) => {
        return order.map((id) => data[id])
    });

    const renderedCells = cellItems.map(cell =>
        <Fragment key={cell.id}>
            <CellListItem cell={cell}/>
            <AddCell previousCellId={cell.id}/>
        </Fragment>
    )
    
    return (
        <div>
            <AddCell forceVisible={cellItems.length === 0} previousCellId={null}/>
            {renderedCells}
        </div>
    )
}

export default CellList