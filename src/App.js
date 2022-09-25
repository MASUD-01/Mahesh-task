import { useEffect, useState } from 'react';
import './App.css';
import { database } from './firebase.confic';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";


import ListData from './ListData';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';



function App() {
  const [name, setName] = useState('')
  const [data, setAddData] = useState([])
  const [update, setUpdate] = useState([])
  const [loading, isLoading] = useState(false)
  const db = collection(database, "users")
  const addItem = () => {
    isLoading(true)
    addDoc(db, { name }).then(res => {
      setName('')
      setUpdate(res.id)
      console.log(res.id, 'ýour data is updated')
    })
    console.log(name)
    console.log(db)
    console.log(db.type)
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(db)
      setAddData(data.docs.map((item) => {
        isLoading(false)
        return { ...item.data(), id: item.id }
      }))
    }
    getData()

  }, [update])

  const deleteData = (iid) => {
    alert('Do you want to delete')
    const filterData = data.filter((i) => i.id !== iid)
    setAddData(filterData)
    let dataToupdate = doc(database, 'users', iid)
    deleteDoc(dataToupdate)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex)
    result.splice(endIndex, 0, removed)
    return result;
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItem = reorder(data, result.source.index, result.destination.index)
    setAddData(reorderedItem)
    console.log(reorderedItem)
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {loading && <h1 className='loading'>Loading......</h1>}
        <Droppable droppableId={'droppable'}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} >
              {data.map((singledata, index) =>
                <Draggable key={singledata.id} draggableId={singledata.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <ListData key={singledata.id} deleteData={deleteData} singledata={singledata}></ListData>
                    </div>

                  )}

                </Draggable>

              )}

            </div>
          )}
        </Droppable>
        <div className='input'>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="button" value="AddItem" onClick={addItem} />
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
