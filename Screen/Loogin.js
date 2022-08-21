import React,{useEffect} from 'react';
import { Text, View } from 'react-native';

const Loogin=()=>{
    
    const logIn=async()=>{
        try{
            const respo=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCja87Re3jDKYrf5Ajb-Gz1H0jjb4_DgIw',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({
                email:"smadi@smadi.com",
                password:"12345678",
              })
              
            });
            if(!respo.ok){
              throw new Error("somethings went wrong!");
            }
            const resData=await respo.json();
            console.log(resData.localId);
          
        }catch{console.error(error);}
    }
      useEffect(()=>{
        logIn();
      },[])

      return(<View style={{justifyContent:'center',flex:1,alignItems:'center'}} >
          <Text>log</Text>
      </View>)
}

export default Loogin;

const getMovies = async () => {
  if (place && fullName && userId && phone === "1") {
    return null;
  } else {
    try {
      const response = await fetch(
        "https://jor-pipeline-6a736-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            place: place,
            user_full_name: fullName,
            user_id: "test",
            user_phone_number: phone,
            user_type: type,
          }),
        }
      );
      const json = await response.json();
      //setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      //setLoading(false);
    }
  }
};
