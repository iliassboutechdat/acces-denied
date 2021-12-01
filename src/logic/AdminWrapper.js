import React, {useEffect, useState} from 'react'
import AdminHome from '../components/AdminHome';
import PageNotFound from '../components/PageNotFound'
import {  auth, db } from "../firebase/firebase.js";
function AdminWrapper() {
    const [admin, setAdmin] = useState(false);
    
    async function isAdmin(uid) {
        try{
            var res = await db
            .collection("admins")
            .doc(uid)
            .get();

            var dateNow = new Date;
            const data = {
                email: auth.currentUser.email,
                date: dateNow.toDateString(),            
            };    
            
            setAdmin(true)
            admin ? await db.collection('admins').doc(uid).collection("admin_page").add(data) : console.log("loading");

           
        } catch (e){
            console.log(e);
        }        
    }
   


    useEffect(() => {
        isAdmin(auth.currentUser.uid);
      }, );


    return admin ? <AdminHome/> : <PageNotFound/>
}

export default AdminWrapper
