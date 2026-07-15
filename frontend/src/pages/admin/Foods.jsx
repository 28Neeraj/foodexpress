// See chat: Complete Foods.jsx
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "../../components/AdminSidebar";
import AdminFoodForm from "../../components/AdminFoodForm";
import { getAllFoods,getAllRestaurants,addFood,updateFood,deleteFood,toggleFoodAvailability } from "../../services/adminService";

function Foods(){
 const [foods,setFoods]=useState([]);
 const [restaurants,setRestaurants]=useState([]);
 const [showForm,setShowForm]=useState(false);
 const [editingFood,setEditingFood]=useState(null);
 const [search,setSearch]=useState("");

 useEffect(()=>{loadFoods();loadRestaurants();},[]);

 async function loadFoods(){ try{setFoods(await getAllFoods());}catch(e){console.log(e);} }
 async function loadRestaurants(){ try{setRestaurants(await getAllRestaurants());}catch(e){console.log(e);} }

 async function handleSave(food){
   try{
     if(editingFood){
       await updateFood(editingFood.restaurantId,editingFood._id,food);
     }else{
       await addFood(food.restaurantId,{
         name:food.name,
         category:food.category,
         price:Number(food.price),
         image:food.image,
         isAvailable:food.isAvailable
       });
     }
     setEditingFood(null);
     setShowForm(false);
     loadFoods();
   }catch(e){console.log(e);}
 }

 async function handleDelete(food){
   if(!window.confirm("Delete Food?")) return;
   await deleteFood(food.restaurantId,food._id);
   loadFoods();
 }

 async function handleToggle(food){
   await toggleFoodAvailability(food.restaurantId,food._id);
   loadFoods();
 }

 const filtered=foods.filter(f=>f.name.toLowerCase().includes(search.toLowerCase()));

 return (
 <>
 <Navbar/>
 <div className="flex">
 <AdminSidebar/>
 <div className="flex-1 p-8">
 <div className="flex justify-between mb-6">
 <h1 className="text-4xl font-bold">Food Management</h1>
 <button onClick={()=>{setEditingFood(null);setShowForm(!showForm);}} className="bg-green-500 text-white px-5 py-3 rounded">{showForm?"Close Form":"+ Add Food"}</button>
 </div>

 <input className="border p-3 rounded w-full mb-6" placeholder="Search Food..." value={search} onChange={(e)=>setSearch(e.target.value)}/>

 {showForm && <AdminFoodForm restaurants={restaurants} editingFood={editingFood} onSubmit={handleSave}/>}

 <table className="w-full shadow-lg">
 <thead className="bg-gray-200">
 <tr><th>Image</th><th>Food</th><th>Restaurant</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr>
 </thead>
 <tbody>
 {filtered.map(food=>(
 <tr key={food._id} className="border-t">
 <td><img src={food.image} alt={food.name} className="w-20 h-20 object-cover rounded"/></td>
 <td>{food.name}</td>
 <td>{food.restaurantName}</td>
 <td>{food.category}</td>
 <td>₹{food.price}</td>
 <td><button onClick={()=>handleToggle(food)} className={food.isAvailable?"bg-green-500 text-white px-3 py-2 rounded":"bg-red-500 text-white px-3 py-2 rounded"}>{food.isAvailable?"Available":"Out Of Stock"}</button></td>
 <td>
 <button onClick={()=>{setEditingFood(food);setShowForm(true);}} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
 <button onClick={()=>handleDelete(food)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </>
 );
}
export default Foods;
