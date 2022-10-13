import { useEffect, useState } from 'react';
import './App.css';
import { database } from './firebase.confic';
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import UpDownArray from './UpDownArray';

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
    })
    console.log(name)
    console.log(db)
    console.log(db.type)
  }

  useEffect(() => {
    isLoading(true)
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

  return (
    <>
      <div className='container'>
        {loading && <h1>Loading....</h1>}
        {
          data.map((item, index) =>
            <UpDownArray key={item.id} item={item} deleteData={deleteData} setAddData={setAddData} index={index} data={data}></UpDownArray>
          )
        }
        <div className='input'>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="button" value="AddItem" onClick={addItem} />
        </div>

      </div>
    </>
  );
}

export default App;
