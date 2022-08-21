import axios from 'axios';

const baseUrl = 'https://reqres.in';

axios.get(`https://jor-pipeline-6a736-default-rtdb.firebaseio.com/user`).then((response) => {
    console.log(response.data);
  });