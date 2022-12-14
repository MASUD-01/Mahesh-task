import React from 'react';

const UpDownArray = ({ item, index, data, setAddData, deleteData }) => {



    const reorderArray = (event, originalArray) => {
        console.log(event, originalArray)
        const movedItem = originalArray.find((item, index) => index === event.oldIndex);
        const remainingItems = originalArray.filter((item, index) => index !== event.oldIndex);

        const reorderedItems = [
            ...remainingItems.slice(0, event.newIndex),
            movedItem,
            ...remainingItems.slice(event.newIndex)
        ];
        return reorderedItems;
    }

    function changeOrder(index, direction) {
        console.log(index, direction)
        setAddData(reorderArray({ oldIndex: index, newIndex: index + (direction === "UP" ? (-1) : 1) }, data));
    }
    return (
        <div>
            <table>
                <tbody>
                    <tr className='rowDesign'>
                        <td>{item.name} </td>
                        <td onClick={() => changeOrder(index, "UP")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5" />
                            </svg>
                        </td>
                        <td disabled={''} onClick={() => changeOrder(index, "DOWN")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-2 h-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </td>
                        <td><svg onClick={() => deleteData(item.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}



export default UpDownArray;